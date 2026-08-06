# 🗺️ Yaşam Haritası — Nexvia Nerede Yaşanır?

> **Türkiye'de Yaşayabileceğin En İdeal İl ve İlçeyi Keşfet!**
> 
> Canlı iklim verileri, deniz mesafesi, rakım, hava kalitesi (AQI), canlı nem oranı, deprem riski ve altyapı skoru ile Türkiye'deki 81 il ve 950+ ilçeyi filtreleyin ve size en uyumlu yaşam alanını harita üzerinde görün.

---

## 🌟 Öne Çıkan Özellikler

- 📍 **81 İl ve 950+ İlçe Desteği**: Türkiye'nin tüm illeri ve ilçeleri koordinatlarıyla entegre.
- 🎯 **Hassas Sürekli Uyum Skorlaması**: Slider hareket ettikçe skorlar (%100, %92, %85, %76...) kademeli ve duyarlı biçimde değişir.
- 🛑 **%70 Uyum Eşik Filtresi**: Kriterlerinize %70'ten daha az uyan konumlar haritadan otomatik elenir/silinir.
- 🌤️ **Canlı Hava Durumu & AQI Integration**: Open-Meteo API ile anlık nem, sıcaklık ve hava kirliliği (AQI) verisi.
- 🔍 **Canlı Şehir & İlçe Arama**: Açılır arama menüsü ile istenen il veya ilçeye anında uçuş (flyTo).
- 🌓 **Açık & Karanlık Tema (Light/Dark Mode)**: Göz yormayan CartoDB basemap temaları.
- 📱 **Mobil & Performans Odaklı**: Viewport bounds filtresi ve zoom eşikleri (Zoom 9.5+) sayesinde kasma ve donma yaşanmaz.
- 💰 **Google AdSense Hazır Entegrasyonu**: Sayfa içi, sidebar, harita üstü banner ve kapatılabilir pop-up (interstitial) reklam alanları hazır.

---

## 🚀 Kurulum & Çalıştırma

Projeyi yerel sunucunuzda (XAMPP, WAMP, Laragon veya Apache/Nginx) çalıştırmak için:

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/Nexvia-Digital-Studio/Nexvia-Nerede-Ya-an-r.git
   cd Nexvia-Nerede-Ya-an-r
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

## 👨‍💻 Geliştirici & İletişim

**Batuhan Akcan / Nexvia Digital Studio**
- 📸 Instagram: [@batuhann_akcan](https://instagram.com/batuhann_akcan)
- 🌐 GitHub: [Nexvia Digital Studio](https://github.com/Nexvia-Digital-Studio)

*Gönüllü ve ücretsiz bir açık kaynak projesidir.*
