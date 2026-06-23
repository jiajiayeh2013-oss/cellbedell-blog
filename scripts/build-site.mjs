import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const siteUrl = "https://cellbedell-blog.netlify.app";
const postsDir = path.join(rootDir, "posts");
const homeHeroImage = "/assets/2026-06-19-vivatech-hero.png";
const blogName = "Signal & Style";
const legacyBlogName = "Cellbedell Blog";
const brandSubtitle = "Technology, culture, and future living notes";
const defaultKeywords = "Signal & Style, Cellbedell Blog, Cellbedell, hospitality technology, AI search, future living, technology culture style";
const buildNow = process.env.BUILD_NOW ? new Date(process.env.BUILD_NOW) : new Date();

const locales = {
  "zh-Hant": {
    code: "zh-Hant",
    hreflang: "zh-Hant",
    prefix: "",
    contentDir: path.join(rootDir, "content", "posts"),
    postsDir,
    homeFile: path.join(rootDir, "index.html"),
    title: "Signal & Style | Technology, Culture, Future Living",
    description: "Signal & Style 收集科技、風格、設計、新創、生活方式與未來城市之間的新訊號。",
    brandSubtitle: "收集科技、風格與未來生活的訊號",
    aliasLine: "Published by Cellbedell",
    editionPlace: "Currently edited in Taipei",
    editionLatest: "Latest dispatch",
    editionNewsletter: "Weekly newsletter",
    homeH1: "把世界的新點子，帶回日常生活",
    homeDek: "觀察科技、設計、時尚、新創與未來城市，整理成讀者看得懂、也能帶回日常的靈感筆記。",
    currentFocus: "VivaTech 2026 觀察",
    currentFocusBody: "從巴黎科技展開始，收集 AI、新創、品牌美感與未來生活的線索；不做流水帳，改寫成生活語言。",
    currentSeriesCta: "閱讀目前系列",
    latestArticle: "最新文章",
    latestKicker: "Latest Article",
    seriesHome: "系列入口",
    seriesHomeBody: "從國際科技展、旅宿科技、AI 與生活風格出發，整理科技如何慢慢走進日常。",
    readSeries: "查看系列總覽",
    readArticle: "閱讀文章",
    nextPreparing: "下一篇觀察準備中",
    nextPreparingBody: "有新的展會素材、旅宿科技案例或國際媒體觀點時，就可以從後台新增文章。",
    newsletterTitle: "訂閱每週靈感筆記",
    newsletterNavLabel: "訂閱下一封靈感筆記",
    newsletterCadence: "每週一封，整理科技、文化與未來生活裡值得慢慢看的觀察。",
    newsletterLabel: "Email",
    newsletterButton: "訂閱",
    backToBlog: "回到首頁",
    editorNote: "Editor’s Note",
    writtenBy: "Written by",
    readingTime: "Reading time",
    articleTags: "文章標籤",
    imageCredit: "圖片來源",
    nextStories: "下一篇可以延伸",
    sources: "參考來源",
    footerTitle: "科技、風格與未來生活的訊號採集",
    continueSeries: "繼續收集新點子",
    authorBio: "科技、設計與未來生活觀察",
    imageSource: "圖片來源",
    defaultFigureCredit: "Cellbedell / AI 生成概念圖",
    youtubeOpen: "在 YouTube 開啟",
    upcoming: "準備中",
    languageLabel: "繁",
  },
  en: {
    code: "en",
    hreflang: "en",
    prefix: "/en",
    contentDir: path.join(rootDir, "content", "en", "posts"),
    postsDir: path.join(rootDir, "en", "posts"),
    homeFile: path.join(rootDir, "en", "index.html"),
    title: "Signal & Style | Hospitality Tech, AI Search, Future Living",
    description: "Signal & Style turns hospitality technology, AI search, brand systems, and future living signals into practical editorial insight.",
    brandSubtitle,
    aliasLine: "Published by Cellbedell",
    editionPlace: "Currently edited in Taipei",
    editionLatest: "Latest dispatch",
    editionNewsletter: "Weekly newsletter",
    homeH1: "Hospitality technology, translated into real guest journeys",
    homeDek: "Editorial notes on AI search, smart check-in, mobile access, and the service systems that shape future hotels.",
    currentFocus: "Hospitality Tech and AI Search",
    currentFocusBody: "Follow how hotels, brands, and service operators can become easier for guests and AI agents to understand.",
    currentSeriesCta: "Explore the series",
    latestArticle: "Latest Article",
    latestKicker: "Latest Article",
    seriesHome: "Series Home",
    seriesHomeBody: "Browse focused essays on hospitality technology, AI search visibility, global tech events, and future living.",
    readSeries: "View series",
    readArticle: "Read article",
    nextPreparing: "Next story in preparation",
    nextPreparingBody: "New localized stories will appear here after editorial review.",
    newsletterTitle: "Subscribe to the weekly field note",
    newsletterNavLabel: "Newsletter",
    newsletterCadence: "One email per week with practical signals from technology, culture, and future living.",
    newsletterLabel: "Email",
    newsletterButton: "Subscribe",
    backToBlog: "Back to Blog",
    editorNote: "Editor’s Note",
    writtenBy: "Written by",
    readingTime: "Reading time",
    articleTags: "Tags",
    imageCredit: "Image Credit",
    nextStories: "Next Stories",
    sources: "Sources",
    footerTitle: "Technology, culture, and future living field notes",
    continueSeries: "continue reading",
    authorBio: "Technology, design, and future living notes",
    imageSource: "Image source",
    defaultFigureCredit: "Cellbedell / AI concept image",
    youtubeOpen: "Open on YouTube",
    upcoming: "Coming soon",
    languageLabel: "EN",
  },
  ja: {
    code: "ja",
    hreflang: "ja",
    prefix: "/ja",
    contentDir: path.join(rootDir, "content", "ja", "posts"),
    postsDir: path.join(rootDir, "ja", "posts"),
    homeFile: path.join(rootDir, "ja", "index.html"),
    title: "Signal & Style | ホテルDX、AI検索、未来のサービス体験",
    description: "Signal & Style は、ホテルDX、スマートチェックイン、モバイルキー、AI検索時代のブランド可視性を読み解く編集型ブログです。",
    brandSubtitle,
    aliasLine: "Published by Cellbedell",
    editionPlace: "Currently edited in Taipei",
    editionLatest: "Latest dispatch",
    editionNewsletter: "Weekly newsletter",
    homeH1: "ホテルDXを、現場で使えるサービス体験へ",
    homeDek: "スマートチェックイン、モバイルキー、AI検索、未来の宿泊体験を、ホテル運営者にも読みやすい視点で整理します。",
    currentFocus: "ホテルDXとAI検索",
    currentFocusBody: "宿泊施設がゲストにもAIエージェントにも理解されやすくなるための情報設計を考えます。",
    currentSeriesCta: "シリーズを読む",
    latestArticle: "最新記事",
    latestKicker: "Latest Article",
    seriesHome: "シリーズ",
    seriesHomeBody: "ホテルDX、AI検索、海外テックイベント、未来の生活サービスをテーマ別に読むことができます。",
    readSeries: "シリーズを見る",
    readArticle: "記事を読む",
    nextPreparing: "次の記事を準備中",
    nextPreparingBody: "ローカライズ済みの記事は編集確認後に追加されます。",
    newsletterTitle: "週1回のフィールドノートを受け取る",
    newsletterNavLabel: "Newsletter",
    newsletterCadence: "テクノロジー、文化、未来の生活から読みたい視点を週1回お届けします。",
    newsletterLabel: "Email",
    newsletterButton: "登録",
    backToBlog: "ブログへ戻る",
    editorNote: "Editor’s Note",
    writtenBy: "著者",
    readingTime: "読了時間",
    articleTags: "タグ",
    imageCredit: "画像クレジット",
    nextStories: "次に広げたいテーマ",
    sources: "参考資料",
    footerTitle: "テクノロジー、文化、未来の生活を読むフィールドノート",
    continueSeries: "続きを読む",
    authorBio: "テクノロジー、デザイン、未来の生活を観察するノート",
    imageSource: "画像出典",
    defaultFigureCredit: "Cellbedell / AI生成コンセプト画像",
    youtubeOpen: "YouTubeで開く",
    upcoming: "準備中",
    languageLabel: "JP",
  },
  th: {
    code: "th",
    hreflang: "th",
    prefix: "/th",
    contentDir: path.join(rootDir, "content", "th", "posts"),
    fallbackContentDir: path.join(rootDir, "content", "posts"),
    postsDir: path.join(rootDir, "th", "posts"),
    homeFile: path.join(rootDir, "th", "index.html"),
    title: "Signal & Style | เทคโนโลยีโรงแรม, AI Search, Future Living",
    description: "Signal & Style รวบรวมมุมมองด้านเทคโนโลยีโรงแรม, AI search, แบรนด์ และ future living ให้อ่านง่ายและนำไปใช้ได้จริง.",
    brandSubtitle,
    aliasLine: "Published by Cellbedell",
    editionPlace: "Currently edited in Taipei",
    editionLatest: "Latest dispatch",
    editionNewsletter: "Weekly newsletter",
    homeH1: "พาไอเดียใหม่จากโลก กลับมาใกล้ชีวิตประจำวัน",
    homeDek: "บันทึกเชิงบรรณาธิการว่าด้วยเทคโนโลยี การออกแบบ แบรนด์ สตาร์ทอัพ และเมืองแห่งอนาคต ในภาษาที่อ่านง่ายและใช้ต่อได้.",
    currentFocus: "VivaTech 2026 และเทคโนโลยีโรงแรม",
    currentFocusBody: "เริ่มจากงานเทคโนโลยีที่ปารีส แล้วคัดสัญญาณสำคัญเรื่อง AI, สตาร์ทอัพ, แบรนด์ และอนาคตของการใช้ชีวิต.",
    currentSeriesCta: "อ่านซีรีส์ปัจจุบัน",
    latestArticle: "บทความล่าสุด",
    latestKicker: "Latest Article",
    seriesHome: "ซีรีส์",
    seriesHomeBody: "อ่านบทความตามหัวข้อ: เทคโนโลยีโรงแรม, AI search, งานเทคโนโลยีระดับโลก และ future living.",
    readSeries: "ดูซีรีส์",
    readArticle: "อ่านบทความ",
    nextPreparing: "กำลังเตรียมบทความถัดไป",
    nextPreparingBody: "บทความใหม่หรือฉบับแปลเพิ่มเติมจะถูกเพิ่มหลังการตรวจแก้.",
    newsletterTitle: "สมัครรับจดหมายแรงบันดาลใจรายสัปดาห์",
    newsletterNavLabel: "สมัครรับโน้ตฉบับถัดไป",
    newsletterCadence: "สัปดาห์ละหนึ่งฉบับ รวมมุมมองด้านเทคโนโลยี วัฒนธรรม และ future living.",
    newsletterLabel: "Email",
    newsletterButton: "สมัครรับ",
    backToBlog: "กลับหน้าแรก",
    editorNote: "Editor’s Note",
    writtenBy: "เขียนโดย",
    readingTime: "เวลาอ่าน",
    articleTags: "แท็ก",
    imageCredit: "เครดิตภาพ",
    nextStories: "อ่านต่อได้จาก",
    sources: "แหล่งอ้างอิง",
    footerTitle: "บันทึกไอเดียด้านเทคโนโลยี วัฒนธรรม และ future living",
    continueSeries: "อ่านต่อ",
    authorBio: "บันทึกว่าด้วยเทคโนโลยี การออกแบบ และ future living",
    imageSource: "ที่มาภาพ",
    defaultFigureCredit: "Cellbedell / ภาพคอนเซ็ปต์สร้างด้วย AI",
    youtubeOpen: "เปิดใน YouTube",
    upcoming: "เร็วๆ นี้",
    languageLabel: "TH",
  },
};

