# 🗺️ Yaşam Haritası — Nexvia Nerede Yaşanır?

> **Türkiye'de Yaşayabileceğin En İdeal İl ve İlçeyi Keşfet!**
> 
> Geliştirici & Stüdyo: **[Nexvia Digital Studio](https://www.nexviastudio.com/)** · Batuhan Akcan ([@batuhann_akcan](https://instagram.com/batuhann_akcan))

Canlı iklim verileri, deniz mesafesi, rakım, hava kalitesi (AQI), canlı nem oranı, deprem riski ve altyapı skoru ile Türkiye'deki 81 il ve 950+ ilçeyi filtreleyin ve size en uyumlu yaşam alanını harita üzerinde görün.

---

## 🌟 Öne Çıkan Özellikler

- 🔮 **"Ruh Şehrini Bul" Quiz Modu**: 3 eğlenceli soru ile ideal yaşam alanınızı bulun.
- 🎲 **"Beni Şaşırt!"**: Filtrelerinize uyan şehirler arasından rastgele bir yer seçer ve konfetilerle uçuş (flyTo) yapar.
- 📸 **Instagram Story Kartı Üreticisi**: Seçilen şehir ve uyum skorunuzu 1 tıkla şık bir Instagram Story görseli (`.png`) olarak indirin.
- ⚖️ **Side-by-Side Şehir Karşılaştırma**: İki şehir veya ilçeyi yan yana getiren kıyaslama tablosu.
- ❤️ **Favorilerim (Wishlist)**: Beğendiğiniz yerleri kaydedip dilediğiniz zaman inceleyin.
- 📍 **81 İl ve 950+ İlçe Desteği**: Türkiye'nin tüm illeri ve ilçeleri koordinatlarıyla entegre.
- 🎯 **Hassas Sürekli Uyum Skorlaması**: Slider hareket ettikçe skorlar (%100, %92, %85, %76...) kademeli ve duyarlı biçimde değişir.
- 🛑 **%70 Uyum Eşik Filtresi**: Kriterlerinize %70'ten daha az uyan konumlar haritadan otomatik elenir/silinir.
- 🌤️ **Canlı Hava Durumu & AQI Integration**: Open-Meteo API ile anlık nem, sıcaklık ve hava kirliliği (AQI) verisi.
- 🌓 **Açık & Karanlık Tema (Light/Dark Mode)**: Göz yormayan CartoDB basemap temaları.
- 📱 **Mobil & Performans Odaklı**: Viewport bounds filtresi ve zoom eşikleri (Zoom 9.5+) sayesinde kasma ve donma yaşanmaz.
- 💰 **Google AdSense Entegrasyonu**: Banner ve kapatılabilir pop-up (interstitial) reklam alanları hazır.

---

## 🚀 Kurulum & Çalıştırma

Projeyi yerel sunucunuzda (XAMPP, WAMP, Laragon veya Apache/Nginx) çalıştırmak için:

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/Nexvia-Digital-Studio/Nexvia-Nerede-Yasanir.git
   cd Nexvia-Nerede-Yasanir
   ```

2. **Veritabanını İçe Aktarın**:
   - MySQL veritabanınızda `yasam_haritasi` adında bir veritabanı oluşturun.
   - `lib/db.php` dosyasındaki veritabanı bağlantı bilgilerini güncelleyin:
     ```php
     $pdo = new PDO("mysql:host=localhost;dbname=yasam_haritasi;charset=utf8mb4", "root", "");
     ```

3. **Sunucuyu Başlatın**:
   - Web tarayıcınızdan `http://localhost/yasam-haritasi/` adresine gidin.

---

## 📜 Lisans & Kullanım Koşulları (AGPL-3.0)

Bu proje **GNU Affero General Public License v3.0 (AGPL-3.0)** altında açık kaynaklı olarak sunulmaktadır.

> ⚠️ **AÇIK KAYNAK VE TİCARİ KULLANIM ŞARTLARI:**
> - Bu projeyi ücretsiz olarak inceleyebilir, geliştirebilir ve kişisel/açık kaynaklı projelerinizde kullanabilirsiniz.
> - **Ticari / Gelir Elde Etme Şartı**: Bu projeyi altyapı olarak kullanarak **para kazanmayı, ticari bir servis sunmayı (SaaS)** veya kapalı kaynaklı bir ürün geliştirmeyi hedefliyorsanız, geliştirdiğiniz tüm versiyonu, altyapıyı ve kaynak kodları **AGPL-3.0 uyarınca tamamen AÇIK KAYNAK olarak yayınlamak zorundasınız**. Bu proje kapalı kaynaklı ticari altyapı olarak kullanılamaz.

---

## 🌐 Nexvia Digital Studio & İletişim

- 🌐 **Web Sitemiz**: [https://www.nexviastudio.com/](https://www.nexviastudio.com/)
- 💻 **GitHub**: [Nexvia Digital Studio GitHub](https://github.com/Nexvia-Digital-Studio)
- 📸 **Geliştirici Instagram**: [@batuhann_akcan](https://instagram.com/batuhann_akcan)

*Gönüllü ve ücretsiz bir açık kaynak projesidir.*
