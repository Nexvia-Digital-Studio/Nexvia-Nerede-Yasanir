<?php
/**
 * Veritabanı bağlantısı — PDO + utf8mb4
 * XAMPP default: localhost, root, şifresiz
 */
declare(strict_types=1);

const DB_HOST = '127.0.0.1';
const DB_NAME = 'yasam_haritasi';
const DB_USER = 'root';
const DB_PASS = '';

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
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
