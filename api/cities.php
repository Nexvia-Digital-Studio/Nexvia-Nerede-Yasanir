<?php
/**
 * GET api/cities.php
 * Tüm il + ilçe verisini (iklim dahil) tek JSON olarak döndürür.
 * Filtreleme client-side yapılır; bu endpoint sadece veriyi sunar.
 *
 * ?live=1  → canli_veri (nem, AQI) satırlarını da dahil et (eskiyse refresh gerekir)
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

$includeLive = isset($_GET['live']) && $_GET['live'] === '1';

$pdo = db();

// ---- İLLER ----
$sqlIl = "SELECT i.id, i.ad, i.lat, i.lng, i.bolge, i.deniz, i.nufus,
                 k.rakim, k.yillik_sicaklik, k.kis_sicaklik, k.yaz_sicaklik,
                 k.yillik_yagis, k.gunes_suresi, k.kar_yagisi";
if ($includeLive) {
    $sqlIl .= ", c.nem, c.pm25, c.hava_kalitesi AS aqi,
               UNIX_TIMESTAMP(c.guncelleme) AS canli_ts";
}
$sqlIl .= " FROM iller i
            LEFT JOIN iklim k ON k.yer_type='il' AND k.yer_id=i.id";
if ($includeLive) {
    $sqlIl .= " LEFT JOIN canli_veri c ON c.yer_type='il' AND c.yer_id=i.id";
}
$sqlIl .= " ORDER BY i.id";

$iller = [];
foreach ($pdo->query($sqlIl) as $r) {
    $iller[] = normalizeIl($r);
}

// ---- İLÇELER ----
$sqlIlce = "SELECT d.id, d.il_id, d.ad, d.lat, d.lng, d.deniz,
                   k.rakim, k.yillik_sicaklik, k.kis_sicaklik, k.yaz_sicaklik,
                   k.yillik_yagis, k.gunes_suresi, k.kar_yagisi";
if ($includeLive) {
    $sqlIlce .= ", c.nem, c.pm25, c.hava_kalitesi AS aqi,
                 UNIX_TIMESTAMP(c.guncelleme) AS canli_ts";
}
$sqlIlce .= " FROM ilceler d
              LEFT JOIN iklim k ON k.yer_type='ilce' AND k.yer_id=d.id";
if ($includeLive) {
    $sqlIlce .= " LEFT JOIN canli_veri c ON c.yer_type='ilce' AND c.yer_id=d.id";
}
$sqlIlce .= " ORDER BY d.id";

$ilceler = [];
foreach ($pdo->query($sqlIlce) as $r) {
    $ilceler[] = normalizeIlce($r);
}

echo json_encode([
    'iller'  => $iller,
    'ilceler'=> $ilceler,
    'meta'   => [
        'il_sayisi'   => count($iller),
        'ilce_sayisi' => count($ilceler),
        'iklim_kaynak'=> 'Open-Meteo Archive 2021-2025',
        'nufus_kaynak'=> 'TÜİK ADNKS 2023',
    ],
], JSON_UNESCAPED_UNICODE);

// ---- yardımcı ----
function normalizeIl(array $r): array
{
    return [
        'id'    => (int)$r['id'],
        'ad'    => $r['ad'],
        'lat'   => (float)$r['lat'],
        'lng'   => (float)$r['lng'],
        'bolge' => $r['bolge'],
        'deniz' => (int)$r['deniz'],
        'nufus' => (int)$r['nufus'],
        'rakim'            => $r['rakim']            !== null ? (int)$r['rakim'] : null,
        'yillik_sicaklik'  => $r['yillik_sicaklik']  !== null ? (float)$r['yillik_sicaklik'] : null,
        'kis_sicaklik'     => $r['kis_sicaklik']     !== null ? (float)$r['kis_sicaklik'] : null,
        'yaz_sicaklik'     => $r['yaz_sicaklik']     !== null ? (float)$r['yaz_sicaklik'] : null,
        'yillik_yagis'     => $r['yillik_yagis']     !== null ? (int)$r['yillik_yagis'] : null,
        'gunes_suresi'     => $r['gunes_suresi']     !== null ? (int)$r['gunes_suresi'] : null,
        'kar_yagisi'       => $r['kar_yagisi']       !== null ? (int)$r['kar_yagisi'] : null,
        'canli' => isset($r['nem']) && $r['nem'] !== null ? [
            'nem'  => (int)$r['nem'],
            'pm25' => $r['pm25'] !== null ? (float)$r['pm25'] : null,
            'aqi'  => $r['aqi']  !== null ? (int)$r['aqi'] : null,
            'ts'   => $r['canli_ts'] ?? null,
        ] : null,
    ];
}

function normalizeIlce(array $r): array
{
    return [
        'id'    => (int)$r['id'],
        'il_id' => (int)$r['il_id'],
        'ad'    => $r['ad'],
        'lat'   => (float)$r['lat'],
        'lng'   => (float)$r['lng'],
        'deniz' => (int)$r['deniz'],
        'rakim'            => $r['rakim']            !== null ? (int)$r['rakim'] : null,
        'yillik_sicaklik'  => $r['yillik_sicaklik']  !== null ? (float)$r['yillik_sicaklik'] : null,
        'kis_sicaklik'     => $r['kis_sicaklik']     !== null ? (float)$r['kis_sicaklik'] : null,
        'yaz_sicaklik'     => $r['yaz_sicaklik']     !== null ? (float)$r['yaz_sicaklik'] : null,
        'yillik_yagis'     => $r['yillik_yagis']     !== null ? (int)$r['yillik_yagis'] : null,
        'gunes_suresi'     => $r['gunes_suresi']     !== null ? (int)$r['gunes_suresi'] : null,
        'kar_yagisi'       => $r['kar_yagisi']       !== null ? (int)$r['kar_yagisi'] : null,
        'canli' => isset($r['nem']) && $r['nem'] !== null ? [
            'nem'  => (int)$r['nem'],
            'pm25' => $r['pm25'] !== null ? (float)$r['pm25'] : null,
            'aqi'  => $r['aqi']  !== null ? (int)$r['aqi'] : null,
            'ts'   => $r['canli_ts'] ?? null,
        ] : null,
    ];
}
