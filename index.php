<?php
require __DIR__ . '/lib/icons.php';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yaşam Haritası — Türkiye'de Nerede Yaşarım?</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<link rel="stylesheet" href="assets/style.css?v=<?= time() ?>"/>

<!-- Google AdSense Yayıncı Kodu (ca-pub ID'nizi buraya yapıştırın) -->
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
          <button class="icon-btn" id="btnAbout" title="Geliştirici & Hakkında (Batuhan Akcan)">
            <?= icon('users', 16) ?>
          </button>
          <button class="icon-btn" id="btnThemeToggle" title="Temayı Değiştir (Açık/Karanlık)">
            <?= icon('sun', 16, 'ic-sun') ?>
            <?= icon('moon', 16, 'ic-moon') ?>
          </button>
        </div>
      </div>
      <p>Türkiye'de nerede yaşamalısın? Filtrele & keşfet. <span class="dev-tag" id="triggerAbout">⚡ Gönüllü Proje</span></p>
      
      <!-- Hızlı Arama -->
      <div class="search-box">
        <span class="search-ico"><?= icon('search', 14) ?></span>
        <input type="text" id="searchInput" placeholder="İl veya ilçe ara (örn. Amasra, Ayvalık...)" autocomplete="off">
        <button id="searchClear" class="search-clear">&times;</button>
        <div id="searchResults" class="search-results"></div>
      </div>

      <!-- Hazır Yaşam Tarzı Filtreleri -->
      <div class="preset-chips">
        <span class="preset-title">Hızlı Filtreler:</span>
        <div class="chips-row">
          <button class="chip-btn" data-preset="sea_summer">🌊 Kıyı & Yaz</button>
          <button class="chip-btn" data-preset="nature_cool">🏔️ Dağ & Doğa</button>
          <button class="chip-btn" data-preset="metropolis">💼 Metropol</button>
          <button class="chip-btn" data-preset="peace_safety">🛡️ Huzurlu</button>
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
      <span id="footerAbout">© Yaşam Haritası · <b style="cursor:pointer;color:var(--accent2);">Batuhan Akcan</b></span>
    </div>
  </aside>

  <div id="map"></div>

  <!-- Harita Üstü Reklam Şeridi (Google AdSense Slot #2) -->
  <div class="map-top-ad">
    <span class="ad-label">Sponsorlu</span>
    <!-- AdSense Kodu Slot #2 (728x90 Banner) -->
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
  </div>
</div>

<!-- Ben Kimim & Gönüllü Proje Modalı (Batuhan Akcan) -->
<div class="about-backdrop" id="aboutBackdrop">
  <div class="about-card">
    <button class="about-close" id="aboutClose">&times;</button>
    <div class="about-avatar">
      <span>👨‍💻</span>
    </div>
    <h2>Batuhan Akcan</h2>
    <div class="about-badge">⚡ Gönüllü & Ücretsiz Proje</div>
    <p class="about-text">
      Merhaba! Ben <b>Batuhan Akcan</b>. Yaşam Haritası projesini tamamen <b>gönüllü ve ücretsiz</b> olarak geliştirdim. Amacım, Türkiye'de yaşamak için iklimi, deniz mesafesi, rakımı, canlı nem/hava kalitesi ve altyapısı kendi yaşam tarzına en çok uyan şehir ve ilçeleri herkesin kolayca keşfedebilmesidir.
    </p>
    <div class="social-links">
      <a href="https://instagram.com/batuhann_akcan" target="_blank" rel="noopener" class="social-btn insta">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        Instagram: @batuhann_akcan
      </a>
    </div>
    <div class="about-footer-text">Destek olmak ve görüşlerinizi iletmek için Instagram üzerinden ulaşabilirsiniz.</div>
  </div>
</div>

<!-- Kapatılabilir Pop-up Reklam Modalı (AdSense Interstitial Slot #4) -->
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

<script src="assets/app.js?v=<?= time() ?>"></script>
</body>
</html>
