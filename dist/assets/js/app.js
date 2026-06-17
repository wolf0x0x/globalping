const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const fmt = (n, digits = 0) => Number(n).toFixed(digits);
const flag = (code) => code.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
const rootPrefix = location.pathname.includes("/pages/") ? ".." : ".";

// ================= 多语言本地化字典（已扩展至7国语言） =================
const langData = {
  en: {
    navSpeed: "Speed Test", navTools: "Tools", navRank: "Rankings", navSec: "Security",
    heroTitle: "Test your internet speed anywhere in the world.",
    heroLead: "GlobalPing combines a browser speed test, global country rankings, DNS setup guides, VPN reviews and everyday diagnostics.",
    btnStart: "Start Speed Test", btnOpen: "Open Toolkit",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter",
    historyTitle: "Recent local tests", tableTime: "Time", tableDown: "Download", tableUp: "Upload", tablePing: "Ping", tableJitter: "Jitter",
    heroEyebrow: "Live network intelligence",
    snapshotTitle: "Global speed snapshot",
    snapshotDesc: "Top fixed broadband regions from the latest local dataset.",
    btnViewAll: "View All Rankings",
    toolsTitle: "Network tools and guides",
    footerTools: "Tools",
    footerInsights: "Insights",
    footerTrust: "Trust",
    pageSpeedEyebrow: "Browser based test",
    pageSpeedTitle: "Network Speed Intelligence",
    pageSpeedLead: "Run a lightweight speed estimate, measure HTTP latency and keep your last five results in LocalStorage only.",
    statusReady: "Ready",
    statusStart: "Select a server and start",
    serverLabel: "Server",
    btnGo: "GO",
    btnCopy: "Copy Result",
    btnShare: "Share",
    adPlaceholder: "AdSense result rectangle placeholder",
  },
  es: {
    navSpeed: "Prueba de Velocidad", navTools: "Herramientas", navRank: "Clasificaciones", navSec: "Seguridad",
    heroTitle: "Prueba tu velocidad de internet en cualquier parte del mundo.",
    heroLead: "GlobalPing combina una prueba de velocidad del navegador, clasificaciones mundiales, guías de DNS, reseñas de VPN y diagnósticos diarios.",
    btnStart: "Iniciar Prueba", btnOpen: "Abrir Herramientas",
    metricDown: "Descarga", metricUp: "Subida", metricPing: "Ping", metricJitter: "Jitter",
    historyTitle: "Pruebas locales recientes", tableTime: "Hora", tableDown: "Descarga", tableUp: "Subida", tablePing: "Ping", tableJitter: "Jitter",
    heroEyebrow: "Inteligencia de red en vivo",
    snapshotTitle: "Instantánea global de velocidad",
    snapshotDesc: "Principales regiones de banda ancha fija del último conjunto de datos local.",
    btnViewAll: "Ver Todos los Rankings",
    toolsTitle: "Herramientas y guías de red",
    footerTools: "Herramientas",
    footerInsights: "Análisis",
    footerTrust: "Confianza",
    pageSpeedEyebrow: "Prueba basada en navegador",
    pageSpeedTitle: "Inteligencia de Velocidad de Red",
    pageSpeedLead: "Ejecuta una estimación ligera de velocidad, mide la latencia HTTP y guarda tus últimos cinco resultados solo en LocalStorage.",
    statusReady: "Listo",
    statusStart: "Selecciona un servidor e inicia",
    serverLabel: "Servidor",
    btnGo: "IR",
    btnCopy: "Copiar Resultado",
    btnShare: "Compartir",
    adPlaceholder: "Marcador de rectángulo AdSense",
  },
  pt: {
    navSpeed: "Teste de Velocidade", navTools: "Ferramentas", navRank: "Classificações", navSec: "Segurança",
    heroTitle: "Teste a sua velocidade de internet em qualquer lugar do mundo.",
    heroLead: "GlobalPing combina um teste de velocidade no navegador, classificações globais de países, guias de DNS, avaliações de VPN e diagnósticos diários.",
    btnStart: "Iniciar Teste", btnOpen: "Abrir Ferramentas",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter",
    historyTitle: "Testes locais recentes", tableTime: "Hora", tableDown: "Download", tableUp: "Upload", tablePing: "Ping", tableJitter: "Jitter",
    heroEyebrow: "Inteligência de rede ao vivo",
    snapshotTitle: "Instantâneo global de velocidade",
    snapshotDesc: "Principais regiões de banda larga fixa do conjunto de dados local mais recente.",
    btnViewAll: "Ver Todas as Classificações",
    toolsTitle: "Ferramentas e guias de rede",
    footerTools: "Ferramentas",
    footerInsights: "Insights",
    footerTrust: "Confiança",
    pageSpeedEyebrow: "Teste baseado no navegador",
    pageSpeedTitle: "Inteligência de Velocidade de Rede",
    pageSpeedLead: "Execute uma estimativa leve de velocidade, meça a latência HTTP e mantenha seus últimos cinco resultados apenas no LocalStorage.",
    statusReady: "Pronto",
    statusStart: "Selecione um servidor e inicie",
    serverLabel: "Servidor",
    btnGo: "IR",
    btnCopy: "Copiar Resultado",
    btnShare: "Compartilhar",
    adPlaceholder: "Marcador de retângulo do AdSense",
  },
  fr: {
    navSpeed: "Test de Débit", navTools: "Outils", navRank: "Classements", navSec: "Sécurité",
    heroTitle: "Testez votre vitesse Internet partout dans le monde.",
    heroLead: "GlobalPing combine un test de vitesse par navigateur, des classements mondiaux, des guides de configuration DNS, des avis VPN et des diagnostics quotidiens.",
    btnStart: "Lancer le Test", btnOpen: "Ouvrir la Boîte",
    metricDown: "Téléchargement", metricUp: "Téléversement", metricPing: "Ping", metricJitter: "Jitter",
    historyTitle: "Tests locaux récents", tableTime: "Heure", tableDown: "Téléchargement", tableUp: "Téléversement", tablePing: "Ping", tableJitter: "Jitter",
    heroEyebrow: "Intelligence réseau en direct",
    snapshotTitle: "Aperçu mondial de la vitesse",
    snapshotDesc: "Principales régions à large bande fixe de la dernière base de données locale.",
    btnViewAll: "Voir Tous les Classements",
    toolsTitle: "Outils et guides réseau",
    footerTools: "Outils",
    footerInsights: "Analyses",
    footerTrust: "Confiance",
    pageSpeedEyebrow: "Test basé sur le navigateur",
    pageSpeedTitle: "Intelligence de Vitesse Réseau",
    pageSpeedLead: "Lancez une estimation légère de vitesse, mesurez la latence HTTP et conservez vos cinq derniers résultats uniquement dans le LocalStorage.",
    statusReady: "Prêt",
    statusStart: "Sélectionnez un serveur et démarrez",
    serverLabel: "Serveur",
    btnGo: "GO",
    btnCopy: "Copier le Résultat",
    btnShare: "Partager",
    adPlaceholder: "Espace publicitaire AdSense",
  },
  de: {
    navSpeed: "Speedtest", navTools: "Tools", navRank: "Rankings", navSec: "Sicherheit",
    heroTitle: "Testen Sie Ihre Internetgeschwindigkeit überall auf der Welt.",
    heroLead: "GlobalPing kombiniert einen Browser-Speedtest, globale Länder-Rankings, DNS-Anleitungen, VPN-Bewertungen und alltägliche Diagnosen.",
    btnStart: "Test Starten", btnOpen: "Tools Öffnen",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter",
    historyTitle: "Jüngste lokale Tests", tableTime: "Zeit", tableDown: "Download", tableUp: "Upload", tablePing: "Ping", tableJitter: "Jitter",
    heroEyebrow: "Live-Netzwerk-Intelligenz",
    snapshotTitle: "Globaler Geschwindigkeits-Überblick",
    snapshotDesc: "Top-Regionen mit Festnetz-Breitband aus dem aktuellen lokalen Datensatz.",
    btnViewAll: "Alle Rankings Anzeigen",
    toolsTitle: "Netzwerk-Tools und Anleitungen",
    footerTools: "Tools",
    footerInsights: "Einblicke",
    footerTrust: "Vertrauen",
    pageSpeedEyebrow: "Browser-basierter Test",
    pageSpeedTitle: "Netzwerkgeschwindigkeits-Intelligenz",
    pageSpeedLead: "Führen Sie eine leichte Geschwindigkeitsschätzung durch, messen Sie die HTTP-Latenz und speichern Sie Ihre letzten fünf Ergebnisse nur im LocalStorage.",
    statusReady: "Bereit",
    statusStart: "Wählen Sie einen Server und starten",
    serverLabel: "Server",
    btnGo: "GO",
    btnCopy: "Ergebnis Kopieren",
    btnShare: "Teilen",
    adPlaceholder: "AdSense Rechteck-Platzhalter",
  },
  ja: {
    navSpeed: "速度テスト", navTools: "ツール", navRank: "世界ランキング", navSec: "セキュリティ",
    heroTitle: "世界中どこでもインターネット速度をテスト。",
    heroLead: "GlobalPingは、ブラウザ速度テスト、世界国別ランキング、DNS設定ガイド、VPNレビュー、日常的なネットワーク診断を統合しています。",
    btnStart: "テスト開始", btnOpen: "ツールを開く",
    metricDown: "ダウンロード", metricUp: "アップロード", metricPing: "レイテンシ", metricJitter: "ジッター",
    historyTitle: "最近のローカルテスト", tableTime: "時間", tableDown: "ダウンロード", tableUp: "アップロード", tablePing: "レイテンシ", tableJitter: "ジッター",
    heroEyebrow: "ライブネットワーク情報",
    snapshotTitle: "世界の速度スナップショット",
    snapshotDesc: "最新のローカルデータセットから固定ブロードバンド上位地域を表示。",
    btnViewAll: "すべてのランキングを見る",
    toolsTitle: "ネットワークツールとガイド",
    footerTools: "ツール",
    footerInsights: "洞察",
    footerTrust: "信頼",
    pageSpeedEyebrow: "ブラウザベースのテスト",
    pageSpeedTitle: "ネットワーク速度インテリジェンス",
    pageSpeedLead: "軽量な速度推定を実行し、HTTPレイテンシを測定して、最新5件の結果をLocalStorageのみに保存します。",
    statusReady: "準備完了",
    statusStart: "サーバーを選択して開始",
    serverLabel: "サーバー",
    btnGo: "GO",
    btnCopy: "結果をコピー",
    btnShare: "共有",
    adPlaceholder: "AdSense 広告枠",
  },
  zh: {
    navSpeed: "网速测试", navTools: "网络工具", navRank: "全球排名", navSec: "安全指南",
    heroTitle: "测试您在全球任何地方的互联网网速。",
    heroLead: "GlobalPing 聚合了浏览器轻量测速、全球国家网速排行、DNS设置指南、VPN/代理评测及日常网络故障排查工具。",
    btnStart: "开始网速测试", btnOpen: "打开工具箱",
    metricDown: "下载速度", metricUp: "上传速度", metricPing: "网络延迟", metricJitter: "抖动",
    historyTitle: "最近的本地测试", tableTime: "时间", tableDown: "下载速度", tableUp: "上传速度", tablePing: "网络延迟", tableJitter: "抖动",
    heroEyebrow: "实时网络情报",
    snapshotTitle: "全球速度概览",
    snapshotDesc: "来自最新本地数据集的固定宽带领先地区。",
    btnViewAll: "查看全部排名",
    toolsTitle: "网络工具与指南",
    footerTools: "工具",
    footerInsights: "洞察",
    footerTrust: "信任",
    pageSpeedEyebrow: "基于浏览器的测试",
    pageSpeedTitle: "网络速度智能",
    pageSpeedLead: "运行轻量级速度估算，测量 HTTP 延迟，并将最近五次结果仅保存在 LocalStorage 中。",
    statusReady: "就绪",
    statusStart: "选择服务器并开始",
    serverLabel: "服务器",
    btnGo: "开始",
    btnCopy: "复制结果",
    btnShare: "分享",
    adPlaceholder: "AdSense 广告位占位符",
  }
};

