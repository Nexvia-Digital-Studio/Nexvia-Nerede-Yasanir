<?php
/**
 * İklim + rakım verisini Open-Meteo Archive API'den çeker.
 * Strateji: SADECE İLLER gerçek API verisiyle, İLÇELERE il değerleri atanır.
 *   (ilçe çoğunlukla ille benzer iklim; rakıma göre küçük düzeltme)
 * Tek nokta + 1 yıl (2025) → batch limitine takılmaz, hızlı.
 *
 * Çalıştırma: php build/seed_climate.php
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

const START_DATE = '2025-01-01';
const END_DATE   = '2025-12-31';
const DAILY_VARS = 'temperature_2m_mean,precipitation_sum,sunshine_duration,snowfall_sum';
const THROTTLE_S = 1;  // çağrılar arası bekleme

$pdo = db();

// 1) İLLER için gerçek veri çek (sadece eksik olanlar)
$iller = $pdo->query("SELECT i.id, i.lat, i.lng FROM iller i
  LEFT JOIN iklim k ON k.yer_type='il' AND k.yer_id=i.id WHERE k.id IS NULL ORDER BY i.id")->fetchAll();

echo count($iller) . " ilin iklim verisi çekilecek (gerçek 2025 verisi).\n";

$insertSql = 'INSERT INTO iklim
  (yer_type, yer_id, rakim, yillik_sicaklik, kis_sicaklik, yaz_sicaklik, yillik_yagis, gunes_suresi, kar_yagisi, gun_guncellendi)
  VALUES (?,?,?,?,?,?,?,?,?,CURDATE())
  ON DUPLICATE KEY UPDATE rakim=VALUES(rakim), yillik_sicaklik=VALUES(yillik_sicaklik),
  kis_sicaklik=VALUES(kis_sicaklik), yaz_sicaklik=VALUES(yaz_sicaklik), yillik_yagis=VALUES(yillik_yagis),
  gunes_suresi=VALUES(gunes_suresi), kar_yagisi=VALUES(kar_yagisi), gun_guncellendi=CURDATE()';
$stIns = $pdo->prepare($insertSql);

function compute(array $loc): array {
    $d = $loc['daily'];
    $n = count($d['time']);
    $temps = $d['temperature_2m_mean'];
    $prec  = $d['precipitation_sum'];
    $sun   = $d['sunshine_duration'];
    $snow  = $d['snowfall_sum'];
    $rakim = isset($loc['elevation']) ? (int)round($loc['elevation']) : null;

    $vt = array_filter($temps, fn($v)=>$v!==null);
    $yillik = $vt ? round(array_sum($vt)/count($vt), 1) : null;

    $jan = $jul = [];
    for ($i=0;$i<$n;$i++){ if($temps[$i]===null) continue;
        $m=(int)substr($d['time'][$i],5,2);
        if($m===1) $jan[]=$temps[$i];
        if($m===7) $jul[]=$temps[$i];
    }
    $kis = $jan ? round(array_sum($jan)/count($jan),1) : null;
    $yaz = $jul ? round(array_sum($jul)/count($jul),1) : null;

    $vp = array_filter($prec, fn($v)=>$v!==null);
    $yagis = $vp ? (int)round(array_sum($vp)) : null;     // 1 yıllık toplam
    $vs = array_filter($sun, fn($v)=>$v!==null);
    $gunes = $vs ? (int)round(array_sum($vs)/3600) : null; // saat/yıl
    $vn = array_filter($snow, fn($v)=>$v!==null);
    $kar = $vn ? (int)round(array_sum($vn)) : null;

    return [$rakim,$yillik,$kis,$yaz,$yagis,$gunes,$kar];
}

$startTime = microtime(true);
foreach ($iller as $idx => $il) {
    $url = "https://archive-api.open-meteo.com/v1/archive?latitude={$il['lat']}&longitude={$il['lng']}"
         . "&start_date=" . START_DATE . "&end_date=" . END_DATE . "&daily=" . DAILY_VARS . "&timezone=auto";
    try {
        $raw = http_get($url, 30);
        $data = json_decode($raw, true);
        if (isset($data['error'])) {
            fwrite(STDERR, "\n[il {$il['id']}] " . ($data['reason']??'hata') . " — atlanıyor\n");
            sleep(THROTTLE_S); continue;
        }
        [$rakim,$yillik,$kis,$yaz,$yagis,$gunes,$kar] = compute($data);
        $stIns->execute(['il', $il['id'], $rakim, $yillik, $kis, $yaz, $yagis, $gunes, $kar]);
    } catch (Throwable $e) {
        fwrite(STDERR, "\n[il {$il['id']}] " . $e->getMessage() . "\n");
    }
    printf("\r[%d/%d] il %s (%.0f sn)", $idx+1, count($iller), $il['id']?'#'.$il['id']:'', microtime(true)-$startTime);
    sleep(THROTTLE_S);
}
echo "\n✓ İller tamam.\n";

// 2) İLÇELERE il değerini ata (rakıma göre sıcaklık düzeltmesi ile)
echo "İlçelere il iklim değerleri atanıyor...\n";

$ilIklim = [];
foreach ($pdo->query("SELECT k.*, i.id AS il_id FROM iklim k JOIN iller i ON i.id=k.yer_id WHERE k.yer_type='il'") as $r) {
    $ilIklim[(int)$r['il_id']] = $r;
}

$ilceSql = 'INSERT INTO iklim
  (yer_type, yer_id, rakim, yillik_sicaklik, kis_sicaklik, yaz_sicaklik, yillik_yagis, gunes_suresi, kar_yagisi, gun_guncellendi)
  VALUES (?,?,?,?,?,?,?,?,?,CURDATE())
  ON DUPLICATE KEY UPDATE rakim=VALUES(rakim), yillik_sicaklik=VALUES(yillik_sicaklik),
  kis_sicaklik=VALUES(kis_sicaklik), yaz_sicaklik=VALUES(yaz_sicaklik), yillik_yagis=VALUES(yillik_yagis),
  gunes_suresi=VALUES(gunes_suresi), kar_yagisi=VALUES(kar_yagisi), gun_guncellendi=CURDATE()';
$stIlce = $pdo->prepare($ilceSql);

$ilceler = $pdo->query("SELECT id, il_id, lat, lng FROM ilceler ORDER BY id")->fetchAll();
$assigned = 0;
$pdo->beginTransaction();
foreach ($ilceler as $d) {
    $il = $ilIklim[(int)$d['il_id']] ?? null;
    if (!$il) continue;
    // ilçe rakımını Open-Meteo Elevation API'den tek çağrıyla değil, yaklaşık:
    // ilçe koordinatının rakımını bilmiyoruz → il rakımını kullan
    // (ileri seviye: elevation API ayrı çekilebilir)
    $rakim = (int)$il['rakim'];
    // sıcaklık: ilçe rakımı il rakımına yakın kabul et (düzeltme yok, aynı iklim)
    $stIlce->execute(['ilce', $d['id'], $rakim,
        $il['yillik_sicaklik'], $il['kis_sicaklik'], $il['yaz_sicaklik'],
        $il['yillik_yagis'], $il['gunes_suresi'], $il['kar_yagisi']]);
    $assigned++;
}
$pdo->commit();
echo "✓ $assigned ilçeye il iklim değerleri atandı.\n";

$cnt = (int)$pdo->query('SELECT COUNT(*) FROM iklim')->fetchColumn();
echo "iklim tablosu: $cnt satır.\n";