const series = {
  vivatech: {
    aliases: ["VivaTech / 科技展觀察", "vivatech", "VivaTech 2026"],
    file: {
      "zh-Hant": "series-vivatech-2026.html",
      en: "en/series-vivatech-2026.html",
      ja: "ja/series-vivatech-2026.html",
      th: "th/series-vivatech-2026.html",
    },
    label: {
      "zh-Hant": "VivaTech 2026",
      en: "VivaTech 2026",
      ja: "VivaTech 2026",
      th: "VivaTech 2026",
    },
    title: {
      "zh-Hant": "VivaTech / 科技展觀察",
      en: "VivaTech and Tech Event Notes",
      ja: "VivaTech / テックイベント観察",
      th: "VivaTech / บันทึกจากงานเทคโนโลยี",
    },
    description: {
      "zh-Hant": "從國際科技展整理 AI、新創、品牌與未來生活裡值得收藏的靈感。",
      en: "Signals from international tech events, AI, startups, brand systems, and future living.",
      ja: "国際テックイベントからAI、スタートアップ、ブランド、未来の生活の兆しを読むシリーズです。",
      th: "สัญญาณจากงานเทคโนโลยีระดับโลก เรื่อง AI, สตาร์ทอัพ, แบรนด์ และ future living.",
    },
  },
  "media-lens": {
    aliases: ["國際科技媒體觀察", "media-lens"],
    file: {
      "zh-Hant": "series-media-lens.html",
      en: "en/series-media-lens.html",
      ja: "ja/series-media-lens.html",
      th: "th/series-media-lens.html",
    },
    label: {
      "zh-Hant": "國際科技媒體觀察",
      en: "Global Tech Media Lens",
      ja: "海外テックメディア観察",
      th: "มุมมองสื่อเทคโนโลยีโลก",
    },
    title: {
      "zh-Hant": "國際科技媒體觀察",
      en: "Global Tech Media Lens",
      ja: "海外テックメディア観察",
      th: "มุมมองสื่อเทคโนโลยีโลก",
    },
    description: {
      "zh-Hant": "引用國際科技媒體觀點，轉成繁中讀者更容易理解的摘要、觀察與生活化延伸。",
      en: "Editorial context from global technology media, translated into practical signals.",
      ja: "海外テックメディアの視点を、生活やサービスの文脈に置き換えて読むシリーズです。",
      th: "แปลงบริบทจากสื่อเทคโนโลยีระดับโลกให้เป็นสัญญาณที่อ่านง่ายและใช้ได้จริง.",
    },
  },
  "hotel-tech": {
    aliases: ["旅館生活科技", "hotel-tech", "hospitality-tech"],
    file: {
      "zh-Hant": "series-hotel-tech.html",
      en: "en/series-hotel-tech.html",
      ja: "ja/series-hotel-tech.html",
      th: "th/series-hotel-tech.html",
    },
    label: {
      "zh-Hant": "旅館生活科技",
      en: "Hospitality Technology",
      ja: "ホテルDX / 宿泊テック",
      th: "เทคโนโลยีโรงแรม",
    },
    title: {
      "zh-Hant": "旅館生活科技",
      en: "Hospitality Technology",
      ja: "ホテルDX / 宿泊テック",
      th: "เทคโนโลยีโรงแรม",
    },
    description: {
      "zh-Hant": "觀察智慧旅宿、自助服務、IoT、通行管理、AI 客服與旅客體驗。",
      en: "Smart check-in, mobile access, PMS integrations, edge devices, and better guest journeys.",
      ja: "スマートチェックイン、モバイルキー、PMS連携、エッジ端末、宿泊体験を扱うシリーズです。",
      th: "Smart check-in, mobile access, PMS integration, edge devices และประสบการณ์ผู้เข้าพักที่ดีขึ้น.",
    },
  },
  "digital-ticketing": {
    aliases: ["數位票券", "digital-ticketing", "digital-ticket", "wallet-ticket"],
    file: {
      "zh-Hant": "series-digital-ticketing.html",
      en: "en/series-digital-ticketing.html",
      ja: "ja/series-digital-ticketing.html",
      th: "th/series-digital-ticketing.html",
    },
    label: {
      "zh-Hant": "數位票券",
      en: "Digital Ticketing",
      ja: "デジタルチケット",
      th: "บัตรดิจิทัล",
    },
    title: {
      "zh-Hant": "數位票券",
      en: "Digital Ticketing",
      ja: "デジタルチケット",
      th: "บัตรดิจิทัล",
    },
    description: {
      "zh-Hant": "觀察 Wallet 電子票券、會員憑證、活動報到、場館通行與門禁權限如何接成新的數位入口。",
      en: "Wallet passes, membership credentials, event check-in, venue access, and permission workflows.",
      ja: "Walletパス、会員証、イベント受付、会場アクセス、入退室権限をつなぐデジタル入口を観察します。",
      th: "Wallet passes, membership credentials, event check-in, venue access และ permission workflows.",
    },
  },
  "ai-humanities": {
    aliases: ["AI 與人文", "ai-humanities"],
    file: {
      "zh-Hant": "series-ai-humanities.html",
      en: "en/series-ai-humanities.html",
      ja: "ja/series-ai-humanities.html",
      th: "th/series-ai-humanities.html",
    },
    label: {
      "zh-Hant": "AI 與人文",
      en: "AI and Human Context",
      ja: "AIと人文",
      th: "AI และบริบทมนุษย์",
    },
    title: {
      "zh-Hant": "AI 與人文",
      en: "AI and Human Context",
      ja: "AIと人文",
      th: "AI และบริบทมนุษย์",
    },
    description: {
      "zh-Hant": "討論 AI 如何改變創作、工作、教育、情感、倫理與人的判斷。",
      en: "How AI changes work, creativity, education, trust, ethics, and human judgment.",
      ja: "AIが仕事、創作、教育、信頼、倫理、人の判断をどう変えるのかを考えます。",
      th: "สำรวจว่า AI เปลี่ยนงาน ความคิดสร้างสรรค์ การศึกษา ความเชื่อใจ จริยธรรม และการตัดสินใจของมนุษย์อย่างไร.",
    },
  },
  "style-life": {
    aliases: ["時尚與生活", "style-life"],
    file: {
      "zh-Hant": "series-style-life.html",
      en: "en/series-style-life.html",
      ja: "ja/series-style-life.html",
      th: "th/series-style-life.html",
    },
    label: {
      "zh-Hant": "時尚與生活",
      en: "Style and Future Living",
      ja: "スタイルと未来の生活",
      th: "สไตล์และ future living",
    },
    title: {
      "zh-Hant": "時尚與生活",
      en: "Style and Future Living",
      ja: "スタイルと未来の生活",
      th: "สไตล์และ future living",
    },
    description: {
      "zh-Hant": "把科技、品牌、美感、穿搭、空間與消費文化放在一起看。",
      en: "Where technology, brand language, taste, spaces, and consumer culture meet.",
      ja: "テクノロジー、ブランド、美意識、空間、消費文化を横断して読むシリーズです。",
      th: "จุดตัดของเทคโนโลยี ภาษาแบรนด์ รสนิยม พื้นที่ และวัฒนธรรมผู้บริโภค.",
    },
  },
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeXml(value = "") {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function escapeJsonScript(value) {
  return JSON.stringify(value, null, 2).replaceAll("</", "<\\/");
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_ -]+):\s*(.*)$/);
    if (!pair) {
      i += 1;
      continue;
    }

    const key = pair[1].trim();
    const value = pair[2];
    if (value !== "") {
      data[key] = parseScalar(value);
      i += 1;
      continue;
    }

    const list = [];
    i += 1;
    while (i < lines.length && /^  - /.test(lines[i])) {
      const itemLine = lines[i].replace(/^  - /, "");
      if (itemLine.includes(":")) {
        const item = {};
        const first = itemLine.match(/^([^:]+):\s*(.*)$/);
        if (first) item[first[1].trim()] = parseScalar(first[2]);
        i += 1;
        while (i < lines.length && /^    [^ ].*:/.test(lines[i])) {
          const nested = lines[i].trim().match(/^([^:]+):\s*(.*)$/);
          if (nested) item[nested[1].trim()] = parseScalar(nested[2]);
          i += 1;
        }
        list.push(item);
      } else {
        list.push(parseScalar(itemLine));
        i += 1;
      }
    }
    data[key] = list;
  }

  return { data, body: match[2].trim() };
}

