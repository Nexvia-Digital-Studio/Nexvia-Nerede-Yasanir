<?php
// ==============================================================================
// YAŞAM HARİTASI — NexviaCP SALT-OKUNUR HOSTING ORTAM AYARLARI
// ==============================================================================
// Bu dosyayı canlı sunucuda kök dizine `config.local.php` olarak kopyalayın ve
// doldurun. lib/db.php öncelikle bu dosyayı okur; yoksa getenv()'e, sonra
// XAMPP varsayılanlarına (root/şifresiz) düşer. config.local.php arşive DAHİL EDİLMEZ.
//
// Kurulum akışı (HestiaCP):
//   1. Admin: v-add-database yasarim_user yasamharitasi mysql <şifre>
//   2. Admin: v-unlock-web-domain-docroot yasarim_user <domain>
//   3. Bu dosyayı config.local.php olarak kopyala + doldur
//   4. build/schema.sql'deki DB adını <user>_yasamharitasi ile değiştir + phpMyAdmin'den içe aktar
//   5. Admin: v-lock-web-domain-docroot yasarim_user <domain>
// ==============================================================================

// --- VERİTABANI (admin v-add-database ile açılan müşteri DB'si) ---
// v-add-database <user> yasamharitasi mysql <şifre>  → DB = <user>_yasamharitasi
define('DB_HOST', 'localhost');
define('DB_NAME', 'yasarim_user_yasamharitasi');   // Hestia kuralı: user_dbalias
define('DB_USER', 'yasarim_user_yasamharitasi');
define('DB_PASS', 'GÜÇLÜ_ŞİFRE_BURAYA');             // v-add-database sırasında verilen şifre

// --- CANLI DOMAIN (https + trailing slash yok) ---
// Tanımlanırsa display_errors kapatılır (DB DSN sızıntısını önler).
define('SITE_URL', 'https://nerdeyasarim.com');