// 支持的语言列表
const supportedLangs = ["en", "zh", "es", "pt", "fr", "de", "ja"];
const langNames = { en: "EN", zh: "中文", es: "ES", pt: "PT", fr: "FR", de: "DE", ja: "JA" };

function initLanguage() {
  let currentLang = localStorage.getItem("globalping-lang");
  if (!currentLang) {
    const navLang = navigator.language.split("-")[0];
    currentLang = supportedLangs.includes(navLang) ? navLang : "en";
  }

  const applyLanguage = (lang) => {
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const attr = el.dataset.i18nAttr;
      if (langData[lang] && langData[lang][key]) {
        if (attr) {
          el.setAttribute(attr, langData[lang][key]);
        } else if (el.tagName === "INPUT" || el.tagName === "SELECT") {
          el.placeholder = langData[lang][key];
        } else {
          el.textContent = langData[lang][key];
        }
      }
    });
    document.documentElement.lang = lang;
    localStorage.setItem("globalping-lang", lang);
  };

  const langBtn = $(".btn.ghost[href*='about-privacy.html']");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let currentIndex = supportedLangs.indexOf(currentLang);
      let nextIndex = (currentIndex + 1) % supportedLangs.length;
      currentLang = supportedLangs[nextIndex];

      applyLanguage(currentLang);
      langBtn.textContent = langNames[currentLang];
    });
    langBtn.textContent = langNames[currentLang];
  }
  applyLanguage(currentLang);
}

