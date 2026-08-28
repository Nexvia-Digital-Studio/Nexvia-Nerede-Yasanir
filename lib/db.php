<?php
/**
 * Veritabanı bağlantısı — PDO + utf8mb4
 *
 * Öncelik (diğer Nexvia siteleriyle aynı model):
 *   1. config.local.php (üretim) →  2. getenv()  →  3. XAMPP varsayılan (root/şifresiz)
 *
 * Klasör adından bağımsızdır; hangi sunucuda/klasörde olursa olsun çalışır.
 */
declare(strict_types=1);

// --- Ortam ayarlarını yükle (varsa) ---
if (is_file(__DIR__ . '/../config.local.php')) {
    require_once __DIR__ . '/../config.local.php';
}

// define() ile tanımla — sadece daha önce tanımlanmadıysa (override'a izin verir)
if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'yasam_haritasi');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'root');
if (!defined('DB_PASS')) define('DB_PASS', getenv('DB_PASS') ?: '');

// Üretimde hataları istemciye yansıtma (DB DSN sızıntısını önler)
if (defined('SITE_URL') || (getenv('SITE_URL') && getenv('SITE_URL') !== '')) {
    ini_set('display_errors', '0');
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            // Üretim dostu hata — DSN/şifre sızıntısı yok
            die("<div style='font-family:sans-serif;background:#fff;color:#e11d48;padding:20px;border-radius:8px;margin:20px;border:1px solid #cbd5e1;'>
                <h2>Veritabanı Bağlantı Hatası</h2>
                <p>MySQL sunucusuna bağlanılamadı veya <code>" . htmlspecialchars(DB_NAME) . "</code> veritabanı bulunamadı.</p>
                <p>DB bilgilerini <code>config.local.php</code> dosyasında kontrol edin.</p>
            </div>");
        }
    }
    return $pdo;
}

/** Open-Meteo API'sine file_get_contents ile istek (timeout'lu). */
function http_get(string $url, int $timeout = 30): string
{
    $ctx = stream_context_create(['http' => [
        'timeout'         => $timeout,
        'user_agent'      => 'YaşamHaritası/1.0 (PHP)',
        'ignore_errors'   => true,
    ]]);
    $res = @file_get_contents($url, false, $ctx);
    if ($res === false) {
        throw new RuntimeException("HTTP istek başarısız: $url");
    }
    return $res;
}
