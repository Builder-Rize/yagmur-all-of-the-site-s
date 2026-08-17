/**
 * =============================================================
 *  MERKEZI YAPILANDIRMA / CENTRAL CONFIGURATION
 * =============================================================
 *  Sitedeki tüm metinler, bağlantılar ve sorular buradan
 *  düzenlenebilir. Başka hiçbir dosyaya dokunmana gerek yok.
 * =============================================================
 */

/** Evrene giriş şifresi */
export const PASSWORD = 'Enesileyağmur';

/** İsimler */
export const NAMES = {
  first: 'ENES',
  second: 'YAĞMUR',
  separator: '×',
} as const;

/** Şifre ekranı metinleri */
export const GATE_TEXT = {
  subtitle: 'Bize ait küçük bir evren.',
  placeholder: 'Anahtarı yaz…',
  button: 'EVRENE GİR',
  error: 'Bu doğru anahtar gibi görünmüyor.',
  hint: 'İpucu: ikimizin adı, aramızda tek bir kelime.',
} as const;

/** Hub (ana evren) metinleri */
export const HUB_TEXT = {
  title: 'KÜÇÜK EVRENİMİZ',
  subtitle: 'Bir dünya seç.',
  mobileHint: 'Sürükle · Dokun',
  desktopHint: 'Fareyi gezdir · Bir dünyaya tıkla',
} as const;

export type WorldKind = 'link' | 'questions';

export interface WorldConfig {
  /** Benzersiz kimlik */
  id: string;
  /** Kartta görünen numara */
  index: string;
  /** Başlık */
  title: string;
  /** Kısa açıklama */
  description: string;
  /** Dış bağlantı (kind === 'link' ise) */
  url?: string;
  /** Davranış türü */
  kind: WorldKind;
  /** Portalın ana rengi (hex) */
  color: string;
  /** İkincil / parıltı rengi */
  accent: string;
  /** Halka üzerindeki açısal konum (radyan) — 0 = ön */
  angle: number;
  /** Dikey ofset (yükseklik) */
  height: number;
}

/**
 * BEŞ DÜNYA
 * ------------------------------------------------------------
 * `url` değerlerini değiştirmek istersen yalnızca burayı düzenle.
 */
export const WORLDS: WorldConfig[] = [
  {
    id: 'stars',
    index: '01',
    title: 'Yıldızların Altında',
    description: 'Yıldızların arasında küçük bir yer.',
    url: 'https://builder-rize.github.io/Yagmurun-galaksisi/',
    kind: 'link',
    color: '#4d9fff',
    accent: '#bfe0ff',
    angle: Math.PI * 0.86,
    height: 1.05,
  },
  {
    id: 'memories',
    index: '02',
    title: 'Küçük Anılar',
    description: 'Biraz daha saklanmayı hak eden anlar.',
    url: 'https://builder-rize.github.io/yagmuruma-ozel/',
    kind: 'link',
    color: '#2f7fe0',
    accent: '#a9d2ff',
    angle: Math.PI * 1.14,
    height: -1.25,
  },
  {
    id: 'music',
    index: '03',
    title: 'Bizim Şarkımız',
    description: 'Bazı duygular kelimelerden daha güzel duyulur.',
    url: 'https://builder-rize.github.io/Ya-murun-/',
    kind: 'link',
    color: '#5fb2ff',
    accent: '#d6ecff',
    angle: Math.PI * 0.14,
    height: 1.05,
  },
  {
    id: 'surprise',
    index: '04',
    title: 'Küçük Bir Sürpriz',
    description: 'Seni bekleyen bir şey var.',
    url: 'https://builder-rize.github.io/yagmurun-sorular-/',
    kind: 'link',
    color: '#3d86ff',
    accent: '#c2dcff',
    angle: Math.PI * -0.14,
    height: -1.25,
  },
  {
    id: 'questions',
    index: '05',
    title: 'Sana Birkaç Soru',
    description: 'Uzun zamandır sormak istediğim şeyler.',
    kind: 'questions',
    color: '#7cc4ff',
    accent: '#ffffff',
    angle: Math.PI * 0.5,
    height: 2.35,
  },
];

/**
 * SORULAR
 * ------------------------------------------------------------
 * Soru eklemek/çıkarmak için bu diziyi düzenlemen yeterli.
 * Sayaç (01 / 10) otomatik olarak güncellenir.
 */
export const QUESTIONS: string[] = [
  'Bende ilk fark ettiğin şey neydi?',
  'Benimle geçirdiğin, en çok aklında kalan an hangisi?',
  'Seni her zaman gülümseten şey nedir?',
  'Bir gecelik her yere gidebilseydik, nereyi seçerdin?',
  'Hangi şarkı sana bizi hatırlatıyor?',
  'Kendimle ilgili fark etmediğimi düşündüğün bir şey var mı?',
  'Yıllar sonra neyi hatırlamamızı isterdin?',
  'Bende en sevdiğin küçük şey ne?',
  'Hikâyemiz bir yer olsaydı, nasıl görünürdü?',
  'Şu an bana ne söylemek isterdin?',
];

/** Soru bölümü metinleri */
export const QUESTIONS_TEXT = {
  intro: 'Sana sormak istediğim birkaç şey var…',
  introButton: 'BAŞLAYALIM',
  placeholder: 'Buraya yaz…',
  submit: 'GÖNDER',
  skip: 'geç',
  back: 'evrene dön',
} as const;

/** Final ekranı metinleri */
export const FINALE_TEXT = {
  headline: 'Bu küçük evrene birkaç yeni yıldız eklendi.',
  quote: 'Belki bazı evrenler bulunmaz.\nBelki yaratılır.',
  again: 'evrene dön',
  review: 'cevapları gör',
} as const;

/**
 * E-POSTA GÖNDERİMİ (EmailJS)
 * ------------------------------------------------------------
 * Tüm sorular cevaplandığında cevaplar tek bir e-posta olarak
 * gönderilir.
 *
 * ⚠️ ÖNEMLİ — GÜVENLİK
 * Bu site statiktir; aşağıdaki anahtarlar tarayıcıya iner ve
 * siteyi açan herkes kaynak koddan görebilir. Bunu sınırlamak
 * için EmailJS panelinden **domain allowlist** açıp yalnızca
 * kendi alan adını (ör. builder-rize.github.io) izinli yap.
 * Account → Security → Allowed Domains
 *
 * `enabled: false` yaparsan gönderim tamamen kapanır.
 */
export const EMAIL = {
  enabled: true,
  publicKey: '4-m3QZytscu6Vmo79',
  serviceId: 'service_7676j1j',
  templateId: 'template_foxuk1g',
  /** Şablonda kullanılan değişken adları */
  fields: {
    answers: 'answers',
    answeredAt: 'answered_at',
    count: 'count',
  },
} as const;

/** Ses ayarları */
export const AUDIO = {
  /** Ortam sesi dosyası — public/ altına koyabilirsin. */
  src: '/ambient.mp3',
  volume: 0.28,
  /** true ise ses dosyası yoksa sentezlenmiş ambiyans çalar */
  synthFallback: true,
} as const;
