# Enes × Yağmur — Küçük Evrenimiz

Dört siteyi birbirine bağlayan 3B ana kapı / evren deneyimi.

**Akış:** Yükleme → Şifre → Evren Açılışı → 5 Dünya → Sinematik Geçiş → Hedef / Sorular

---

## Şifre

```
Enesileyağmur
```

`src/config/site.ts` içindeki `PASSWORD` değerinden değiştirilebilir.

> Not: Şifre tarayıcıda çalışan bir koruma; gerçek bir güvenlik katmanı
> değil, deneyimin bir parçası. Siteyi bilen biri kaynak koddan görebilir.

---

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme (http://localhost:5173)
npm run build    # üretim derlemesi -> dist/
npm run preview  # derlemeyi yerelde dene
```

---

## GitHub Pages'e yayınlama

Depoyu GitHub'a gönderdikten sonra:

1. Depo → **Settings** → **Pages**
2. **Source** olarak **GitHub Actions** seç
3. `main` (veya `master`) dalına push et — gerisi otomatik

`.github/workflows/deploy.yml` her push'ta derleyip yayınlar.

### Base yolu (önemli)

Proje sayfası kullanıyorsan (`kullanici.github.io/depo-adi/`), JS ve CSS
dosyalarının bulunabilmesi için `base` ayarı gerekir. Workflow bunu depo
adından **otomatik** çıkarır; elle bir şey yapman gerekmez.

Yerelde üretim derlemesini denemek istersen:

```bash
BASE_PATH=/depo-adi/ npm run build
```

Kullanıcı sayfasında (`kullanici.github.io`) base `/` kalır.

---

## Düzenleme rehberi

Neredeyse her şey tek dosyada: **`src/config/site.ts`**

| Ne değişecek | Nerede |
| --- | --- |
| Şifre | `PASSWORD` |
| İsimler | `NAMES` |
| Şifre ekranı yazıları | `GATE_TEXT` |
| Dünya başlıkları / açıklamaları | `WORLDS[].title` / `.description` |
| **Site bağlantıları** | `WORLDS[].url` |
| Portal renkleri | `WORLDS[].color` / `.accent` |
| Portal konumu | `WORLDS[].angle` / `.height` |
| **Sorular** | `QUESTIONS` dizisi |
| Soru ekranı yazıları | `QUESTIONS_TEXT` |
| Final ekranı yazıları | `FINALE_TEXT` |
| Ses ayarı | `AUDIO` |

### Soru ekleme / çıkarma

`QUESTIONS` dizisine satır ekle ya da sil — sayaç (`01 / 10`) kendini
otomatik günceller.

```ts
export const QUESTIONS: string[] = [
  'Bende ilk fark ettiğin şey neydi?',
  'Yeni sorun buraya…',
];
```

### Bağlantıları değiştirme

```ts
{
  id: 'stars',
  url: 'https://...',   // yalnızca burayı değiştir
}
```

---

## Ses

Varsayılan olarak **dosyasız** çalışır: Web Audio API ile yumuşak bir uzay
ambiyansı sentezlenir. Kendi müziğini istersen `public/ambient.mp3`
dosyasını koy — otomatik olarak onu çalar.

Ses hiçbir zaman kendiliğinden başlamaz; kullanıcı sağ üstteki düğmeye
basmadan çalmaz.

---

## Teknik

- **React 19** + **TypeScript**
- **Three.js** / **React Three Fiber** — 3B sahne
- **@react-three/postprocessing** — bloom, vinyet, kromatik sapma
- **Framer Motion** — arayüz geçişleri
- Özel GLSL shader'lar: yıldız alanı, bulutsu sis, çekirdek, portal halkaları

### Klasör yapısı

```
src/
  config/site.ts        # TÜM metin, bağlantı ve sorular
  state/store.ts        # uygulama durumu
  audio/ambient.ts      # ses motoru (+ sentez yedeği)
  hooks/                # cihaz sınıfı, fare konumu
  three/                # 3B sahne bileşenleri
    Scene.tsx           # sahne birleştirici
    CoreObject.tsx      # merkezdeki çekirdek
    CameraRig.tsx       # kamera hareketleri
    Starfield / Nebula / CosmicDust / Burst / ConnectionLines
    portals/            # 5 portal + temaya özel 3B nesneler
  ui/                   # arayüz katmanları (şifre, hub, sorular, final)
```

### Performans

Cihaz gücü otomatik ölçülür (`useDeviceTier`): parçacık sayısı, çözünürlük
ve post-process efektleri düşük/orta/yüksek olarak ayarlanır. Telefonlarda
portaller dikey bir sütuna yeniden dizilir — arayüz küçültülmez.

`prefers-reduced-motion` açıksa kamera hareketleri sadeleşir.

---

## Cevaplar

Cevaplar iki yerde durur:

1. **Tarayıcıda** (`localStorage` → `ey-universe-answers`) — final ekranındaki
   **"cevapları gör"** ile tekrar okunabilir.
2. **E-posta olarak** — 10 soru bitince hepsi tek mesajda gönderilir.

### E-posta (EmailJS)

Ayarlar `src/config/site.ts` → `EMAIL`.

- Gönderim **yalnızca son soru cevaplandığında**, tek seferde olur.
- Aynı cevap seti iki kez gönderilmez (`ey-universe-mail-sent` damgası).
- Gönderim başarısız olursa **hiçbir hata gösterilmez**; final ekranı normal
  akar. Sonraki ziyarette sessizce tekrar denenir.
- Kapatmak için: `EMAIL.enabled = false`

Şablonda kullanılan değişkenler:

| Değişken | İçerik |
| --- | --- |
| `{{answers}}` | 10 soru ve cevabı, numaralı düz metin |
| `{{answered_at}}` | Tarih/saat (Türkçe biçim) |
| `{{count}}` | Kaç soru yanıtlandı (ör. `8/10`) |

> ⚠️ **Güvenlik notu**
> Site statik olduğu için EmailJS anahtarları tarayıcıya iner ve kaynak
> koddan görülebilir. Bunu sınırlamak için EmailJS panelinde
> **Account → Security → Allowed Domains** kısmından yalnızca kendi alan
> adını (ör. `builder-rize.github.io`) izinli yap. Bu yapılmazsa anahtarları
> gören biri senin hesabından e-posta gönderebilir.