function slugFromFilename(filePath) {
  return path.basename(filePath, ".md");
}

function getSeriesKey(value) {
  for (const [key, item] of Object.entries(series)) {
    if (item.aliases.includes(value)) return key;
  }
  return "vivatech";
}

function localePath(localeCode, pathname = "/") {
  const locale = locales[localeCode];
  if (localeCode === "zh-Hant") return pathname;
  return `${locale.prefix}${pathname === "/" ? "/" : pathname}`;
}

function absoluteUrl(value = "") {
  if (!value) return siteUrl;
  if (value.startsWith("http")) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

function cleanPagePath(localeCode, type, slug = "") {
  if (type === "home") return localePath(localeCode, "/");
  if (type === "series") return localePath(localeCode, `/${series[slug].file[localeCode].replace(/^(en|ja|th)\//, "").replace(/\.html$/, "")}`);
  return localePath(localeCode, `/posts/${slug}`);
}

function hrefForPage(localeCode, type, slug = "", fromPost = false) {
  const locale = locales[localeCode];
  const up = fromPost ? "../" : "./";
  if (type === "home") return localeCode === "zh-Hant" ? `${up}index.html` : `${up}${fromPost ? "" : ""}index.html`;
  if (type === "series") return `${up}${path.basename(series[slug].file[localeCode])}`;
  if (type === "post") return `${up}posts/${slug}.html`;
  return "./";
}

function normalizeAssetPath(value = "", fromPost = false, localeCode = "zh-Hant") {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/")) {
    const ups = fromPost ? (localeCode === "zh-Hant" ? ".." : "../..") : (localeCode === "zh-Hant" ? "." : "..");
    return `${ups}${value}`;
  }
  return `${fromPost ? "../" : "./"}${value.replace(/^\.\//, "")}`;
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown, localeCode) {
  const t = locales[localeCode];
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const html = [];

  for (const block of blocks) {
    const youtube = block.match(/^\{\{youtube:([^}]+)\}\}$/);
    if (youtube) {
      const parts = youtube[1].split("|").map((part) => part.trim());
      const videoId = escapeHtml(parts.shift() || "");
      const query = parts.length > 1 && /^[A-Za-z0-9_-]+=/.test(parts.at(-1)) ? parts.pop() : "";
      const title = escapeHtml(parts.join(" | ") || "Cellbedell video demo");
      const embedQuery = query ? `?${escapeHtml(query.replace(/^\?/, ""))}` : "";
      html.push(`<figure class="video-embed article-video">
  <iframe src="https://www.youtube.com/embed/${videoId}${embedQuery}" title="${title}" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>${title} <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">${escapeHtml(t.youtubeOpen)}</a></figcaption>
</figure>`);
      continue;
    }

    const image = block.match(/^!\[([^\]]*)\]\((\S+)(?:\s+"([^"]+)")?\)$/);
    if (image) {
      const alt = escapeHtml(image[1]);
      const src = normalizeAssetPath(image[2], true, localeCode);
      const source = escapeHtml(image[3] || t.defaultFigureCredit);
      html.push(`<figure class="editorial-figure article-figure">
  <img src="${src}" alt="${alt}" />
  <figcaption>${alt}. ${escapeHtml(t.imageSource)}: ${source}</figcaption>
</figure>`);
    } else if (block.startsWith("### ")) {
      html.push(`<h3>${inlineMarkdown(block.slice(4))}</h3>`);
    } else if (block.startsWith("## ")) {
      html.push(`<h2>${inlineMarkdown(block.slice(3))}</h2>`);
    } else if (block.startsWith("# ")) {
      html.push(`<h2>${inlineMarkdown(block.slice(2))}</h2>`);
    } else if (/^- /.test(block)) {
      const items = block
        .split(/\n/)
        .filter((line) => line.startsWith("- "))
        .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
        .join("\n");
      html.push(`<ul>\n${items}\n</ul>`);
    } else {
      html.push(`<p>${inlineMarkdown(block.replace(/\n/g, " "))}</p>`);
    }
  }

  return html.join("\n");
}

