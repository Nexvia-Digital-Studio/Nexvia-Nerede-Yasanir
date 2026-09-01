<?php
/**
 * Yaşam Haritası — Hakkımızda / Nexvia Digital Studio (hakkimizda.php)
 */
require_once __DIR__ . '/lib/icons.php';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hakkımızda — Nexvia Digital Studio | Yaşam Haritası</title>
<link rel="stylesheet" href="assets/style.css"/>
<style>
/* ABOUT PAGE OVERRIDES */
body { overflow-y: auto !important; height: auto !important; min-height: 100vh; }
.about-page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}
.about-hero-box {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: clamp(35px, 5vw, 60px) clamp(20px, 4vw, 45px);
  margin-bottom: 40px;
  box-shadow: 0 10px 30px var(--shadow);
  position: relative;
  overflow: hidden;
}
.about-hero-box::after {
  content: 'NEXVIA';
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 8rem;
  font-weight: 900;
  color: rgba(255,255,255,0.03);
  pointer-events: none;
}
.about-badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent2);
  font-size: 12px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.stats-grid-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  margin-top: 24px;
}
.about-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}
.about-card-block {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 16px var(--shadow);
}
.brands-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.brand-card-item {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, border-color 0.2s;
}
.brand-card-item:hover {
  transform: translateY(-3px);
  border-color: var(--accent2);
}
.services-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.nav-back-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 13px;
  color: var(--muted);
}
.nav-back-bar a {
  color: var(--txt);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
}
.nav-back-bar a:hover { color: var(--accent2); }
</style>
</head>
<body>

