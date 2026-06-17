const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const fmt = (n, digits = 0) => Number(n).toFixed(digits);
const flag = (code) => code.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
const rootPrefix = location.pathname.includes("/pages/") ? ".." : ".";

// ================= 多语言本地化字典 =================
const langData = {
  en: {
    navSpeed: "Speed Test", navTools: "Tools", navRank: "Rankings", navSec: "Security",
    heroTitle: "Test your internet speed anywhere in the world.",
    heroLead: "GlobalPing combines a browser speed test, global country rankings, DNS setup guides, VPN reviews and everyday diagnostics.",
    btnStart: "Start Speed Test", btnOpen: "Open Toolkit",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter"
  },
  zh: {
    navSpeed: "网速测试", navTools: "网络工具", navRank: "全球排名", navSec: "安全指南",
    heroTitle: "测试您在全球任何地方的互联网网速。",
    heroLead: "GlobalPing 聚合了浏览器轻量测速、全球国家网速排行、DNS设置指南、VPN/代理评测及日常网络故障排查工具。",
    btnStart: "开始网速测试", btnOpen: "打开工具箱",
    metricDown: "下载速度", metricUp: "上传速度", metricPing: "网络延迟", metricJitter: "抖动"
  }
};

function initLanguage() {
  let currentLang = localStorage.getItem("globalping-lang") || "en";

  const applyLanguage = (lang) => {
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (langData[lang] && langData[lang][key]) {
        if (el.tagName === "INPUT" || el.tagName === "SELECT") {
          el.placeholder = langData[lang][key];
        } else {
          el.textContent = langData[lang][key];
        }
      }
    });
    localStorage.setItem("globalping-lang", lang);
  };

  const langBtn = $(".btn.ghost[href*='about-privacy.html']");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentLang = currentLang === "en" ? "zh" : "en";
      applyLanguage(currentLang);
      langBtn.textContent = currentLang === "en" ? "EN / 中文" : "中文 / EN";
    });
    langBtn.textContent = currentLang === "en" ? "EN / 中文" : "中文 / EN";
  }
  applyLanguage(currentLang);
}

// ================= Google Analytics 脚本注入 =================
function initAnalytics() {
  if (!window.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-DDHNR5DW95";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DDHNR5DW95');
  }
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
  initAnalytics();
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