function formatDate(date) {
  return String(date || "").replaceAll("-", ".");
}

function parsePublishDate(value) {
  if (!value) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function isPublicPost(post) {
  if (post.status !== "Published") return false;
  const publishDate = parsePublishDate(post.scheduled_publish_at || post.date);
  if (!publishDate) return false;
  return publishDate.getTime() <= buildNow.getTime();
}

function estimateReadingTime(body, localeCode) {
  const normalized = body.replace(/```[\s\S]*?```/g, " ").replace(/\s+/g, " ");
  if (localeCode === "en") {
    return Math.max(2, Math.ceil(normalized.split(/\s+/).filter(Boolean).length / 220));
  }
  return Math.max(2, Math.ceil(normalized.replace(/\s+/g, "").length / 450));
}

function loadLocalePosts(localeCode) {
  const locale = locales[localeCode];
  const contentDir = fs.existsSync(locale.contentDir) ? locale.contentDir : locale.fallbackContentDir;
  if (!contentDir || !fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const { data, body } = parseFrontmatter(read(filePath));
      const sourceSlug = slugFromFilename(filePath);
      const slug = data.localized_slug || sourceSlug;
      const seriesKey = getSeriesKey(data.series);
      const translationKey = data.translation_key || sourceSlug;
      return {
        ...data,
        body,
        locale: localeCode,
        sourceSlug,
        slug,
        translation_key: translationKey,
        seriesKey,
        outputPath: path.join(locale.postsDir, `${slug}.html`),
        href: localeCode === "zh-Hant" ? `./posts/${slug}.html` : `./posts/${slug}.html`,
        postHref: `${slug}.html`,
        status: data.status || "Drafting",
        tags: Array.isArray(data.tags) ? data.tags : [],
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
    })
    .map((post) => ({ ...post, isPublic: isPublicPost(post) }))
    .sort((a, b) => {
      const dateOrder = String(b.scheduled_publish_at || b.date || "").localeCompare(String(a.scheduled_publish_at || a.date || ""));
      if (dateOrder !== 0) return dateOrder;
      const seriesOrder = Number(a.series_order || 0) - Number(b.series_order || 0);
      if (seriesOrder !== 0) return seriesOrder;
      const manualOrder = Number(b.order || 0) - Number(a.order || 0);
      if (manualOrder !== 0) return manualOrder;
      return String(b.slug || "").localeCompare(String(a.slug || ""));
    });
}

function buildTranslationIndex(postsByLocale) {
  const index = new Map();
  for (const [localeCode, posts] of Object.entries(postsByLocale)) {
    for (const post of posts) {
      if (!index.has(post.translation_key)) index.set(post.translation_key, {});
      index.get(post.translation_key)[localeCode] = post;
    }
  }
  return index;
}

function alternateLinks(alternates, currentLocale, currentType, currentSlug = "") {
  const links = [];
  for (const localeCode of Object.keys(locales)) {
    const alt = alternates?.[localeCode];
    if (!alt) continue;
    links.push(`<link rel="alternate" hreflang="${locales[localeCode].hreflang}" href="${escapeHtml(alt)}" />`);
  }
  const fallback = alternates?.["zh-Hant"] || alternates?.[currentLocale] || absoluteUrl(cleanPagePath(currentLocale, currentType, currentSlug));
  links.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(fallback)}" />`);
  return links.join("\n    ");
}

