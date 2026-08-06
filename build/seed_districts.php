<?php
/**
 * İlçeleri Wikidata SPARQL'den çeker ve ilceler tablosuna seed eder.
 * Kaynak: Wikidata (Q1147395 = Türkiye ilçesi, Q48336 = Türkiye ili)
 * Çalıştırma: php build/seed_districts.php
 *
 * Wikidata isimleri temizlenir: "(ilçe)", "İlçesi", "(İl)" gibi suffix'ler atılır.
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

echo "Wikidata SPARQL sorgusu çalışıyor...\n";
$query = <<<'SPARQL'
SELECT ?ilce ?ilceLabel ?ilLabel ?lat ?lon WHERE {
  ?ilce wdt:P31 wd:Q1147395.
  ?ilce wdt:P131 ?il.
  ?il wdt:P31 wd:Q48336.
  ?ilce p:P625 ?stmt.
  ?stmt psv:P625 ?coordnode.
  ?coordnode wikibase:geoLatitude ?lat.
  ?coordnode wikibase:geoLongitude ?lon.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "tr". }
}
SPARQL;

$url = 'https://query.wikidata.org/sparql?format=json&query=' . urlencode($query);
$json = http_get($url, 60);
$data = json_decode($json, true);

if (!isset($data['results']['bindings'])) {
    fwrite(STDERR, "SPARQL yanıt formatı beklenmedik.\n");
    exit(1);
}

$rows = $data['results']['bindings'];
echo count($rows) . " ham satır çekildi (duplikeler olabilir).\n";

// İl adı → il id eşlemesi (DB'den)
$pdo = db();
$ilMap = [];
foreach ($pdo->query('SELECT id, ad FROM iller') as $r) {
    $ilMap[$r['ad']] = (int)$r['id'];
}

// İlçe adını temizle
function cleanName(string $label): string
{
    $n = trim($label);
    // "Çine (ilçe)" → "Çine" ; "Ayvacık (Çanakkale ilçesi)" → "Ayvacık"
    $n = preg_replace('/\s*\([^)]*\)\s*$/', '', $n);
    // "Çıldır İlçesi" / "Posof ilçesi"
    $n = preg_replace('/\s+[İi]lçesi\s*$/u', '', $n);
    return trim($n);
}

// İlçe bazında ebeveyn il tahmini — Wikidata'dan gelen ilLabel doğrudan
$seen = [];        // wikidata_id → eklenmiş mi (dedupe)
$inserted = 0;
$orphan = 0;
$sql = 'INSERT IGNORE INTO ilceler (il_id, ad, lat, lng, wikidata_id) VALUES (?,?,?,?,?)';
$st = $pdo->prepare($sql);

$pdo->beginTransaction();
foreach ($rows as $row) {
    $wdId = basename($row['ilce']['value']); // http://www.wikidata.org/entity/Q123456 → Q123456
    if (isset($seen[$wdId])) continue;       // aynı ilçenin 2. koordinatı: atla
    $seen[$wdId] = true;

    $ilAd = $row['ilLabel']['value'] ?? '';
    if (!isset($ilMap[$ilAd])) {
        $orphan++; continue;                  // ebeveyn il DB'de yok
    }
    $ilId = $ilMap[$ilAd];
    $ad = cleanName($row['ilceLabel']['value'] ?? '');
    $lat = (float)$row['lat']['value'];
    $lng = (float)$row['lon']['value'];

    if ($ad === '' || abs($lat) < 1) continue;
    $st->execute([$ilId, $ad, $lat, $lng, $wdId]);
    $inserted += $st->rowCount();
}
$pdo->commit();

echo "✓ $inserted ilçe seed edildi. (atanamayan: $orphan)\n";

// İl başına ilçe sayısı
$dist = $pdo->query('SELECT i.ad, COUNT(d.id) AS n FROM iller i LEFT JOIN ilceler d ON d.il_id=i.id GROUP BY i.id ORDER BY n DESC LIMIT 8')->fetchAll();
echo "\nİl başına ilçe (en çok):\n";
foreach ($dist as $r) {
    echo "  {$r['ad']}: {$r['n']}\n";
}
