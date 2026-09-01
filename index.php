<?php
require __DIR__ . '/lib/icons.php';
// Cache-busting: dosya değişince version bump olur (her istekte değil).
$cssV = filemtime(__DIR__ . '/assets/style.css');
$jsV  = filemtime(__DIR__ . '/assets/app.js');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yaşam Haritası — Türkiye'de Nerede Yaşarım? | Nexvia Digital Studio</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<!-- Canvas Konfeti efekti -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
<link rel="stylesheet" href="assets/style.css?v=<?= $cssV ?>"/>

<!-- Google AdSense Yayıncı Kodu -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->
</head>
<body>
<div id="app">
  <button id="toggleSb" aria-label="Menü"><?= icon('list', 20) ?></button>

  <aside id="sidebar">
    <div class="sb-head">
      <div class="brand">
        <h1><?= icon('map-pin', 20) ?> Yaşam Haritası</h1>
        <div class="brand-right">
          <button class="icon-btn" id="btnAbout" onclick="window.appOpenAbout()" title="Nexvia Digital Studio & Batuhan Akcan Hakkında">
            <?= icon('users', 16) ?>
          </button>
          <button class="icon-btn" id="btnThemeToggle" title="Temayı Değiştir (Açık/Karanlık)">
            <?= icon('sun', 16, 'ic-sun') ?>
            <?= icon('moon', 16, 'ic-moon') ?>
          </button>
        </div>
      </div>
      <p>Türkiye'de nerede yaşamalısın? <a href="https://www.nexviastudio.com/" target="_blank" rel="noopener" class="nexvia-tag"><?= icon('zap', 12) ?> Nexvia Digital Studio</a></p>
      
      <!-- Hızlı Arama -->
      <div class="search-box">
        <span class="search-ico"><?= icon('search', 14) ?></span>
        <input type="text" id="searchInput" placeholder="İl veya ilçe ara (örn. Amasra, Ayvalık...)" autocomplete="off">
        <button id="searchClear" class="search-clear">&times;</button>
        <div id="searchResults" class="search-results"></div>
      </div>

      <!-- İnteraktif Aksiyon Butonları -->
      <div class="interactive-bar">
        <button class="action-btn quiz-btn" id="btnStartQuiz" onclick="window.appOpenQuiz()"><?= icon('compass', 14) ?> Ruh Şehrini Bul</button>
        <button class="action-btn surprise-btn" id="btnSurprise" onclick="window.appOpenSurprise()"><?= icon('rotate', 14) ?> Beni Şaşırt!</button>
        <button class="action-btn fav-btn" id="btnShowFavs" onclick="window.appToggleFavMode()"><?= icon('heart', 14) ?> Favoriler (<span id="favCount">0</span>)</button>
      </div>

      <!-- Hazır Yaşam Tarzı Filtreleri -->
      <div class="preset-chips">
        <span class="preset-title">Hızlı Filtreler:</span>
        <div class="chips-row">
          <button class="chip-btn" data-preset="sea_summer"><?= icon('waves', 13) ?> Kıyı & Yaz</button>
          <button class="chip-btn" data-preset="nature_cool"><?= icon('mountain', 13) ?> Dağ & Doğa</button>
          <button class="chip-btn" data-preset="metropolis"><?= icon('building', 13) ?> Metropol</button>
          <button class="chip-btn" data-preset="peace_safety"><?= icon('heart', 13) ?> Huzurlu</button>
        </div>
      </div>

      <div class="sb-stats">
        <div class="stat-pill"><b id="cntMatch">—</b><span>uygun yer</span></div>
        <div class="stat-pill"><b id="cntActive">0</b><span>aktif filtre</span></div>
        <div class="stat-pill"><b id="cntBest">0</b><span>en iyi skor</span></div>
      </div>
    </div>
    
    <div class="loader" id="loader"><div class="bar" id="loaderBar"></div></div>
    
    <div class="sb-actions">
      <button class="btn" id="btnReset"><?= icon('rotate', 15) ?> Sıfırla</button>
      <button class="btn active" id="btnStrict"><?= icon('check', 15) ?> Sadece uygun</button>
      <button class="btn" id="btnCompare" onclick="window.appOpenCompare()"><?= icon('activity', 15) ?> Karşılaştır</button>
    </div>
    
    <div class="filter-tab-bar" id="filterTabBar">
      <button class="filter-tab active" data-grp="all"><?= icon('layers', 12) ?> Tümü</button>
      <button class="filter-tab" data-grp="Coğrafi"><?= icon('globe', 12) ?> Coğrafi</button>
      <button class="filter-tab" data-grp="Sosyal & Yaşam"><?= icon('music', 12) ?> Sosyal</button>
      <button class="filter-tab" data-grp="Ekonomi & Ev Kirası"><?= icon('home', 12) ?> Ekonomi</button>
      <button class="filter-tab" data-grp="İklim"><?= icon('thermometer', 12) ?> İklim</button>
      <button class="filter-tab" data-grp="Demografi & Sağlık"><?= icon('users', 12) ?> Sağlık</button>
      <button class="filter-tab" data-grp="Riskler (düşük iyi)"><?= icon('alert', 12) ?> Risk</button>
      <button class="filter-tab" data-grp="Bölge"><?= icon('compass', 12) ?> Bölge</button>
    </div>

    <div class="filters" id="filters">
      <div style="text-align:center; color:var(--muted); padding:30px 0; font-size:12px;">
        <?= icon('activity', 18) ?><br>Veriler yükleniyor…
      </div>
    </div>

    <!-- Google AdSense - Sidebar Reklam Alanı Slot #1 -->
    <div class="ad-container sidebar-ad">
      <span class="ad-label">Sponsorlu / Reklam</span>
      <!-- AdSense Kodu Slot #1 -->
      <!--
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      -->
    </div>

    <div class="sb-footer">
      <span>Geliştirici: <b>Batuhan Akcan</b> · <?= icon('zap', 12) ?> <a href="https://www.nexviastudio.com/" target="_blank" rel="noopener" style="color:var(--accent2);font-weight:700;text-decoration:none;">Nexvia Digital Studio</a></span>
    </div>
  </aside>

  <div id="map"></div>

  <!-- Tıklamalı Harita Karşılaştırma Bildirim Bandı -->
  <div class="map-compare-banner" id="mapCompareBanner">
    <span class="compare-banner-text" id="mapCompareText"><?= icon('activity', 14) ?> 1. Şehir Seçildi. Karşılaştırmak istediğin 2. şehre haritada tıkla!</span>
    <button class="compare-banner-cancel" onclick="window.appCancelMapCompare()">İptal</button>
  </div>

  <!-- Davet Karşılama Bildirim Bandı -->
  <div class="invite-banner" id="inviteBanner">
    <span class="invite-text" id="inviteText"><?= icon('zap', 14) ?> Bir arkadaşın sana özel yaşam alanı önerdi!</span>
    <button class="invite-close" id="inviteClose">&times;</button>
  </div>

  <!-- Harita Üstü Reklam Şeridi (Google AdSense Slot #2) -->
  <div class="map-top-ad">
    <span class="ad-label">Sponsorlu</span>
    <!-- AdSense Kodu Slot #2 -->
    <!--
    <ins class="adsbygoogle"
         style="display:inline-block;width:728px;height:90px"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="0987654321"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    -->
  </div>

  <!-- Üst Harita Kontrol Araçları -->
  <div class="map-controls">
    <div class="layer-toggle" id="layerToggle">
      <button data-layer="auto" class="sel"><?= icon('layers', 14) ?> Oto</button>
      <button data-layer="il"><?= icon('building', 14) ?> İller</button>
      <button data-layer="ilce"><?= icon('map-pin', 14) ?> İlçeler</button>
      <span class="auto-note" id="layerNote">il görünür</span>
    </div>

    <button class="btn-map-option" id="btnToggleNames" title="Marker etiket modunu değiştir">
      <?= icon('globe', 14) ?> <span id="labelModeTxt">Tam İsimler</span>
    </button>
  </div>

  <div class="legend">
    <h4>Uyum Skoru</h4>
    <div class="row"><div class="dot" style="background:#16a34a"></div>Çok iyi (%85+)</div>
    <div class="row"><div class="dot" style="background:#84cc16"></div>İyi (%75–85)</div>
    <div class="row"><div class="dot" style="background:#eab308"></div>Uygun (%70–75)</div>
    <div class="row"><div class="dot" style="background:#94a3b8"></div>Zayıf / elendi (<%70)</div>
    <div class="row"><div class="dot" style="background:#ec4899"></div>Favorileriniz</div>
  </div>
</div>

<!-- ============================================================
   MODALLAR
   ============================================================ -->

<!-- FAVORİLERİM MODALI -->
<div class="about-backdrop" id="favsModal">
  <div class="about-card favs-card">
    <button class="about-close" id="favsClose" onclick="document.getElementById('favsModal').classList.remove('show')">&times;</button>
    <h2><?= icon('heart', 18) ?> Kaydedilen Favori Yerleriniz</h2>
    <p class="sub">Beğendiğiniz il ve ilçeler listesi.</p>
    <div id="favsListContainer" class="favs-list-wrap">
      <div style="text-align:center; color:var(--muted); padding:30px;">Henüz kaydedilmiş favori yer bulunmuyor.</div>
    </div>
  </div>
</div>

<!-- 🔮 RUH ŞEHRİNİ BUL QUIZ MODALI -->
<div class="about-backdrop" id="quizModal">
  <div class="about-card quiz-card">
    <button class="about-close" id="quizClose" onclick="document.getElementById('quizModal').classList.remove('show')">&times;</button>
    <div class="quiz-step" id="quizStepContainer"></div>
  </div>
</div>

<!-- ⚖️ ŞEHİR KARŞILAŞTIRMA MODALI (TAM SIĞAN & SS ALINABİLİR) -->
<div class="about-backdrop" id="compareModal">
  <div class="about-card compare-card">
    <button class="about-close" id="compareClose" onclick="document.getElementById('compareModal').classList.remove('show')">&times;</button>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
      <div>
        <h2 style="font-size:22px; font-weight:800; display:flex; align-items:center; gap:8px;"><?= icon('activity', 18) ?> Şehir & İlçe Karşılaştırma</h2>
        <p class="sub" style="font-size:13px; color:var(--muted); margin:0;">2 yeri yan yana seçin, tek ekranda kıyaslayın ve SS alın.</p>
      </div>
      <button class="btn active" id="btnDownloadCompareSS" style="padding:7px 12px; font-size:12px; height:36px;"><?= icon('download', 14) ?> 📸 Tabloyu İndir (SS)</button>
    </div>

    <div class="compare-selectors">
      <div class="comp-search-box">
        <input type="text" id="compSearch1" class="comp-input" placeholder="🔍 1. Şehir veya ilçe yazın..." autocomplete="off">
        <div class="comp-dropdown" id="compDropdown1"></div>
      </div>
      <span class="vs-badge">VS</span>
      <div class="comp-search-box">
        <input type="text" id="compSearch2" class="comp-input" placeholder="🔍 2. Şehir veya ilçe yazın..." autocomplete="off">
        <div class="comp-dropdown" id="compDropdown2"></div>
      </div>
    </div>

    <div id="compareTableContainer" class="compare-table-wrap">
      <div style="text-align:center; color:var(--muted); padding:30px;">Kıyaslamak için yukarıdan 2 şehir seçin veya haritada Karşılaştır butonunu kullanın</div>
    </div>
  </div>
</div>

<!-- 📸 INSTAGRAM STORY GÖRSEL PAYLAŞIM MODALI -->
<div class="about-backdrop" id="shareModal">
  <div class="about-card share-card">
    <button class="about-close" id="shareClose" onclick="document.getElementById('shareModal').classList.remove('show')">&times;</button>
    <h2><?= icon('globe', 18) ?> Hikayede Paylaş</h2>
    <p class="sub">Ruh şehrini veya uyum skorunu Instagram Story formatında indir ve paylaş!</p>
    <div class="canvas-preview-wrap">
      <canvas id="shareCanvas" width="540" height="960"></canvas>
    </div>
    <button class="social-btn insta" id="btnDownloadStory">
      <?= icon('download', 16) ?> Görseli İndir (Instagram Story)
    </button>
  </div>
</div>

<!-- 👨‍💻 NEXVİA DİGİTAL STUDİO MODALI -->
<div class="about-backdrop" id="aboutBackdrop">
  <div class="about-card" style="max-width: 620px; max-height: 90vh; overflow-y: auto;">
    <button class="about-close" id="aboutClose" onclick="document.getElementById('aboutBackdrop').classList.remove('show')">&times;</button>
    <div class="about-avatar">
      <?= icon('zap', 24) ?>
    </div>
    <h2>Nexvia Digital Studio</h2>
    <div class="about-badge">⚡ Geleceğin Dijital Çözümleri</div>
    <p class="about-text" style="line-height:1.7; font-size:13.5px; margin-bottom:16px;">
      <strong>Nexvia Digital Studio</strong>; web tasarımdan mobil uygulamaya, SEO’dan özel yazılıma ve SaaS ekosistemlerine kadar markaların tüm dijital varlığını tek çatı altında inşa eden butik bir teknoloji stüdyosudur. Yaşam Haritası da stüdyomuz tarafından geliştirilen açık veri platformudur.
    </p>

    <!-- Ekosistem Markaları (Yaşam Haritası HARİÇ) -->
    <div style="background:var(--panel2); border:1px solid var(--border); border-radius:12px; padding:14px; margin-bottom:16px; text-align:left;">
      <div style="font-size:11px; font-weight:800; color:var(--accent2); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">Nexvia Ekosistemi &amp; Markaları</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px;">
        <div style="background:var(--panel); padding:8px 10px; border-radius:8px; border:1px solid var(--border);">
          <strong style="display:block; color:var(--txt); font-size:12px;">Mercan Adisyon</strong>
          <span style="color:var(--muted); font-size:10.5px;">Restoran POS &amp; Dijital QR Menü</span>
        </div>
        <div style="background:var(--panel); padding:8px 10px; border-radius:8px; border:1px solid var(--border);">
          <strong style="display:block; color:var(--txt); font-size:12px;">Anılarım Güvende</strong>
          <span style="color:var(--muted); font-size:10.5px;">Düğün &amp; Canlı Slayt QR Platformu</span>
        </div>
        <div style="background:var(--panel); padding:8px 10px; border-radius:8px; border:1px solid var(--border);">
          <strong style="display:block; color:var(--txt); font-size:12px;">Nexvia Storeline</strong>
          <span style="color:var(--muted); font-size:10.5px;">Yeni Nesil E-Ticaret Altyapısı</span>
        </div>
        <div style="background:var(--panel); padding:8px 10px; border-radius:8px; border:1px solid var(--border);">
          <strong style="display:block; color:var(--txt); font-size:12px;">Nexvia One &amp; SteelCore</strong>
          <span style="color:var(--muted); font-size:10.5px;">Fabrika Stok &amp; Modüler ERP</span>
        </div>
      </div>
    </div>

    <!-- Hizmetler -->
    <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:16px;">
      <span style="font-size:11px; background:var(--panel2); padding:3px 9px; border-radius:12px; color:var(--txt); font-weight:600;">Web Tasarım</span>
      <span style="font-size:11px; background:var(--panel2); padding:3px 9px; border-radius:12px; color:var(--txt); font-weight:600;">Özel Yazılım</span>
      <span style="font-size:11px; background:var(--panel2); padding:3px 9px; border-radius:12px; color:var(--txt); font-weight:600;">Mobil Uygulama</span>
      <span style="font-size:11px; background:var(--panel2); padding:3px 9px; border-radius:12px; color:var(--txt); font-weight:600;">SEO &amp; Pazarlama</span>
      <span style="font-size:11px; background:var(--panel2); padding:3px 9px; border-radius:12px; color:var(--txt); font-weight:600;">Marka Kimliği</span>
    </div>

    <div class="social-links" style="gap:8px;">
      <a href="https://www.nexviastudio.com/" target="_blank" rel="noopener" class="social-btn web" style="font-size:12px; padding:8px 12px;">
        <?= icon('globe', 15) ?> nexviastudio.com Resmi Sitemiz
      </a>
      <a href="https://wa.me/905313116892?text=Merhaba%2C%20Nexvia%20Digital%20Studio%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener" class="social-btn" style="background:#25D366; color:#fff; border-color:#25D366; font-size:12px; padding:8px 12px;">
        WhatsApp'tan Yazın
      </a>
      <a href="mailto:info@nexviastudio.com" class="social-btn github" style="font-size:12px; padding:8px 12px;">
        <?= icon('mail', 15) ?> info@nexviastudio.com
      </a>
    </div>
  </div>
</div>

<!-- 📢 KAPATILABİLİR POP-UP (INTERSTITIAL) REKLAM MODALI -->
<div class="ad-modal-backdrop" id="adModalBackdrop">
  <div class="ad-modal-card">
    <div class="ad-modal-header">
      <span class="ad-sponsor-tag">✨ Sponsorlu Bağlantı</span>
      <button class="ad-modal-close" id="adModalClose" title="Reklamı Kapat">&times;</button>
    </div>
    <div class="ad-modal-body" id="adModalBody">
      <div class="ad-placeholder-box">
        <span class="ad-label">Google AdSense Pop-up / Interstitial Slot #4</span>
        <!--
        <ins class="adsbygoogle"
             style="display:block; width:300px; height:250px;"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1122334455"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        -->
      </div>
    </div>
    <div class="ad-modal-footer">
      <button class="ad-skip-btn" id="adSkipBtn">Haritaya Devam Et &rsaquo;</button>
    </div>
  </div>
</div>

<script src="assets/app.js?v=<?= $jsV ?>"></script>
</body>
</html>