function languageSwitcher(alternates, currentLocale) {
  const items = Object.entries(locales)
    .filter(([localeCode]) => alternates?.[localeCode])
    .map(([localeCode, locale]) => {
      const active = localeCode === currentLocale ? " is-active" : "";
      return `<a class="${active}" href="${escapeHtml(alternates[localeCode])}" hreflang="${escapeHtml(locale.hreflang)}">${escapeHtml(locale.languageLabel)}</a>`;
    })
    .join("\n");
  return `<div class="language-switcher" aria-label="Language switcher">
            ${items}
          </div>`;
}

function pageHead({
  localeCode,
  title,
  description,
  canonical,
  alternates,
  type = "website",
  image,
  jsonLd,
  keywords = defaultKeywords,
}) {
  const socialImage = image ? absoluteUrl(image) : absoluteUrl(homeHeroImage);
  return `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${alternateLinks(alternates, localeCode, "home")}
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:site_name" content="${escapeHtml(blogName)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(socialImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    ${jsonLd ? `<script type="application/ld+json">${escapeJsonScript(jsonLd)}</script>` : ""}`;
}

function stylesheetHref(localeCode, fromPost = false) {
  if (localeCode === "zh-Hant") return fromPost ? "../styles.css" : "./styles.css";
  return fromPost ? "../../styles.css" : "../styles.css";
}

function renderNav(localeCode, alternates, fromPost = false, showNewsletterCta = false) {
  const t = locales[localeCode];
  const homeHref = fromPost ? (localeCode === "zh-Hant" ? "../index.html" : "../index.html") : "./index.html";
  return `<nav class="topbar" aria-label="Main navigation">
          <a class="brand" href="${homeHref}">
            <span class="brand-mark">S&amp;S</span>
            <div>
              <p class="eyebrow">${escapeHtml(blogName)}</p>
              <p class="brand-subtitle">${escapeHtml(t.brandSubtitle)}</p>
            </div>
          </a>
          <div class="nav-actions">
            ${showNewsletterCta ? `<a class="newsletter-link" href="#subscribe-title">${escapeHtml(t.newsletterNavLabel)}</a>` : ""}
            ${languageSwitcher(alternates, localeCode)}
            ${fromPost ? `<a class="source-link" href="${homeHref}">${escapeHtml(t.backToBlog)}</a>` : `<a class="source-link" href="${hrefForPage(localeCode, "series", "hotel-tech")}">${escapeHtml(t.currentSeriesCta)}</a>`}
          </div>
        </nav>`;
}

function renderLatestArticle(post, localeCode) {
  const t = locales[localeCode];
  const image = normalizeAssetPath(post.hero_image, false, localeCode);
  const href = `./posts/${post.slug}.html`;
  const tags = post.tags
    .slice(0, 4)
    .map((tag) => `<a href="${hrefForPage(localeCode, "series", post.seriesKey)}">${escapeHtml(tag)}</a>`)
    .join("\n");
  return `<article class="feature-article">
            <a class="feature-image" href="${escapeHtml(href)}">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(post.hero_image_alt || post.title)}" />
            </a>
            <div class="feature-copy">
              <p class="card-kicker">Published / ${escapeHtml(formatDate(post.date))}</p>
              <h3><a href="${escapeHtml(href)}">${escapeHtml(post.title)}</a></h3>
              <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
              <div class="tag-list">${tags}</div>
              <a class="text-cta" href="${escapeHtml(href)}">${escapeHtml(t.readArticle)}</a>
            </div>
          </article>`;
}

function renderSeriesCards(localeCode) {
  const t = locales[localeCode];
  return Object.entries(series)
    .map(([key, item], index) => `<a class="manifesto-card${index === 0 ? " is-featured" : ""}" href="${hrefForPage(localeCode, "series", key)}">
              <p class="theme-index">${index === 0 ? "Current" : item.label[localeCode]}</p>
              <h3>${escapeHtml(item.title[localeCode])}</h3>
              <p>${escapeHtml(item.description[localeCode])}</p>
              <span>${escapeHtml(t.readSeries)}</span>
            </a>`)
    .join("\n");
}

function homeAlternates() {
  return Object.fromEntries(Object.keys(locales).map((localeCode) => [localeCode, absoluteUrl(cleanPagePath(localeCode, "home"))]));
}