<div class="about-page-container">

  <!-- TOP NAV -->
  <div class="nav-back-bar">
    <a href="index.php">
      <?= icon('map-pin', 16) ?> Yaşam Haritası Ana Sayfa
    </a>
    <span>Hakkımızda</span>
  </div>

  <!-- HERO -->
  <div class="about-hero-box">
    <span class="about-badge-tag">
      <?= icon('zap', 14) ?> NEXVIA DIGITAL STUDIO
    </span>
    <h1 style="font-size: clamp(28px, 4vw, 42px); font-weight: 900; line-height: 1.25; margin-bottom: 16px; color: var(--txt);">
      Geleceğin Dijital Çözümleri <br><span style="color: var(--accent2);">Vizyonerler ve Markalar</span> İçin
    </h1>
    <p style="color: var(--muted); font-size: 16px; line-height: 1.8; max-width: 820px; margin-bottom: 24px;">
      <strong>Nexvia Digital Studio</strong>; web tasarımdan mobil uygulamaya, SEO’dan özel yazılıma ve uçtan uca SaaS platformlarına kadar markanızın tüm dijital varlığını tek çatı altında, modern mimariyle ve yüksek kalitede hayata geçiren butik bir teknoloji stüdyosudur. <em>Yaşam Haritası</em> da stüdyomuz tarafından geliştirilen açık veri platformudur.
    </p>

    <!-- İstatistik Şeridi -->
    <div class="stats-grid-row">
      <div>
        <div style="font-size: 26px; font-weight: 900; color: var(--accent2);">50+</div>
        <div style="font-size: 12px; color: var(--muted); font-weight: 600;">Tamamlanan Proje</div>
      </div>
      <div style="width: 1px; background: var(--border); height: 35px; align-self: center;"></div>
      <div>
        <div style="font-size: 26px; font-weight: 900; color: var(--accent2);">7-21 Gün</div>
        <div style="font-size: 12px; color: var(--muted); font-weight: 600;">Hızlı Teslimat</div>
      </div>
      <div style="width: 1px; background: var(--border); height: 35px; align-self: center;"></div>
      <div>
        <div style="font-size: 26px; font-weight: 900; color: var(--accent2);">%100</div>
        <div style="font-size: 12px; color: var(--muted); font-weight: 600;">Özel &amp; Temiz Kod</div>
      </div>
      <div style="width: 1px; background: var(--border); height: 35px; align-self: center;"></div>
      <div>
        <div style="font-size: 26px; font-weight: 900; color: var(--accent2);">7/24</div>
        <div style="font-size: 12px; color: var(--muted); font-weight: 600;">Kesintisiz İletişim</div>
      </div>
    </div>
  </div>

  <!-- BİZ KİMİZ & NEDEN NEXVIA -->
  <div class="about-grid-2">
    <div class="about-card-block">
      <span style="color: var(--accent2); font-size: 12px; font-weight: 800; text-transform: uppercase;">BİZ KİMİZ?</span>
      <h2 style="font-size: 22px; font-weight: 800; color: var(--txt); margin: 8px 0 14px;">
        Fikirleri Yaşayan, Hızlı ve Dönüştürücü Dijital Ürünlere Dönüştürüyoruz
      </h2>
      <p style="color: var(--muted); font-size: 14px; line-height: 1.8; margin-bottom: 12px;">
        Kocaeli, Sakarya ve İstanbul merkezli olarak kurulan <strong>Nexvia Digital Studio</strong>, Türkiye’nin ve dünyanın dört bir yanındaki işletmelere uçtan uca dijital çözümler üretir.
      </p>
      <p style="color: var(--muted); font-size: 14px; line-height: 1.8;">
        Şablonlara sıkışmış sıradan yapılar yerine; markanızın kimliğini birebir yansıtan, ışık hızında açılan, arama motorlarında üst sıralara tırmanan ve doğrudan satış getiren dijital sistemler inşa ediyoruz.
      </p>
    </div>

    <div class="about-card-block">
      <span style="color: var(--accent2); font-size: 12px; font-weight: 800; text-transform: uppercase;">DEĞERLERİMİZ</span>
      <h2 style="font-size: 22px; font-weight: 800; color: var(--txt); margin: 8px 0 14px;">
        Neden Nexvia?
      </h2>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; gap: 12px; align-items: flex-start;">
          <div style="color: var(--accent2); font-size: 16px; margin-top: 2px;"><?= icon('zap', 18) ?></div>
          <div>
            <strong style="color: var(--txt); font-size: 14px; display: block;">Ultra Hızlı &amp; Modern Mimari</strong>
            <span style="color: var(--muted); font-size: 12.5px; line-height: 1.5;">Google PageSpeed 95+ test skorlu, optimize edilmiş temiz kod tabanı.</span>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start;">
          <div style="color: #22c55e; font-size: 16px; margin-top: 2px;"><?= icon('compass', 18) ?></div>
          <div>
            <strong style="color: var(--txt); font-size: 14px; display: block;">Kullanıcı Odaklı Tasarım</strong>
            <span style="color: var(--muted); font-size: 12.5px; line-height: 1.5;">Kullanıcıların aradığını saniyeler içinde bulduğu modern UI/UX deneyimi.</span>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start;">
          <div style="color: #eab308; font-size: 16px; margin-top: 2px;"><?= icon('check', 18) ?></div>
          <div>
            <strong style="color: var(--txt); font-size: 14px; display: block;">Şeffaf Süreç &amp; Zamanında Teslim</strong>
            <span style="color: var(--muted); font-size: 12.5px; line-height: 1.5;">Gizli maliyet yok. Belirlenen takvimde eksiksiz teslim ve kesintisiz destek.</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- EKOSİSTEMİMİZ (Yaşam Haritası HARİÇ) -->
  <div style="margin-bottom: 40px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="color: var(--accent2); font-size: 12px; font-weight: 800; text-transform: uppercase;">EKOSİSTEMİMİZ</span>
      <h2 style="font-size: 26px; font-weight: 800; color: var(--txt); margin-top: 4px;">
        Nexvia Bünyesinde Geliştirilen Öncü Ürünler
      </h2>
    </div>

    <div class="brands-grid-4">
      <!-- Mercan Adisyon -->
      <div class="brand-card-item">
        <div>
          <div style="color: var(--accent2); margin-bottom: 10px;"><?= icon('layers', 24) ?></div>
          <span style="font-size: 11px; font-weight: 800; color: #0284c7; background: rgba(2, 132, 199, 0.15); padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Restoran POS</span>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--txt); margin: 8px 0 6px;">Mercan Adisyon</h3>
          <p style="color: var(--muted); font-size: 12.5px; line-height: 1.6; margin-bottom: 16px;">
            Restoran ve kafelerin sipariş, mutfak ve stok akışını tek ekranda toplayan dijital adisyon ve QR menü sistemi.
          </p>
        </div>
        <a href="https://www.mercanadisyon.com" target="_blank" rel="noopener" style="color: var(--accent2); font-size: 12px; font-weight: 700; text-decoration: none;">
          mercanadisyon.com &rsaquo;
        </a>
      </div>

      <!-- Anılarım Güvende -->
      <div class="brand-card-item">
        <div>
          <div style="color: #d97706; margin-bottom: 10px;"><?= icon('heart', 24) ?></div>
          <span style="font-size: 11px; font-weight: 800; color: #d97706; background: rgba(217, 119, 6, 0.15); padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Düğün &amp; Etkinlik</span>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--txt); margin: 8px 0 6px;">Anılarım Güvende</h3>
          <p style="color: var(--muted); font-size: 12.5px; line-height: 1.6; margin-bottom: 16px;">
            Misafirlerin QR kod ile uygulama indirmeden orijinal kalitede fotoğraf paylaştığı canlı slayt ve dijital anı platformu.
          </p>
        </div>
        <a href="https://anilarimguvende.com" target="_blank" rel="noopener" style="color: #d97706; font-size: 12px; font-weight: 700; text-decoration: none;">
          anilarimguvende.com &rsaquo;
        </a>
      </div>

      <!-- Nexvia Storeline -->
      <div class="brand-card-item">
        <div>
          <div style="color: #ff5500; margin-bottom: 10px;"><?= icon('home', 24) ?></div>
          <span style="font-size: 11px; font-weight: 800; color: #ff5500; background: rgba(255, 85, 0, 0.15); padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">E-Ticaret SaaS</span>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--txt); margin: 8px 0 6px;">Nexvia Storeline</h3>
          <p style="color: var(--muted); font-size: 12.5px; line-height: 1.6; margin-bottom: 16px;">
            Markalar için yüksek dönüşümlü, PayTR entegre, dinamik varyant ve kargo yönetimli yeni nesil e-ticaret platformu.
          </p>
        </div>
        <a href="https://www.nexviastudio.com" target="_blank" rel="noopener" style="color: #ff5500; font-size: 12px; font-weight: 700; text-decoration: none;">
          nexviastudio.com &rsaquo;
        </a>
      </div>

      <!-- Nexvia One & SteelCore -->
      <div class="brand-card-item">
        <div>
          <div style="color: #7c3aed; margin-bottom: 10px;"><?= icon('activity', 24) ?></div>
          <span style="font-size: 11px; font-weight: 800; color: #7c3aed; background: rgba(124, 58, 237, 0.15); padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Kurumsal ERP</span>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--txt); margin: 8px 0 6px;">Nexvia One &amp; SteelCore</h3>
          <p style="color: var(--muted); font-size: 12.5px; line-height: 1.6; margin-bottom: 16px;">
            Fabrika ve sanayi kuruluşları için rulo sac stok takibi, akıllı bobin dilme ve barkodlu üretim ERP platformu.
          </p>
        </div>
        <a href="https://www.nexviastudio.com" target="_blank" rel="noopener" style="color: #7c3aed; font-size: 12px; font-weight: 700; text-decoration: none;">
          nexviastudio.com &rsaquo;
        </a>
      </div>
    </div>
  </div>

  <!-- HİZMETLER -->
  <div class="about-card-block" style="margin-bottom: 40px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="color: var(--accent2); font-size: 12px; font-weight: 800; text-transform: uppercase;">UZMANLIKLARIMIZ</span>
      <h2 style="font-size: 24px; font-weight: 800; color: var(--txt); margin-top: 4px;">
        Nexvia Digital Studio Hizmetleri
      </h2>
    </div>

    <div class="services-grid-3">
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">Web Siteleri &amp; Portallar</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">Kurumsal web siteleri, e-ticaret ve landing sayfaları. Ultra hızlı, mobil ve SEO uyumlu.</p>
      </div>
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">Özel Yazılım &amp; SaaS</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">İş süreçlerinizi otomatikleştiren ERP/CRM panelleri, QR sistemleri ve API mimarileri.</p>
      </div>
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">Mobil Uygulamalar</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">iOS ve Android için modern, akıcı ve yüksek performanslı uygulamalar.</p>
      </div>
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">Grafik Tasarım &amp; Kimlik</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">Logo, kurumsal kimlik, sosyal medya tasarımları ve dijital marka varlıkları.</p>
      </div>
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">SEO &amp; Dijital Pazarlama</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">Teknik SEO, arama motoru sıralama optimizasyonu ve Google Ads yönetimi.</p>
      </div>
      <div style="padding: 16px; background: var(--panel2); border-radius: 12px; border: 1px solid var(--border);">
        <strong style="color: var(--txt); font-size: 14px; display: block; margin-bottom: 4px;">Marka Danışmanlığı</strong>
        <p style="color: var(--muted); font-size: 12.5px; line-height: 1.5; margin: 0;">Pazarda ayrışmanızı sağlayan marka konumlandırması ve büyüme yol haritası.</p>
      </div>
    </div>
  </div>

  <!-- KAPANIŞ CTA -->
  <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid var(--border); border-radius: 20px; padding: clamp(30px, 4vw, 50px); text-align: center;">
    <span class="about-badge-tag">BİRLİKTE ÜRETELİM</span>
    <h2 style="font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 12px;">
      Projenizi <span style="color: var(--accent2);">Nexvia Studio</span> ile Hayata Geçirin
    </h2>
    <p style="color: var(--muted); font-size: 14px; max-width: 600px; margin: 0 auto 24px; line-height: 1.7;">
      Yeni bir web sitesi, özel yazılım, SaaS veya dijital marka projeniz mi var? Nexvia ekibine yazın, projenize en uygun yol haritasını hemen hazırlayalım.
    </p>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
      <a href="https://www.nexviastudio.com" target="_blank" rel="noopener" class="btn active" style="padding: 12px 24px; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px;">
        <?= icon('globe', 16) ?> nexviastudio.com Resmi Sitemiz
      </a>
      <a href="https://wa.me/905313116892?text=Merhaba%2C%20Nexvia%20Digital%20Studio%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener" class="btn" style="background: #25D366; color: #fff; border-color: #25D366; padding: 12px 22px; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px;">
        WhatsApp'tan Yazın
      </a>
      <a href="mailto:info@nexviastudio.com" class="btn" style="padding: 12px 20px; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px;">
        <?= icon('mail', 16) ?> info@nexviastudio.com
      </a>
    </div>
  </div>

</div>

</body>
</html>
