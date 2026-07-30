# YAZGI — Proje Yol Haritası
*Türk mitolojisi temalı, kart-kaydırma tarzı hikaye oyunu (Reigns / Lapse Before Zero esintili)*

---

## 1. Konsept Özeti

| Alan | İçerik |
|---|---|
| Tür | Karar-tabanlı, kart-kaydırmalı hikaye simülasyonu |
| Tema | Türk mitolojisi — bir oba kağanının hükümdarlığı |
| Platform | Mobil (iOS/Android), React Native + Expo + TypeScript |
| Ana mekanik | Kartı sağa/sola kaydır → karar ver → istatistikler değişir |
| Kaybetme koşulu | Açlık, Kut, Asker, Halk değerlerinden biri 0 veya 100 olursa "ölüm" ve özel mesaj |
| Kazanma/İlerleme | Hikaye ağacı boyunca ilerleme, farklı sonlar, yeni kağanlar (nesil geçişi — Reigns'teki gibi olabilir) |

Bu doküman; oyunu **yapay zeka destekli (opencode + LLM ile içerik üretimi)** geliştirmek isteyen tek kişilik/az kişilik bir ekip için düşünülmüştür. Amaç: küçük, oynanabilir bir prototipten başlayıp adım adım tam bir oyuna büyümek.

---

## 2. Oyun Tasarım Dokümanı (GDD) — Çekirdek Sistemler

### 2.1 İstatistik Sistemi
- 4 temel değer: **Açlık, Kut, Asker, Halk** (0–100 arası)
- Her kart kararı bu değerlerden bir veya birkaçını ± değiştirir
- Dengeleme kritik: her değer için "tehlike eşiği" (örn. 80+ veya 20-) yaklaşınca uyarı kartları/ikonları tetiklenmeli
- Öneri: 5. bir gizli değer olarak **"Yazgı Puanı"** veya **"Tengri'nin Gözü"** gibi ilerleme/skor değeri eklenebilir (sonları etkileyen gizli bir sayaç — Reigns'te böyle bir "yıl sayacı" var)

### 2.2 Kart/Olay Sistemi
- Her kart: `id`, `karakter` (elçi/eş/çocuk/şaman/düşman vs.), `metin`, `sol_secim`, `sag_secim`, her seçimin stat etkisi, sonraki kart bağlantıları (koşullu dallanma)
- Kartlar tamamen **veri odaklı** olmalı (JSON/YAML) — kod değişmeden yeni içerik eklenebilsin
- Koşullu tetikleyiciler: "Asker < 20 ise bu kart gelsin", "belirli bir karakterle önceki etkileşime göre farklı kart gelsin" gibi basit bir kural motoru

### 2.3 Karakterler (mitolojiden ilham)
- Kağan (oyuncu), Hatun (eş), Elçiler, Şaman/Kam, Ordu Beyi, Halk temsilcisi
- Mitolojik figürler olay kartlarında görünebilir: Tengri, Umay Ana, Erlik, Kayra Han, Ülgen, Albastı, Yer-Su ruhları vb. — bunlar "kader/kut" temalı özel event'ler için kullanılabilir
- Her karakterin kendi küçük hikaye çizgisi (arc) olmalı ki oyuncu bağ kursun

### 2.4 Son Sistemi
- Çoklu "ölüm" sonu (her stat için ayrı mesaj/görsel)
- Nesil geçişi: kağan ölünce oğlu/kızı tahta geçer, oyun bir sonraki kağanla devam eder (Reigns'in temel formülü)
- İsteğe bağlı: "iyi son" / gerçek final — belirli bir hikaye şartı sağlanınca

---

## 3. Teknik Mimari

### 3.1 Proje İskeleti
- **Expo (managed workflow, TypeScript template)** — `npx create-expo-app yazgi -t expo-template-blank-typescript`
- State yönetimi: **Zustand** (küçük/orta ölçek oyunlar için Redux'tan daha hafif ve hızlı kurulum)
- Kart kaydırma animasyonu: **react-native-gesture-handler** + **react-native-reanimated**
- Kayıt (save/load): **AsyncStorage** veya **expo-sqlite** (çok fazla ilerleme verisi olacaksa SQLite daha sağlam)
- Ses: **expo-av**
- Görseller: yerel asset + isteğe bağlı AI görsel üretimi (mitolojik illüstrasyon stili)

### 3.2 Önerilen Klasör Yapısı
```
/src
  /components      → Card, StatBar, EndingScreen vb. UI bileşenleri
  /game
    /engine         → kart motoru, koşul değerlendirme, stat güncelleme mantığı
    /data           → cards.json, characters.json, endings.json
  /store            → zustand store'ları (gameState, statsState, saveState)
  /screens          → HomeScreen, GameScreen, EndingScreen, SettingsScreen
  /assets           → görseller, sesler, fontlar
  /utils
```

### 3.3 Veri Modeli Örneği (kart)
```ts
interface Card {
  id: string;
  characterId: string;
  text: string;
  left: Choice;
  right: Choice;
  conditions?: Condition[]; // bu kartın çıkması için gereken şartlar
}

interface Choice {
  text: string;
  effects: Partial<Record<StatKey, number>>; // { asker: -10, halk: +5 }
  nextCardId?: string;
}
```
Bu yapı sayesinde **oyun motoru ile içerik birbirinden tamamen ayrılır** — yani hikaye/kart içeriğini bir LLM'e yazdırıp doğrudan JSON'a basabilirsin, kod tarafına dokunmadan.

---

## 4. İçerik Üretim Hattı (Türk Mitolojisi + AI)

1. **Araştırma:** Dede Korkut, Manas, Oğuz Kağan Destanı, Gök Tanrı inancı, Şamanizm unsurları — kaynakça oluştur (Bahaeddin Ögel'in "Türk Mitolojisi" gibi akademik kaynaklar önerilir)
2. **Karakter ve dünya kutusu (bible):** kağanlık, oba yapısı, dini/ruhani kavramlar (kut, ongun, tös vb.) için kısa bir "dünya dokümanı" yaz — LLM'e içerik ürettirirken tutarlılık için bu dokümanı referans olarak ver
3. **Kart içeriği üretimi:** LLM'e (Claude, vs.) "şu formatta, şu karaktere ait, şu stat etkilerine sahip 10 kart yaz" gibi promptlarla toplu üretim yaptırıp JSON'a dök
4. **Denge testi:** kartları oynanabilir hâle getirdikten sonra playtest ile stat dengesini ayarla (bir "simülatör" script'i yazıp yüzlerce rastgele oyun simülasyonu çalıştırmak, ortalama hayatta kalma süresini ölçmek işine yarar)

---

## 5. Yol Haritası (Fazlara Bölünmüş)

### Faz 0 — Hazırlık (1 hafta)
- [ ] GDD'yi netleştir (istatistik isimleri, ölüm mesajları, ton/üslup)
- [ ] Expo + TypeScript proje iskeletini kur
- [ ] Zustand, gesture-handler, reanimated kurulumu
- [ ] Basit bir kart verisi (5-10 kart) ile "sahte" içerik hazırla

### Faz 1 — Çekirdek Oynanış Prototipi (2-3 hafta)
- [ ] Kart kaydırma bileşeni (swipe left/right, animasyon, geri bildirim)
- [ ] Stat bar UI + stat güncelleme mantığı
- [ ] Basit doğrusal kart akışı (dallanma olmadan) çalışır hâle getir
- [ ] 0/100 stat durumunda ölüm ekranı tetiklensin
- [ ] Bu aşamada oynanabilir, "acı verici derecede çirkin ama işlevsel" bir prototip hedefle

### Faz 2 — Hikaye Motoru ve İçerik (3-4 hafta)
- [ ] Koşullu kart sistemi (branching) ekle
- [ ] Karakter sistemini bağla (her kartın bir karakteri olsun, karakter portreleri)
- [ ] AI destekli içerik üretimiyle 100-150 kartlık ilk içerik havuzunu oluştur
- [ ] Nesil geçişi / çoklu kağan sistemini ekle
- [ ] Kaydetme/yükleme (AsyncStorage/SQLite)

### Faz 3 — Görsel & Ses Cilası (2-3 hafta)
- [ ] Sanat yönü belirle (minimalist mi, illüstratif mi — mitolojik motifler: gök tanrı, kurt, bozkır)
- [ ] Kart illüstrasyonları (AI görsel araçları + gerekirse manuel düzenleme)
- [ ] Müzik/ses efektleri (kopuz temalı arka plan müziği vb.)
- [ ] Geçiş animasyonları, haptic feedback

### Faz 4 — Test, Denge, Yayın Hazırlığı (2-3 hafta)
- [ ] Playtest turları (arkadaş çevresi / küçük kapalı beta)
- [ ] Stat dengesi ince ayarı, ölüm oranı analizi
- [ ] Expo EAS Build ile iOS/Android build alma
- [ ] Store listing (ikon, ekran görüntüleri, açıklama metni)
- [ ] Yayın (TestFlight / Play Console kapalı test → yayın)

### Faz 5 (Opsiyonel) — Genişleme
- [ ] Yeni "dönem"ler / haritalar (farklı oba, farklı dönem)
- [ ] Başarımlar (achievements), günlük görev vb. retention mekanikleri
- [ ] Lokalizasyon (İngilizce çeviri ile uluslararası mitoloji meraklılarına ulaşma)

---

## 6. AI Araçlarıyla Geliştirme Notları (opencode vb.)

- **Kod tarafı:** opencode gibi ajan araçlarını küçük, net görevlerle besle ("Card bileşenine swipe-out animasyonu ekle", "Zustand store'a yeni bir stat ekle") — büyük "bütün oyunu yaz" promptları yerine adım adım ilerlemek hem kaliteyi artırır hem hata ayıklamayı kolaylaştırır
- **İçerik tarafı:** kod üretimi ile hikaye/kart metni üretimini ayrı promptlarda tut; içerik üretimi için önce "dünya dokümanı"nı context olarak ver, sonra toplu kart iste
- **Versiyon kontrolü:** her fazın sonunda git commit/branch disiplinini koru — AI ile hızlı iterasyon yaparken geri dönüş noktaları hayat kurtarır
- **Test:** basit bir "headless" simülasyon scripti (kartları rastgele oynatan) erken yazılırsa, AI'nin ürettiği yeni kart/etkileri hızlıca dengeleyip doğrulayabilirsin

---

## 7. Riskler / Dikkat Edilecekler

- **İçerik hacmi:** Reigns tarzı oyunlar çok sayıda kart gerektirir (tekrar hissi vermemesi için). Erken aşamada azla başlayıp döngüyü sağlamlaştırmak, sonra içerik ölçeklemek daha sağlıklı
- **Denge:** stat sistemleri kolayca "çözülebilir" hâle gelebilir (oyuncu bir stratejiyle hep kazanır) — rastgelelik veya gizli sayaçlarla bunu kırmak gerekebilir
- **Mitolojik doğruluk vs. oynanabilirlik:** akademik doğruluk ile oyun temposu bazen çatışır; bir "yaratıcı özgürlük" çizgisi baştan belirlenmeli
- **Kapsam kontrolü:** tek kişilik geliştirmede en büyük risk kapsamın büyümesi — Faz 1'i küçük ve oynanabilir tutmak kritik

---

*Bu doküman canlı bir yol haritasıdır — geliştirme ilerledikçe fazları ve GDD detaylarını güncellemen önerilir.*