function seriesAlternates(seriesKey) {
  return Object.fromEntries(Object.keys(locales).map((localeCode) => [localeCode, absoluteUrl(cleanPagePath(localeCode, "series", seriesKey))]));
}

function renderHome(posts, localeCode) {
  const t = locales[localeCode];
  const alternates = homeAlternates();
  const latest = posts[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl(cleanPagePath(localeCode, "home"))}#blog`,
    name: blogName,
    alternateName: [legacyBlogName],
    url: absoluteUrl(cleanPagePath(localeCode, "home")),
    description: t.description,
    inLanguage: localeCode,
    publisher: {
      "@type": "Organization",
      name: "Cellbedell",
      url: "https://www.cellbedell.com/",
    },
  };

  return `<!DOCTYPE html>
<html lang="${escapeHtml(localeCode)}">
  <head>
    ${pageHead({
      localeCode,
      title: t.title,
      description: t.description,
      canonical: absoluteUrl(cleanPagePath(localeCode, "home")),
      alternates,
      jsonLd,
    })}
    <link rel="stylesheet" href="${stylesheetHref(localeCode)}" />
  </head>
  <body>
    <div class="page-shell">
      <header class="hero blog-home-hero">
        ${renderNav(localeCode, alternates, false, true)}
        <div class="edition-strip" aria-label="Editorial status">
          <span>${escapeHtml(t.editionPlace)}</span>
          <a href="#latest-title">${escapeHtml(t.editionLatest)}</a>
          <a href="#subscribe-title">${escapeHtml(t.editionNewsletter)}</a>
        </div>
        <div class="hero-grid">
          <section class="hero-copy">
            <p class="eyebrow">${escapeHtml(blogName)}</p>
            <h1>${escapeHtml(t.homeH1)}</h1>
            <p class="hero-dek">${escapeHtml(t.homeDek)}</p>
            <p class="alias-note">${escapeHtml(t.aliasLine)}</p>
            <div class="hero-meta">
              <span>Technology</span>
              <span>Culture</span>
              <span>Future Living</span>
            </div>
          </section>
          <aside class="hero-panel">
            <p class="panel-label">Current Focus</p>
            <h2>${escapeHtml(t.currentFocus)}</h2>
            <p>${escapeHtml(t.currentFocusBody)}</p>
            <div class="focus-actions">
              <a href="${hrefForPage(localeCode, "series", "hotel-tech")}">${escapeHtml(t.currentSeriesCta)}</a>
              <span>SEO / GEO / Hospitality Tech</span>
            </div>
          </aside>
        </div>
        <figure class="hero-visual">
          <img src="${normalizeAssetPath(homeHeroImage, false, localeCode)}" alt="${escapeHtml(t.currentFocus)}" />
        </figure>
      </header>
      <main>
        <section class="home-section latest-layout" aria-labelledby="latest-title">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(t.latestKicker)}</p>
            <h2 id="latest-title">${escapeHtml(t.latestArticle)}</h2>
          </div>
          ${latest ? renderLatestArticle(latest, localeCode) : ""}
        </section>
        <section class="home-section series-intro" aria-labelledby="series-title">
          <div>
            <p class="eyebrow">Series Home</p>
            <h2 id="series-title">${escapeHtml(t.seriesHome)}</h2>
          </div>
          <p>${escapeHtml(t.seriesHomeBody)}</p>
          <a class="text-cta" href="${hrefForPage(localeCode, "series", "hotel-tech")}">${escapeHtml(t.readSeries)}</a>
        </section>
        <section class="home-section blog-manifesto" aria-label="Series">
          <div class="manifesto-grid">
            ${renderSeriesCards(localeCode)}
          </div>
        </section>
        <section class="home-section subscribe-section" aria-labelledby="subscribe-title">
          <div>
            <p class="eyebrow">Newsletter</p>
            <h2 id="subscribe-title">${escapeHtml(t.newsletterTitle)}</h2>
            <p class="subscribe-note">${escapeHtml(t.newsletterCadence)}</p>
          </div>
          <form class="subscribe-form" name="newsletter" method="POST" netlify-honeypot="bot-field" action="/.netlify/functions/newsletter">
            <input type="hidden" name="form-name" value="newsletter" />
            <input type="hidden" name="cadence" value="weekly" />
            <p class="hidden"><label>Do not fill this out: <input name="bot-field" /></label></p>
            <label for="email-${localeCode}">${escapeHtml(t.newsletterLabel)}</label>
            <div class="subscribe-controls">
              <input id="email-${localeCode}" type="email" name="email" required placeholder="hello@example.com" />
              <button type="submit">${escapeHtml(t.newsletterButton)}</button>
            </div>
          </form>
        </section>
      </main>
      ${renderFooter(localeCode, "hotel-tech")}
    </div>
  </body>
</html>
`;
}

function renderSeriesList(posts, localeCode, seriesKey) {
  return posts
    .filter((post) => post.seriesKey === seriesKey)
    .map((post) => {
      const image = normalizeAssetPath(post.hero_image, false, localeCode);
      return `<article class="list-article">
            <a class="list-image" href="./posts/${escapeHtml(post.slug)}.html">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(post.hero_image_alt || post.title)}" />
            </a>
            <div>
              <p class="card-kicker">${escapeHtml(formatDate(post.date))} / ${escapeHtml(post.status)}</p>
              <h3><a href="./posts/${escapeHtml(post.slug)}.html">${escapeHtml(post.title)}</a></h3>
              <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
            </div>
          </article>`;
    })
    .join("\n");
}

