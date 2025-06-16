# TrainerPlatform - Eğitmen Öğrenci Yönetim Sistemi

makinetalha.com'dan ilham alınarak tasarlanan modern bir eğitmen-öğrenci yönetim platformu. Bu platform, eğitmenlerin öğrencilerini takip etmelerine, antrenman programları oluşturmalarına ve öğrencileri ile iletişim kurmalarına olanak tanır.

## 🚀 Özellikler

### 📊 Dashboard
- Genel platform istatistikleri
- Aktif öğrenci ve program sayıları
- Okunmamış mesaj bilgileri
- Hızlı işlem butonları
- Son eklenen öğrenciler listesi

### 👥 Öğrenci Yönetimi
- **Yeni öğrenci ekleme**: Ad, e-posta, telefon ve notlar ile
- **Öğrenci silme**: Güvenli silme onayı ile
- **Durum değiştirme**: Aktif/pasif durumu kontrolü
- **Öğrenci arama**: İsim ve e-posta ile arama
- **Detay görüntüleme**: Tam profil bilgileri ve program geçmişi
- **Program atama**: Öğrencilere direkt program ataması

### 📋 Program Yönetimi
- **Program oluşturma**: İsim, açıklama, süre ve egzersiz seçimi
- **Egzersiz yönetimi**: Farklı kategorilerde egzersizler (powerlifting, cardio, strength)
- **Program detayları**: Set, tekrar, ağırlık ve süre bilgileri
- **Program düzenleme**: Mevcut programları güncelleme
- **Program silme**: Güvenli silme işlemi

### 📧 Mesajlaşma Sistemi
- **Yeni mesaj gönderme**: Öğrenci seçimi ve konu ile
- **Mesaj filtreleme**: Tüm, okunmamış, gönderilen mesajlar
- **Mesaj arama**: Konu ve içerik arama
- **Yanıt verme**: Mesajlara hızlı yanıt
- **Okundu işaretleme**: Otomatik okundu durumu

### ⚙️ Ayarlar
- **Profil yönetimi**: Eğitmen bilgileri düzenleme
- **Bildirim ayarları**: E-posta ve platform bildirimleri
- **Platform istatistikleri**: Kullanım metrikleri

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion (gelecek güncellemelerde)
- **State Management**: React useState hooks
- **Form Handling**: React Hook Form (gelecek güncellemelerde)

## 🎨 Tasarım

Platform, makinetalha.com'un modern ve karanlık temasından ilham alarak tasarlanmıştır:

- **Renk Paleti**: Siyah/koyu gri temel, turuncu gradient vurgular
- **Tipografi**: Inter font ailesi
- **Layout**: Responsive tasarım, mobile-first yaklaşım
- **Animasyonlar**: Hover efektleri ve geçiş animasyonları
- **İkonlar**: Modern, minimal Lucide ikonu seti

## 📦 Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone [repo-url]
cd trainer-platform
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 📂 Proje Yapısı

```
trainer-platform/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global CSS dosyası
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── Header.tsx         # Navigation header
│   ├── Dashboard.tsx      # Dashboard komponenti
│   ├── Students.tsx       # Öğrenci yönetimi
│   ├── Programs.tsx       # Program yönetimi
│   └── Messages.tsx       # Mesajlaşma sistemi
├── lib/                   # Yardımcı dosyalar
│   ├── types.ts          # TypeScript tip tanımları
│   └── mockData.ts       # Test verileri
├── public/               # Statik dosyalar
└── README.md            # Bu dosya
```

## 🚀 Kullanım

### İlk Adımlar
1. Platform açıldığında Dashboard sayfası gösterilir
2. Header'daki menüden farklı bölümlere geçiş yapabilirsiniz
3. Her bölümde arama ve filtreleme özellikleri mevcuttur

### Öğrenci Ekleme
1. "Öğrenciler" bölümüne gidin
2. "Yeni Öğrenci" butonuna tıklayın
3. Gerekli bilgileri doldurun
4. "Öğrenci Ekle" butonuna tıklayın

### Program Oluşturma
1. "Programlar" bölümüne gidin
2. "Yeni Program" butonuna tıklayın
3. Program bilgilerini girin
4. Egzersizleri seçin
5. "Program Oluştur" butonuna tıklayın

### Mesaj Gönderme
1. "Mesajlar" bölümüne gidin
2. "Yeni Mesaj" butonuna tıklayın
3. Alıcı öğrenciyi seçin
4. Konu ve mesaj içeriğini yazın
5. "Gönder" butonuna tıklayın

## 🎯 Gelecek Özellikler

- [ ] Gerçek veritabanı entegrasyonu
- [ ] E-posta gönderme sistemi
- [ ] Öğrenci progress takibi
- [ ] Grafik ve analitik dashboard
- [ ] Mobil uygulama
- [ ] Çoklu dil desteği
- [ ] Tema değiştirme seçenekleri
- [ ] Export/Import işlevleri
- [ ] Backup sistemi

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

Bu platform, modern web teknolojileri kullanılarak geliştirilmiştir ve sürekli güncellenmektedir.

---

**"Bahane bulmak saatte sıfır kalori yakıyor!"** - makinetalha.com'dan ilham alınmıştır. 