-- ============================================================
-- Yaşam Haritası — Veritabanı şeması
-- MariaDB 10.4 / MySQL 5.7+ uyumlu
-- Türkçe karakterler için utf8mb4_turkish_ci
-- ============================================================

DROP DATABASE IF EXISTS yasam_haritasi;
CREATE DATABASE yasam_haritasi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_turkish_ci;

USE yasam_haritasi;

-- ---------- İLLER ----------
CREATE TABLE iller (
  id     TINYINT UNSIGNED PRIMARY KEY,        -- plaka kodu (01-81)
  ad     VARCHAR(40) NOT NULL,
  lat    DECIMAL(9,6) NOT NULL,
  lng    DECIMAL(9,6) NOT NULL,
  bolge  VARCHAR(20) NOT NULL,                -- coğrafi bölge
  deniz  TINYINT(1) NOT NULL DEFAULT 0,       -- il merkezi deniz kenarı mı
  nufus  INT UNSIGNED NOT NULL DEFAULT 0,     -- TÜİK ADNKS nüfus
  INDEX idx_bolge (bolge),
  INDEX idx_deniz (deniz)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- ---------- İLÇELER ----------
CREATE TABLE ilceler (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  il_id  TINYINT UNSIGNED NOT NULL,
  ad     VARCHAR(60) NOT NULL,
  lat    DECIMAL(9,6) NOT NULL,
  lng    DECIMAL(9,6) NOT NULL,
  wikidata_id VARCHAR(20) DEFAULT NULL,       -- Q-id (dedupe için)
  CONSTRAINT fk_ilce_il FOREIGN KEY (il_id) REFERENCES iller(id) ON DELETE CASCADE,
  INDEX idx_ilce_il (il_id),
  UNIQUE KEY uq_wikidata (wikidata_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- ---------- İKLİM (il ve ilçe ortak, evrensel tablo) ----------
-- type: 'il' veya 'ilce'; ref_id ilgili tablonun PK'sı
CREATE TABLE iklim (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  yer_type    ENUM('il','ilce') NOT NULL,
  yer_id      INT UNSIGNED NOT NULL,          -- iller.id veya ilceler.id
  rakim               SMALLINT UNSIGNED,      -- metre (Open-Meteo Elevation)
  yillik_sicaklik     DECIMAL(4,1),           -- °C, 10 yıllık ortalama
  kis_sicaklik        DECIMAL(4,1),           -- Ocak ortalaması °C
  yaz_sicaklik        DECIMAL(4,1),           -- Temmuz ortalaması °C
  yillik_yagis        SMALLINT UNSIGNED,      -- mm/yıl
  gunes_suresi        INT UNSIGNED,           -- saat/yıl (sunshine_duration toplam)
  gunes_radyasyon     DECIMAL(5,1),           -- MJ/m²/gün ort (shortwave_radiation_sum)
  kar_yagisi          SMALLINT UNSIGNED,      -- cm/yıl toplam
  gun_guncellendi     DATE NOT NULL,          -- veri çekildiği tarih
  UNIQUE KEY uq_yer (yer_type, yer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- ---------- CANLI VERİ (nem + hava kirliliği, cache'li) ----------
CREATE TABLE canli_veri (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  yer_type      ENUM('il','ilce') NOT NULL,
  yer_id        INT UNSIGNED NOT NULL,
  nem           TINYINT UNSIGNED,             -- % (relative_humidity_2m)
  pm25          DECIMAL(5,2),                 -- μg/m³
  hava_kalitesi SMALLINT UNSIGNED,            -- European AQI (0-100+)
  guncelleme    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_yer (yer_type, yer_id),
  INDEX idx_guncelleme (guncelleme)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;