function renderSeriesPage(posts, localeCode, seriesKey) {
  const t = locales[localeCode];
  const item = series[seriesKey];
  const alternates = seriesAlternates(seriesKey);
  const title = `${item.title[localeCode]} | ${blogName}`;
  const description = item.description[localeCode];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: item.title[localeCode],
    description,
    url: absoluteUrl(cleanPagePath(localeCode, "series", seriesKey)),
    inLanguage: localeCode,
    isPartOf: {
      "@type": "Blog",
      name: blogName,
      url: absoluteUrl(cleanPagePath(localeCode, "home")),
    },
  };

  return `<!DOCTYPE html>
<html lang="${escapeHtml(localeCode)}">
  <head>
    ${pageHead({
      localeCode,
      title,
      description,
      canonical: absoluteUrl(cleanPagePath(localeCode, "series", seriesKey)),
      alternates,
      jsonLd,
    })}
    <link rel="stylesheet" href="${stylesheetHref(localeCode)}" />
  </head>
  <body>
    <div class="page-shell">
      <header class="hero">
        ${renderNav(localeCode, alternates)}
        <div class="hero-grid">
          <section class="hero-copy">
            <p class="eyebrow">${escapeHtml(blogName)}</p>
            <h1>${escapeHtml(item.title[localeCode])}</h1>
            <p class="hero-dek">${escapeHtml(description)}</p>
            <div class="hero-meta">
              <span>${escapeHtml(item.label[localeCode])}</span>
              <span>SEO</span>
              <span>GEO</span>
            </div>
          </section>
          <aside class="hero-panel">
            <p class="panel-label">Series</p>
            <h2>${escapeHtml(item.label[localeCode])}</h2>
            <p>${escapeHtml(description)}</p>
          </aside>
        </div>
      </header>
      <main>
        <section class="home-section article-list-section" aria-labelledby="series-posts-title">
          <div class="section-heading">
            <p class="eyebrow">Articles</p>
            <h2 id="series-posts-title">${escapeHtml(item.label[localeCode])}</h2>
          </div>
          <div class="article-list">
            ${renderSeriesList(posts, localeCode, seriesKey)}
          </div>
        </section>
      </main>
      ${renderFooter(localeCode, seriesKey)}
    </div>
  </body>
</html>
`;
}

function postAlternates(post, translationIndex) {
  const group = translationIndex.get(post.translation_key) || {};
  const alternates = {};
  for (const [localeCode, altPost] of Object.entries(group)) {
    alternates[localeCode] = absoluteUrl(cleanPagePath(localeCode, "post", altPost.slug));
  }
  return alternates;
}

function renderPost(post, localeCode, translationIndex) {
  const t = locales[localeCode];
  const seriesItem = series[post.seriesKey];
  const heroImage = normalizeAssetPath(post.hero_image, true, localeCode);
  const socialImage = absoluteUrl(post.hero_image || "");
  const canonicalUrl = absoluteUrl(cleanPagePath(localeCode, "post", post.slug));
  const description = post.seo_description || post.summary || post.subtitle || post.title;
  const pageTitle = `${post.seo_title || post.title} | ${blogName}`;
  const heroAlt = post.hero_image_alt || post.title;
  const bodyHtml = markdownToHtml(post.body, localeCode);
  const alternates = postAlternates(post, translationIndex);
  const keywords = [...post.tags, seriesItem.label[localeCode], post.title, blogName, legacyBlogName, "Cellbedell"].filter(Boolean).join(", ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    description,
    image: post.hero_image ? [socialImage] : undefined,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Organization",
      name: post.author || "Cellbedell",
    },
    publisher: {
      "@type": "Organization",
      name: blogName,
      url: siteUrl,
    },
    articleSection: seriesItem.label[localeCode],
    keywords: post.tags,
    inLanguage: localeCode,
    about: post.tags.map((tag) => ({ "@type": "Thing", name: tag })),
    isAccessibleForFree: true,
  };
  const sourceItems = post.sources
    .map((source) => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.title)}</a></li>`)
    .join("\n");
  const tagLinks = post.tags
    .map((tag) => `<a href="../${path.basename(seriesItem.file[localeCode])}">${escapeHtml(tag)}</a>`)
    .join("\n");
  const nextItems = String(post.next_direction || t.nextPreparing)
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n");
  const trackingPayload = {
    locale: localeCode,
    slug: post.slug,
    path: cleanPagePath(localeCode, "post", post.slug),
    series: post.seriesKey,
    title: post.title,
  };

  return `<!DOCTYPE html>
<html lang="${escapeHtml(localeCode)}">
  <head>
    ${pageHead({
      localeCode,
      title: pageTitle,
      description,
      canonical: canonicalUrl,
      alternates,
      type: "article",
      image: post.hero_image,
      jsonLd,
      keywords,
    })}
    <meta property="article:published_time" content="${escapeHtml(post.date || "")}" />
    <meta property="article:modified_time" content="${escapeHtml(post.updated || post.date || "")}" />
    <meta property="article:section" content="${escapeHtml(seriesItem.label[localeCode])}" />
    ${post.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`).join("\n    ")}
    <script>window.__ARTICLE_VIEW__=${escapeJsonScript(trackingPayload)};</script>
    <script defer src="${localeCode === "zh-Hant" ? "../" : "../../"}admin/view-tracker.js"></script>
    <link rel="stylesheet" href="${stylesheetHref(localeCode, true)}" />
  </head>
  <body class="post-page">
    <div class="page-shell">
      <header class="hero">
        ${renderNav(localeCode, alternates, true)}
        <div class="hero-grid">
          <section class="hero-copy">
            <p class="eyebrow">${escapeHtml(seriesItem.label[localeCode])} / ${escapeHtml(formatDate(post.date))}</p>
            <h1>${escapeHtml(post.title)}</h1>
            <p class="hero-dek">${escapeHtml(post.subtitle || post.summary || "")}</p>
            <div class="hero-meta">
              <span>${escapeHtml(seriesItem.label[localeCode])}</span>
              <span>${escapeHtml(formatDate(post.date))}</span>
              <span>${escapeHtml(t.writtenBy)} ${escapeHtml(post.author || "Cellbedell")}</span>
            </div>
          </section>
          <aside class="hero-panel">
            <p class="panel-label">${escapeHtml(t.editorNote)}</p>
            <p>${escapeHtml(post.summary || post.subtitle || "")}</p>
          </aside>
        </div>
        ${heroImage ? `<figure class="hero-visual">
          <img src="${escapeHtml(heroImage)}" alt="${escapeHtml(heroAlt)}" />
        </figure>` : ""}
      </header>
      <main>
        <section class="publish-strip" aria-label="Article metadata">
          <div class="author-lockup">
            <span class="author-avatar">SS</span>
            <div>
              <p class="card-kicker">${escapeHtml(t.writtenBy)} ${escapeHtml(post.author || "Cellbedell")}</p>
              <p>${escapeHtml(t.authorBio)}</p>
            </div>
          </div>
          <div class="publish-meta">
            <span>Published / ${escapeHtml(formatDate(post.date))}</span>
            <span>${escapeHtml(t.readingTime)} / ${estimateReadingTime(post.body, localeCode)} min</span>
            <span>${escapeHtml(seriesItem.label[localeCode])}</span>
          </div>
        </section>
        <div class="content-layout">
          <article class="article-body generated-article">
            ${bodyHtml}
          </article>
          <aside class="sidebar">
            <section class="sidebar-card">
              <p class="card-kicker">Tags</p>
              <h3>${escapeHtml(t.articleTags)}</h3>
              <div class="tag-list" aria-label="Article tags">
                ${tagLinks || `<a href="../${path.basename(seriesItem.file[localeCode])}">${escapeHtml(seriesItem.label[localeCode])}</a>`}
              </div>
            </section>
            ${post.hero_image_credit ? `<section class="sidebar-card">
              <p class="card-kicker">Image Credit</p>
              <h3>${escapeHtml(t.imageCredit)}</h3>
              <p>${escapeHtml(post.hero_image_credit)}</p>
            </section>` : ""}
            <section class="sidebar-card">
              <p class="card-kicker">Next Stories</p>
              <h3>${escapeHtml(t.nextStories)}</h3>
              <ol class="sidebar-ordered">
                ${nextItems || `<li>${escapeHtml(t.nextPreparing)}</li>`}
              </ol>
            </section>
            ${sourceItems ? `<section class="sidebar-card" id="sources">
              <p class="card-kicker">Sources</p>
              <h3>${escapeHtml(t.sources)}</h3>
              <ul class="source-list">
                ${sourceItems}
              </ul>
            </section>` : ""}
          </aside>
        </div>
      </main>
      ${renderFooter(localeCode, post.seriesKey, true)}
    </div>
  </body>
</html>
`;
}

