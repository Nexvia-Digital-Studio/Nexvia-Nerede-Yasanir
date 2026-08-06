<?php
/**
 * İlçe RAKIM'larını Open-Meteo Elevation API'den batch (100'lük) çeker.
 * Elevation API archive'tan ayrı, hızlı ve batch'e izin veriyor.
 * Çekilen rakım, ilçelerin iklim kaydındaki rakim kolonunu günceller
 * ve sıcaklık değerlerini rakım farkına göre düzeltir (her 100m → -0.6°C).
 *
 * Çalıştırma: php build/seed_elevation.php
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

const BATCH = 100;

$pdo = db();

// il + ilçe rakımlarını topla (iklim tablosundaki rakim güncellenecek)
$points = [];
foreach ($pdo->query("SELECT k.yer_type, k.yer_id, y.lat, y.lng FROM iklim k
  JOIN iller y ON y.id=k.yer_id AND k.yer_type='il'
  UNION ALL SELECT k.yer_type, k.yer_id, d.lat, d.lng FROM iklim k
  JOIN ilceler d ON d.id=k.yer_id AND k.yer_type='ilce'") as $r) {
    $points[] = ['type'=>$r['yer_type'], 'id'=>(int)$r['yer_id'], 'lat'=>(float)$r['lat'], 'lng'=>(float)$r['lng']];
}
$total = count($points);
echo "$total noktanın rakımı güncellenecek (100'lük batch).\n";

$st = $pdo->prepare("UPDATE iklim SET rakim=? WHERE yer_type=? AND yer_id=?");

$batches = array_chunk($points, BATCH);
$done = 0;
foreach ($batches as $bi => $batch) {
    $lats = implode(',', array_column($batch, 'lat'));
    $lngs = implode(',', array_column($batch, 'lng'));
    $url = "https://api.open-meteo.com/v1/elevation?latitude={$lats}&longitude={$lngs}";
    try {
        $data = json_decode(http_get($url, 30), true);
        if (!isset($data['elevation'])) { fwrite(STDERR, "[batch ".($bi+1)."] hata\n"); continue; }
        foreach ($data['elevation'] as $idx => $elev) {
            $pt = $batch[$idx] ?? null;
            if (!$pt) continue;
            $st->execute([(int)round($elev), $pt['type'], $pt['id']]);
        }
    } catch (Throwable $e) {
        fwrite(STDERR, "[batch ".($bi+1)."] ".$e->getMessage()."\n");
        sleep(3); continue;
    }
    $done += count($batch);
    printf("\r[%d/%d] %d/%d nokta  ", $bi+1, count($batches), $done, $total);
    usleep(500000);  // 0.5 sn bekle
}
echo "\n✓ Rakımlar güncellendi.\n";

// Sıcaklık düzeltmesi: ilçe rakımı > il rakımı ise soğuk (lapse rate ~0.6°C/100m)
echo "İlçe sıcaklıkları rakım farkına göre düzeltiliyor...\n";
$pdo->exec("UPDATE iklim kic
  JOIN ilceler d ON d.id=kic.yer_id AND kic.yer_type='ilce'
  JOIN iller i ON i.id=d.il_id
  JOIN iklim kil ON kil.yer_id=i.id AND kil.yer_type='il'
  SET kic.yillik_sicaklik = kil.yillik_sicaklik - (kic.rakim - kil.rakim)*0.006,
      kic.kis_sicaklik    = kil.kis_sicaklik    - (kic.rakim - kil.rakim)*0.006,
      kic.yaz_sicaklik    = kil.yaz_sicaklik    - (kic.rakim - kil.rakim)*0.006
  WHERE kic.rakim IS NOT NULL AND kil.rakim IS NOT NULL");
echo "✓ Sıcaklık düzeltmesi tamam.\n";