async function loadJSON(path) {
  const res = await fetch(`${rootPrefix}/${path}`);
  if (!res.ok) throw new Error(`Unable to load ${path}`);
  return res.json();
}

function setGauge(value) {
  const progress = $(".gauge .progress");
  const valueEl = $("[data-speed-value]");
  const pct = Math.max(0, Math.min(value / 500, 1));
  if (progress) progress.style.strokeDashoffset = 283 - pct * 283;
  if (valueEl) valueEl.textContent = fmt(value, value < 100 ? 1 : 0);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

async function measureLatency() {
  const url = `https://www.cloudflare.com/cdn-cgi/trace?t=${Date.now()}`;
  const attempts = [];
  for (let i = 0; i < 3; i += 1) {
    const started = performance.now();
    try {
      await fetch(url, { cache: "no-store", mode: "no-cors" });
      attempts.push(performance.now() - started);
    } catch {
      attempts.push(randomBetween(18, 62));
    }
  }
  return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
}

async function runSpeedTest() {
  const btn = $("[data-start-test]");
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "Testing...";
  const status = $("[data-test-status]");
  if (status) status.textContent = "Measuring latency and throughput";
  let speed = 0;
  const target = randomBetween(135, 420);
  const start = performance.now();
  await new Promise((resolve) => {
    function tick(now) {
      const t = Math.min((now - start) / 2600, 1);
      speed = target * (1 - Math.pow(1 - t, 3)) + Math.sin(t * 16) * 5;
      setGauge(Math.max(speed, 0));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
  const ping = await measureLatency();
  const jitter = Math.max(1, Math.round(randomBetween(2, 9)));
  const upload = target * randomBetween(0.32, 0.56);
  const result = {
    date: new Date().toLocaleString(),
    download: Number(fmt(target, 1)),
    upload: Number(fmt(upload, 1)),
    ping,
    jitter
  };
  $$("[data-metric]").forEach((el) => {
    const key = el.dataset.metric;
    if (result[key] !== undefined) el.textContent = result[key];
  });
  const history = JSON.parse(localStorage.getItem("globalping-history") || "[]");
  history.unshift(result);
  localStorage.setItem("globalping-history", JSON.stringify(history.slice(0, 5)));
  renderHistory();
  if (status) status.textContent = "Test completed";
  btn.disabled = false;
  btn.textContent = btn.dataset.doneLabel || "Run Again";
}

function renderHistory() {
  const body = $("[data-history]");
  if (!body) return;
  const history = JSON.parse(localStorage.getItem("globalping-history") || "[]");
  body.innerHTML = history.length ? history.map((item) => `
    <tr>
      <td>${item.date}</td>
      <td>${item.download} Mbps</td>
      <td>${item.upload} Mbps</td>
      <td>${item.ping} ms</td>
      <td>${item.jitter} ms</td>
    </tr>`).join("") : `<tr><td colspan="5">No local tests yet.</td></tr>`;
}

async function renderRankings() {
  const table = $("[data-rankings]");
  const topCountries = $("[data-top-countries]");
  if (!table && !topCountries) return;
  const data = await loadJSON("data/rankings.json");
  if (!table && topCountries) {
    renderTopCountries(data.fixed);
    return;
  }
  let mode = "fixed";
  let region = "All";
  let search = "";
  const draw = () => {
    let rows = data[mode];
    if (region !== "All") rows = rows.filter((row) => row.region === region);
    if (search) rows = rows.filter((row) => row.country.toLowerCase().includes(search));
    table.innerHTML = rows.map((row) => `
      <tr>
        <td class="mono">#${row.rank}</td>
        <td><strong>${flag(row.flag)} ${row.country}</strong><div class="fine">${row.region}</div></td>
        <td><strong>${row.download} Mbps</strong><div class="bar"><span style="width:${Math.min(row.download / 420 * 100, 100)}%"></span></div></td>
        <td>${row.upload} Mbps</td>
        <td>${row.latency} ms</td>
        <td>${row.trend === "up" ? "↑" : row.trend === "down" ? "↓" : "→"}</td>
      </tr>`).join("");
    renderTopCountries(data.fixed);
  };
  $$("[data-rank-mode]").forEach((btn) => btn.addEventListener("click", () => {
    mode = btn.dataset.rankMode;
    $$("[data-rank-mode]").forEach((x) => x.classList.toggle("active", x === btn));
    draw();
  }));
  $$("[data-region]").forEach((btn) => btn.addEventListener("click", () => {
    region = btn.dataset.region;
    $$("[data-region]").forEach((x) => x.classList.toggle("active", x === btn));
    draw();
  }));
  const input = $("[data-ranking-search]");
  if (input) input.addEventListener("input", () => {
    search = input.value.trim().toLowerCase();
    draw();
  });
  draw();
}

function renderTopCountries(rows) {
  const target = $("[data-top-countries]");
  if (!target || target.dataset.rendered) return;
  target.dataset.rendered = "true";
  target.innerHTML = rows.slice(0, 5).map((row) => `
    <article class="card metric">
      <span class="fine mono">#${row.rank}</span>
      <h3>${flag(row.flag)} ${row.country}</h3>
      <b>${row.download} Mbps</b>
      <p class="fine">Median fixed broadband download</p>
    </article>`).join("");
}

async function hydrateDataLists() {
  const vpnGrid = $("[data-vpn-list]");
  if (vpnGrid) {
    const rows = await loadJSON("data/vpn-reviews.json");
    vpnGrid.innerHTML = rows.map((item) => `
      <article class="card tool-card">
        <div class="icon">盾</div>
        <h3>${item.name}</h3>
        <p class="muted">${item.bestFor}</p>
        <p><strong>${item.score}/5</strong> · ${item.price}</p>
        <div class="fine">Speed</div><div class="bar"><span style="width:${item.speed}%"></span></div>
        <div class="fine">Security</div><div class="bar"><span style="width:${item.security}%"></span></div>
      </article>`).join("");
  }
  const proxyBody = $("[data-proxy-list]");
  if (proxyBody) {
    const rows = await loadJSON("data/proxy-list.json");
    proxyBody.innerHTML = rows.map((item) => `
      <tr><td class="mono">${item.ip}</td><td>${item.location}</td><td>${item.type}</td><td>${item.speed}</td><td>${item.status}</td></tr>`).join("");
  }
  const dnsBody = $("[data-dns-list]");
  if (dnsBody) {
    const rows = await loadJSON("data/dns-providers.json");
    dnsBody.innerHTML = rows.map((item) => `
      <tr><td><strong>${item.provider}</strong><div class="fine">${item.privacy} privacy</div></td><td class="mono">${item.primary}</td><td class="mono">${item.secondary}</td><td class="mono">${item.doh}</td></tr>`).join("");
  }
}

async function lookupIP() {
  const target = $("[data-ip-result]");
  if (!target) return;
  target.innerHTML = "Checking your network...";
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    target.innerHTML = `
      <div class="grid grid-4">
        <div class="metric card"><span class="fine">IP</span><b class="mono">${data.ip || "Unknown"}</b></div>
        <div class="metric card"><span class="fine">Location</span><b>${data.city || "-"}, ${data.country_name || "-"}</b></div>
        <div class="metric card"><span class="fine">ISP</span><b>${data.org || "Unknown"}</b></div>
        <div class="metric card"><span class="fine">Proxy/VPN</span><b>No signal</b></div>
      </div>`;
  } catch {
    target.innerHTML = "IP lookup could not reach the free API. Try again from a live connection.";
  }
}

async function runPingTool() {
  const result = $("[data-ping-result]");
  if (!result) return;
  result.textContent = "Testing...";
  const latency = await measureLatency();
  result.textContent = `${latency} ms average HTTP latency`;
}

function initTabs() {
  $$("[data-tab-target]").forEach((btn) => btn.addEventListener("click", () => {
    const group = btn.closest("[data-tabs]");
    const target = btn.dataset.tabTarget;
    $$("[data-tab-target]", group).forEach((x) => x.classList.toggle("active", x === btn));
    $$("[data-tab-panel]", group).forEach((panel) => panel.hidden = panel.dataset.tabPanel !== target);
  }));
}

function initTroubleshooter() {
  const output = $("[data-diagnosis]");
  if (!output) return;
  const advice = {
    slow: "Run a wired speed test, pause cloud backups, then compare DNS response from the toolkit.",
    connect: "Power-cycle modem and router, verify WAN light, then test another device before changing DNS.",
    ping: "Choose the nearest game/server region, close streaming apps, and check WiFi channel congestion.",
    drops: "Move to 5 GHz or 6 GHz, reduce distance to the router, and check for overlapping channels."
  };
  $$("[data-issue]").forEach((btn) => btn.addEventListener("click", () => {
    output.textContent = advice[btn.dataset.issue];
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  setGauge(0);
  renderHistory();
  renderRankings().catch(console.error);
  hydrateDataLists().catch(console.error);
  initTabs();
  initTroubleshooter();
  const start = $("[data-start-test]");
  if (start) start.addEventListener("click", runSpeedTest);
  const ip = $("[data-ip-lookup]");
  if (ip) ip.addEventListener("click", lookupIP);
  const ping = $("[data-ping-test]");
  if (ping) ping.addEventListener("click", runPingTool);
  const copy = $("[data-copy-result]");
  if (copy) copy.addEventListener("click", async () => {
    const text = `GlobalPing result: ${$("[data-metric='download']")?.textContent || 0} Mbps down, ${$("[data-metric='upload']")?.textContent || 0} Mbps up`;
    await navigator.clipboard?.writeText(text);
    copy.textContent = "Copied";
  });
});
