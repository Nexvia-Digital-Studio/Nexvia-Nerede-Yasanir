<?php
/**
 * GET api/refresh.php?type=il&id=34
 * Belirli bir yerin canlı nem + hava kalitesi verisini döndürür.
 * DB'deki kayıt 6 saatten eskiyse Open-Meteo'dan yeniler (cache'ler).
 *
 * Parametreler:
 *   type = il | ilce
 *   id   = iller.id veya ilceler.id
 */
declare(strict_types=1);

require __DIR__ . '/../lib/db.php';

header('Content-Type: application/json; charset=utf-8');

// --- giriş doğrulama ---
$type = $_GET['type'] ?? '';
$id   = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if (!in_array($type, ['il', 'ilce'], true) || $id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'type (il|ilce) ve id gerekli']);
    exit;
}

const STALE_SECS = 6 * 3600;  // 6 saat

$pdo = db();

// koordinatı al
if ($type === 'il') {
    $row = $pdo->prepare('SELECT lat, lng FROM iller WHERE id=?');
} else {
    $row = $pdo->prepare('SELECT lat, lng FROM ilceler WHERE id=?');
}
$row->execute([$id]);
$coord = $row->fetch();
if (!$coord) {
    http_response_code(404);
    echo json_encode(['error' => 'kayıt bulunamadı']);
    exit;
}
$lat = (float)$coord['lat'];
$lng = (float)$coord['lng'];

// mevcut cache'i kontrol et
$st = $pdo->prepare('SELECT nem, pm25, hava_kalitesi AS aqi, UNIX_TIMESTAMP(guncelleme) AS ts
                     FROM canli_veri WHERE yer_type=? AND yer_id=?');
$st->execute([$type, $id]);
$cached = $st->fetch();
$now = time();

$needsRefresh = !$cached || ($now - (int)$cached['ts']) > STALE_SECS;

if ($needsRefresh) {
    // Open-Meteo: nem (forecast current) + hava kalitesi (air quality current)
    // iki ayrı endpoint; ikisi de keyless
    $weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude={$lat}&longitude={$lng}&current=relative_humidity_2m";
    $airUrl     = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude={$lat}&longitude={$lng}&current=pm2_5,european_aqi";

    try {
        $w = json_decode(http_get($weatherUrl, 15), true);
        $a = json_decode(http_get($airUrl, 15), true);
        $nem  = isset($w['current']['relative_humidity_2m']) ? (int)$w['current']['relative_humidity_2m'] : null;
        $pm25 = isset($a['current']['pm2_5']) ? round((float)$a['current']['pm2_5'], 2) : null;
        $aqi  = isset($a['current']['european_aqi']) ? (int)$a['current']['european_aqi'] : null;

        if ($nem !== null || $aqi !== null) {
            // upsert
            $up = $pdo->prepare('INSERT INTO canli_veri (yer_type, yer_id, nem, pm25, hava_kalitesi, guncelleme)
                                 VALUES (?,?,?,?,?,NOW())
                                 ON DUPLICATE KEY UPDATE nem=VALUES(nem), pm25=VALUES(pm25),
                                 hava_kalitesi=VALUES(hava_kalitesi), guncelleme=NOW()');
            $up->execute([$type, $id, $nem, $pm25, $aqi]);
            $cached = ['nem' => $nem, 'pm25' => $pm25, 'aqi' => $aqi, 'ts' => $now];
        }
    } catch (Throwable $e) {
        // API başarısız: eski cache varsa onu dön, yoksa hata
        if (!$cached) {
            http_response_code(502);
            echo json_encode(['error' => 'canlı veri alınamadı', 'detay' => $e->getMessage()]);
            exit;
        }
    }
}

echo json_encode([
    'type'  => $type,
    'id'    => $id,
    'nem'   => $cached['nem']  !== null ? (int)$cached['nem']  : null,
    'pm25'  => $cached['pm25'] !== null ? (float)$cached['pm25'] : null,
    'aqi'   => $cached['aqi']  !== null ? (int)$cached['aqi']  : null,
    'ts'    => (int)$cached['ts'],
    'fresh' => $needsRefresh,  // bu istekte tazeledik mi
    'age_min' => (int)round(($now - (int)$cached['ts']) / 60),
], JSON_UNESCAPED_UNICODE);