function renderFooter(localeCode, seriesKey, fromPost = false) {
  const t = locales[localeCode];
  const seriesHref = fromPost ? `../${path.basename(series[seriesKey].file[localeCode])}` : hrefForPage(localeCode, "series", seriesKey);
  return `<footer class="site-footer">
        <div>
          <p class="eyebrow">${escapeHtml(blogName)}</p>
          <h2>${escapeHtml(t.footerTitle)}</h2>
        </div>
        <div class="footer-links">
          <p>
            <a href="${seriesHref}">${escapeHtml(series[seriesKey].label[localeCode])}</a> ${escapeHtml(t.continueSeries)}.
          </p>
          <p class="site-alias">${escapeHtml(blogName)} is published by Cellbedell.</p>
          <p class="powered-by">Powered by <a href="https://www.cellbedell.com/">Cellbedell</a></p>
        </div>
      </footer>`;
}

function updateSeoFiles(postsByLocale) {
  const allPages = [];
  const latestDate =
    Object.values(postsByLocale)
      .flat()
      .sort((a, b) => String(b.updated || b.date || "").localeCompare(String(a.updated || a.date || "")))[0]?.date ||
    new Date().toISOString().slice(0, 10);

  for (const localeCode of Object.keys(locales)) {
    allPages.push({
      loc: absoluteUrl(cleanPagePath(localeCode, "home")),
      lastmod: latestDate,
      priority: "1.0",
      alternates: homeAlternates(),
    });
    for (const seriesKey of Object.keys(series)) {
      allPages.push({
        loc: absoluteUrl(cleanPagePath(localeCode, "series", seriesKey)),
        lastmod: latestDate,
        priority: seriesKey === "hotel-tech" || seriesKey === "vivatech" ? "0.8" : "0.6",
        alternates: seriesAlternates(seriesKey),
      });
    }
  }

  const translationIndex = buildTranslationIndex(postsByLocale);
  for (const posts of Object.values(postsByLocale)) {
    for (const post of posts) {
      allPages.push({
        loc: absoluteUrl(cleanPagePath(post.locale, "post", post.slug)),
        lastmod: post.updated || post.date,
        priority: "0.9",
        alternates: postAlternates(post, translationIndex),
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map((item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    ${Object.entries(item.alternates)
      .map(([localeCode, href]) => `<xhtml:link rel="alternate" hreflang="${escapeXml(locales[localeCode].hreflang)}" href="${escapeXml(href)}" />`)
      .join("\n    ")}
    ${item.alternates["zh-Hant"] ? `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(item.alternates["zh-Hant"])}" />` : ""}
    ${item.lastmod ? `<lastmod>${escapeXml(item.lastmod)}</lastmod>` : ""}
    <priority>${item.priority}</priority>
  </url>`)
  .join("\n")}
</urlset>
`;

  write(path.join(rootDir, "sitemap.xml"), sitemap);
  write(
    path.join(rootDir, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  );
}

function updateNewsletterFeed(postsByLocale) {
  const posts = (postsByLocale["zh-Hant"] || []).slice(0, 5).map((post) => ({
    title: post.title,
    date: post.date,
    summary: post.summary || post.subtitle || "",
    url: absoluteUrl(cleanPagePath("zh-Hant", "post", post.slug)),
  }));

  write(
    path.join(rootDir, "newsletter.json"),
    `${JSON.stringify(
      {
        title: "Signal & Style 每週靈感筆記",
        cadence: "weekly",
        updated: new Date().toISOString(),
        posts,
      },
      null,
      2,
    )}\n`,
  );
}

function main() {
  fs.mkdirSync(postsDir, { recursive: true });
  const allPostsByLocale = Object.fromEntries(Object.keys(locales).map((localeCode) => [localeCode, loadLocalePosts(localeCode)]));
  const postsByLocale = Object.fromEntries(
    Object.entries(allPostsByLocale).map(([localeCode, posts]) => [localeCode, posts.filter((post) => post.isPublic)]),
  );
  const translationIndex = buildTranslationIndex(postsByLocale);

  for (const posts of Object.values(allPostsByLocale)) {
    for (const post of posts) {
      if (!post.isPublic && fs.existsSync(post.outputPath)) {
        fs.unlinkSync(post.outputPath);
      }
    }
  }

  for (const [localeCode, posts] of Object.entries(postsByLocale)) {
    write(locales[localeCode].homeFile, renderHome(posts, localeCode));
    for (const seriesKey of Object.keys(series)) {
      write(path.join(rootDir, series[seriesKey].file[localeCode]), renderSeriesPage(posts, localeCode, seriesKey));
    }
    for (const post of posts) {
      write(post.outputPath, renderPost(post, localeCode, translationIndex));
    }
  }

  updateSeoFiles(postsByLocale);
  updateNewsletterFeed(postsByLocale);
  const count = Object.values(postsByLocale).reduce((sum, posts) => sum + posts.length, 0);
  console.log(`Built ${count} localized CMS post(s).`);
}

main();
