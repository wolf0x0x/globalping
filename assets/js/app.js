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
    heroLead: "GlobalPing combines a browser speed test, global country rankings, DNS setup guides, VPN reviews and everyday diagnostics in one static, privacy-conscious toolkit.",
    btnStart: "Start Speed Test", btnOpen: "Open Toolkit",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter", metricLoss: "Packet Loss",
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
    pageSpeedLead: "Run a Cloudflare edge download/upload test, measure HTTP latency and keep your last five results in LocalStorage only.",
    statusReady: "Ready",
    statusStart: "Select a server and start",
    serverLabel: "Server",
    btnGo: "GO",
    btnCopy: "Copy Result",
    btnShare: "Share",
    adPlaceholder: "Sponsored network tools placement",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "No local tests yet.",
    labelTesting: "Testing...",
    statusMeasuring: "Measuring latency and throughput",
    statusCompleted: "Test completed",
    btnAgain: "Run Again",
    copyDone: "Copied",
    copyResultText: "GlobalPing result: {down} Mbps down, {up} Mbps up",
    topCountriesLabel: "Median fixed broadband download",
    ipChecking: "Checking your network...",
    ipLabelIP: "IP",
    ipLabelLocation: "Location",
    ipLabelISP: "ISP",
    ipLabelProxy: "Proxy/VPN",
    ipNoSignal: "No signal",
    ipError: "IP lookup could not reach the free API. Try again from a live connection.",
    pingTesting: "Testing...",
    pingResult: "{value} ms average HTTP latency",
    adviceSlow: "Run a wired speed test, pause cloud backups, then compare DNS response from the toolkit.",
    adviceConnect: "Power-cycle modem and router, verify WAN light, then test another device before changing DNS.",
    advicePing: "Choose the nearest game/server region, close streaming apps, and check WiFi channel congestion.",
    adviceDrops: "Move to 5 GHz or 6 GHz, reduce distance to the router, and check for overlapping channels.",
    statusError: "Speed test endpoint unavailable. Please try again.",
    historyUnavailable: "Unavailable",
    unitNA: "N/A",
    rankSource: "Source: {source} · {status} · updated {updated}",
    vpnSpeed: "Speed",
    vpnSecurity: "Security",
    vpnSourceLabel: "Source:",
    ipUnknown: "Unknown",
    ipPossibleVPN: "Possible VPN",
    proxySource: "Source: {source} · {status} · {updated}",
    countryInsight: "{country} is tracked in the {region} cohort with ISP-level estimates and rolling 12-month speed trend data for search landing pages and user comparison.",
  },
  es: {
    navSpeed: "Prueba de Velocidad", navTools: "Herramientas", navRank: "Clasificaciones", navSec: "Seguridad",
    heroTitle: "Prueba tu velocidad de internet en cualquier parte del mundo.",
    heroLead: "GlobalPing combina una prueba de velocidad del navegador, clasificaciones mundiales, guías de DNS, reseñas de VPN y diagnósticos diarios.",
    btnStart: "Iniciar Prueba", btnOpen: "Abrir Herramientas",
    metricDown: "Descarga", metricUp: "Subida", metricPing: "Ping", metricJitter: "Jitter", metricLoss: "Pérdida de paquetes",
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
    pageSpeedLead: "Ejecuta una prueba de descarga/subida en Cloudflare edge, mide la latencia HTTP y guarda tus últimos cinco resultados solo en LocalStorage.",
    statusReady: "Listo",
    statusStart: "Selecciona un servidor e inicia",
    serverLabel: "Servidor",
    btnGo: "IR",
    btnCopy: "Copiar Resultado",
    btnShare: "Compartir",
    adPlaceholder: "Espacio patrocinado de herramientas de red",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "Aún no hay pruebas locales.",
    labelTesting: "Probando...",
    statusMeasuring: "Midiendo latencia y rendimiento",
    statusCompleted: "Prueba completada",
    btnAgain: "Ejecutar de Nuevo",
    copyDone: "Copiado",
    copyResultText: "Resultado GlobalPing: {down} Mbps de bajada, {up} Mbps de subida",
    topCountriesLabel: "Descarga mediana de banda ancha fija",
    ipChecking: "Comprobando tu red...",
    ipLabelIP: "IP",
    ipLabelLocation: "Ubicación",
    ipLabelISP: "ISP",
    ipLabelProxy: "Proxy/VPN",
    ipNoSignal: "Sin señal",
    ipError: "No se pudo contactar la API gratuita de geolocalización. Inténtalo desde una conexión activa.",
    pingTesting: "Probando...",
    pingResult: "{value} ms de latencia HTTP promedio",
    adviceSlow: "Haz una prueba por cable, pausa las copias de seguridad en la nube y luego compara la respuesta DNS desde las herramientas.",
    adviceConnect: "Reinicia el módem y el router, verifica la luz WAN y prueba otro dispositivo antes de cambiar el DNS.",
    advicePing: "Elige la región de juego/servidor más cercana, cierra apps de streaming y verifica la congestión del canal WiFi.",
    adviceDrops: "Cambia a 5 GHz o 6 GHz, reduce la distancia al router y verifica canales superpuestos.",
    statusError: "El endpoint de la prueba de velocidad no está disponible. Inténtalo de nuevo.",
    historyUnavailable: "No disponible",
    unitNA: "N/D",
    rankSource: "Fuente: {source} · {status} · actualizado {updated}",
    vpnSpeed: "Velocidad",
    vpnSecurity: "Seguridad",
    vpnSourceLabel: "Fuente:",
    ipUnknown: "Desconocido",
    ipPossibleVPN: "Posible VPN",
    proxySource: "Fuente: {source} · {status} · {updated}",
    "Download": "Descarga",
    "Upload": "Subida",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Los nodos más oscuros indican mayores velocidades medianas de descarga del conjunto de datos público sincronizado."
  },
  pt: {
    navSpeed: "Teste de Velocidade", navTools: "Ferramentas", navRank: "Classificações", navSec: "Segurança",
    heroTitle: "Teste a sua velocidade de internet em qualquer lugar do mundo.",
    heroLead: "GlobalPing combina um teste de velocidade no navegador, classificações globais de países, guias de DNS, avaliações de VPN e diagnósticos diários.",
    btnStart: "Iniciar Teste", btnOpen: "Abrir Ferramentas",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter", metricLoss: "Perda de pacotes",
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
    pageSpeedLead: "Execute um teste de download/upload no edge da Cloudflare, meça a latência HTTP e mantenha seus últimos cinco resultados apenas no LocalStorage.",
    statusReady: "Pronto",
    statusStart: "Selecione um servidor e inicie",
    serverLabel: "Servidor",
    btnGo: "IR",
    btnCopy: "Copiar Resultado",
    btnShare: "Compartilhar",
    adPlaceholder: "Espaço patrocinado de ferramentas de rede",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "Ainda não há testes locais.",
    labelTesting: "Testando...",
    statusMeasuring: "Medindo latência e throughput",
    statusCompleted: "Teste concluído",
    btnAgain: "Executar Novamente",
    copyDone: "Copiado",
    copyResultText: "Resultado GlobalPing: {down} Mbps de download, {up} Mbps de upload",
    topCountriesLabel: "Download mediano de banda larga fixa",
    ipChecking: "Verificando sua rede...",
    ipLabelIP: "IP",
    ipLabelLocation: "Localização",
    ipLabelISP: "ISP",
    ipLabelProxy: "Proxy/VPN",
    ipNoSignal: "Sem sinal",
    ipError: "Não foi possível alcançar a API gratuita de consulta de IP. Tente novamente com uma conexão ativa.",
    pingTesting: "Testando...",
    pingResult: "{value} ms de latência HTTP média",
    adviceSlow: "Execute um teste com cabo, pause backups na nuvem e compare a resposta DNS nas ferramentas.",
    adviceConnect: "Reinicie o modem e o roteador, verifique a luz WAN e teste outro dispositivo antes de alterar o DNS.",
    advicePing: "Escolha a região de jogo/servidor mais próxima, feche apps de streaming e verifique a congestão do canal WiFi.",
    adviceDrops: "Mude para 5 GHz ou 6 GHz, reduza a distância do roteador e verifique canais sobrepostos.",
    statusError: "O endpoint do teste de velocidade está indisponível. Tente novamente.",
    historyUnavailable: "Indisponível",
    unitNA: "N/A",
    rankSource: "Fonte: {source} · {status} · atualizado em {updated}",
    vpnSpeed: "Velocidade",
    vpnSecurity: "Segurança",
    vpnSourceLabel: "Fonte:",
    ipUnknown: "Desconhecido",
    ipPossibleVPN: "Possível VPN",
    proxySource: "Fonte: {source} · {status} · {updated}",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Nós mais escuros indicam maiores velocidades medianas de download no conjunto público sincronizado."
  },
  fr: {
    navSpeed: "Test de Débit", navTools: "Outils", navRank: "Classements", navSec: "Sécurité",
    heroTitle: "Testez votre vitesse Internet partout dans le monde.",
    heroLead: "GlobalPing combine un test de vitesse par navigateur, des classements mondiaux, des guides de configuration DNS, des avis VPN et des diagnostics quotidiens.",
    btnStart: "Lancer le Test", btnOpen: "Ouvrir la Boîte",
    metricDown: "Téléchargement", metricUp: "Téléversement", metricPing: "Ping", metricJitter: "Jitter", metricLoss: "Perte de paquets",
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
    pageSpeedLead: "Lancez un test de téléchargement/envoi via Cloudflare edge, mesurez la latence HTTP et conservez vos cinq derniers résultats uniquement dans le LocalStorage.",
    statusReady: "Prêt",
    statusStart: "Sélectionnez un serveur et démarrez",
    serverLabel: "Serveur",
    btnGo: "GO",
    btnCopy: "Copier le Résultat",
    btnShare: "Partager",
    adPlaceholder: "Espace publicitaire AdSense",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "Aucun test local pour l'instant.",
    labelTesting: "Test en cours...",
    statusMeasuring: "Mesure de la latence et du débit",
    statusCompleted: "Test terminé",
    btnAgain: "Relancer",
    copyDone: "Copié",
    copyResultText: "Résultat GlobalPing : {down} Mbps en téléchargement, {up} Mbps en envoi",
    topCountriesLabel: "Téléchargement médian à large bande fixe",
    ipChecking: "Vérification de votre réseau...",
    ipLabelIP: "IP",
    ipLabelLocation: "Localisation",
    ipLabelISP: "FAI",
    ipLabelProxy: "Proxy/VPN",
    ipNoSignal: "Aucun signe",
    ipError: "La recherche IP n'a pas pu atteindre l'API gratuite. Réessayez depuis une connexion active.",
    pingTesting: "Test en cours...",
    pingResult: "{value} ms de latence HTTP moyenne",
    adviceSlow: "Faites un test avec câble, mettez les sauvegardes cloud en pause, puis comparez la réponse DNS depuis les outils.",
    adviceConnect: "Redémarrez le modem et le routeur, vérifiez le voyant WAN, puis testez un autre appareil avant de changer de DNS.",
    advicePing: "Choisissez la région de jeu/serveur la plus proche, fermez les apps de streaming et vérifiez la congestion du canal WiFi.",
    adviceDrops: "Passez au 5 GHz ou 6 GHz, rapprochez-vous du routeur et vérifiez les canaux qui se chevauchent.",
    statusError: "Le point de terminaison du test de débit est indisponible. Veuillez réessayer.",
    historyUnavailable: "Indisponible",
    unitNA: "N/A",
    rankSource: "Source : {source} · {status} · mis à jour {updated}",
    vpnSpeed: "Vitesse",
    vpnSecurity: "Sécurité",
    vpnSourceLabel: "Source :",
    ipUnknown: "Inconnu",
    ipPossibleVPN: "VPN possible",
    proxySource: "Source : {source} · {status} · {updated}",
    "Download": "Téléchargement",
    "Upload": "Téléversement",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Les points plus sombres indiquent des vitesses médianes de téléchargement plus élevées dans le dernier jeu de données public synchronisé."
  },
  de: {
    navSpeed: "Speedtest", navTools: "Tools", navRank: "Rankings", navSec: "Sicherheit",
    heroTitle: "Testen Sie Ihre Internetgeschwindigkeit überall auf der Welt.",
    heroLead: "GlobalPing kombiniert einen Browser-Speedtest, globale Länder-Rankings, DNS-Anleitungen, VPN-Bewertungen und alltägliche Diagnosen.",
    btnStart: "Test Starten", btnOpen: "Tools Öffnen",
    metricDown: "Download", metricUp: "Upload", metricPing: "Ping", metricJitter: "Jitter", metricLoss: "Paketverlust",
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
    pageSpeedLead: "Führen Sie einen Cloudflare-Edge Download-/Upload-Test durch, messen Sie die HTTP-Latenz und speichern Sie Ihre letzten fünf Ergebnisse nur im LocalStorage.",
    statusReady: "Bereit",
    statusStart: "Wählen Sie einen Server und starten",
    serverLabel: "Server",
    btnGo: "GO",
    btnCopy: "Ergebnis Kopieren",
    btnShare: "Teilen",
    adPlaceholder: "Gesponserte Netzwerk-Tool-Platzierung",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "Noch keine lokalen Tests vorhanden.",
    labelTesting: "Test läuft...",
    statusMeasuring: "Latenz und Durchsatz werden gemessen",
    statusCompleted: "Test abgeschlossen",
    btnAgain: "Erneut Ausführen",
    copyDone: "Kopiert",
    copyResultText: "GlobalPing Ergebnis: {down} Mbps Download, {up} Mbps Upload",
    topCountriesLabel: "Medianer Festnetz-Download",
    ipChecking: "Netzwerk wird überprüft...",
    ipLabelIP: "IP",
    ipLabelLocation: "Standort",
    ipLabelISP: "ISP",
    ipLabelProxy: "Proxy/VPN",
    ipNoSignal: "Kein Signal",
    ipError: "Die IP-Suche konnte die kostenlose API nicht erreichen. Versuchen Sie es über eine aktive Verbindung erneut.",
    pingTesting: "Test läuft...",
    pingResult: "{value} ms durchschnittliche HTTP-Latenz",
    adviceSlow: "Führen Sie einen kabelgebundenen Test durch, pausieren Sie Cloud-Backups und vergleichen Sie dann die DNS-Antwort über die Tools.",
    adviceConnect: "Starten Sie Modem und Router neu, prüfen Sie die WAN-Leuchte und testen Sie ein anderes Gerät, bevor Sie DNS ändern.",
    advicePing: "Wählen Sie die nächste Spiel-/Serverregion, schließen Sie Streaming-Apps und prüfen Sie WiFi-Kanalüberlastungen.",
    adviceDrops: "Wechseln Sie zu 5 GHz oder 6 GHz, verringern Sie die Entfernung zum Router und prüfen Sie überlappende Kanäle.",
    statusError: "Speedtest-Endpunkt nicht verfügbar. Bitte erneut versuchen.",
    historyUnavailable: "Nicht verfügbar",
    unitNA: "k.A.",
    rankSource: "Quelle: {source} · {status} · aktualisiert {updated}",
    vpnSpeed: "Geschwindigkeit",
    vpnSecurity: "Sicherheit",
    vpnSourceLabel: "Quelle:",
    ipUnknown: "Unbekannt",
    ipPossibleVPN: "Mögliches VPN",
    proxySource: "Quelle: {source} · {status} · {updated}",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Dunklere Punkte zeigen höhere mediane Download-Geschwindigkeiten im neuesten synchronisierten öffentlichen Datensatz."
  },
  ja: {
    navSpeed: "速度テスト", navTools: "ツール", navRank: "世界ランキング", navSec: "セキュリティ",
    heroTitle: "世界中どこでもインターネット速度をテスト。",
    heroLead: "GlobalPingは、ブラウザ速度テスト、世界国別ランキング、DNS設定ガイド、VPNレビュー、日常的なネットワーク診断を統合しています。",
    btnStart: "テスト開始", btnOpen: "ツールを開く",
    metricDown: "ダウンロード", metricUp: "アップロード", metricPing: "レイテンシ", metricJitter: "ジッター", metricLoss: "パケット損失",
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
    pageSpeedLead: "Cloudflare edge のダウンロード/アップロードテストを実行し、HTTPレイテンシを測定して、最新5件の結果をLocalStorageのみに保存します。",
    statusReady: "準備完了",
    statusStart: "サーバーを選択して開始",
    serverLabel: "サーバー",
    btnGo: "GO",
    btnCopy: "結果をコピー",
    btnShare: "共有",
    adPlaceholder: "AdSense 広告枠",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "まだローカルテストがありません。",
    labelTesting: "テスト中...",
    statusMeasuring: "レイテンシとスループットを測定中",
    statusCompleted: "テスト完了",
    btnAgain: "もう一度実行",
    copyDone: "コピーしました",
    copyResultText: "GlobalPing 結果: ダウンロード {down} Mbps / アップロード {up} Mbps",
    topCountriesLabel: "固定ブロードバンドの中央値ダウンロード",
    ipChecking: "ネットワークを確認中...",
    ipLabelIP: "IP",
    ipLabelLocation: "場所",
    ipLabelISP: "ISP",
    ipLabelProxy: "プロキシ/VPN",
    ipNoSignal: "信号なし",
    ipError: "IP 検索が無料 API に到達できませんでした。アクティブな接続から再試行してください。",
    pingTesting: "テスト中...",
    pingResult: "平均 HTTP レイテンシ {value} ms",
    adviceSlow: "有線速度テストを実行し、クラウドバックアップを一時停止してから、ツールキットから DNS 応答を比較してください。",
    adviceConnect: "モデムとルーターを再起動し、WAN ランプを確認してから、DNS を変更する前に別のデバイスをテストしてください。",
    advicePing: "最寄りのゲーム/サーバーリージョンを選択し、ストリーミングアプリを閉じて、WiFi チャネルの混雑を確認してください。",
    adviceDrops: "5 GHz または 6 GHz に移動し、ルーターまでの距離を縮めて、重複するチャネルを確認してください。",
    statusError: "速度テストエンドポイントが利用できません。もう一度お試しください。",
    historyUnavailable: "利用不可",
    unitNA: "該当なし",
    rankSource: "ソース: {source} · {status} · 更新 {updated}",
    vpnSpeed: "速度",
    vpnSecurity: "セキュリティ",
    vpnSourceLabel: "ソース:",
    ipUnknown: "不明",
    ipPossibleVPN: "可能性のある VPN",
    proxySource: "ソース: {source} · {status} · {updated}",
    "Download": "ダウンロード",
    "Upload": "アップロード",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "暗いノードは、最新の同期済み公開データセットで中央値ダウンロード速度が高いことを示します。"
  },
  zh: {
    navSpeed: "网速测试", navTools: "网络工具", navRank: "全球排名", navSec: "安全指南",
    heroTitle: "测试您在全球任何地方的互联网网速。",
    heroLead: "GlobalPing 聚合了浏览器轻量测速、全球国家网速排行、DNS设置指南、VPN/代理评测及日常网络故障排查工具。",
    btnStart: "开始网速测试", btnOpen: "打开工具箱",
    metricDown: "下载速度", metricUp: "上传速度", metricPing: "网络延迟", metricJitter: "抖动", metricLoss: "丢包率",
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
    pageSpeedLead: "运行 Cloudflare 边缘节点下载/上传测试，测量 HTTP 延迟，并将最近五次结果仅保存在 LocalStorage 中。",
    statusReady: "就绪",
    statusStart: "选择服务器并开始",
    serverLabel: "服务器",
    btnGo: "开始",
    btnCopy: "复制结果",
    btnShare: "分享",
    adPlaceholder: "赞助网络工具展示位",
    unitMbps: "Mbps",
    unitMs: "ms",
    historyEmpty: "暂无本地测试记录。",
    labelTesting: "测试中...",
    statusMeasuring: "正在测量延迟与吞吐量",
    statusCompleted: "测试完成",
    btnAgain: "再次运行",
    copyDone: "已复制",
    copyResultText: "GlobalPing 结果：下载 {down} Mbps，上传 {up} Mbps",
    topCountriesLabel: "固定宽带中位数下载",
    ipChecking: "正在检测您的网络...",
    ipLabelIP: "IP",
    ipLabelLocation: "位置",
    ipLabelISP: "ISP",
    ipLabelProxy: "代理/VPN",
    ipNoSignal: "无信号",
    ipError: "IP 查询无法访问免费 API，请在可用网络下重试。",
    pingTesting: "测试中...",
    pingResult: "平均 HTTP 延迟 {value} ms",
    adviceSlow: "运行有线速度测试，暂停云备份，然后使用工具箱对比 DNS 响应。",
    adviceConnect: "重启光猫和路由器，确认 WAN 指示灯，然后在更改 DNS 前测试其他设备。",
    advicePing: "选择最近的游戏/服务器区域，关闭流媒体应用，并检查 WiFi 信道拥堵。",
    adviceDrops: "切换到 5 GHz 或 6 GHz，缩短与路由器的距离，并检查信道重叠。",
    statusError: "速度测试端点不可用，请重试。",
    historyUnavailable: "不可用",
    unitNA: "不适用",
    rankSource: "来源：{source} · {status} · 更新于 {updated}",
    vpnSpeed: "速度",
    vpnSecurity: "安全性",
    vpnSourceLabel: "来源：",
    ipUnknown: "未知",
    ipPossibleVPN: "可能的 VPN",
    proxySource: "来源：{source} · {status} · {updated}",
    countryInsight: "{country} 属于 {region} 区域数据集，包含 ISP 估算和 12 个月趋势，便于用户比较与搜索落地页展示。",
  }
};


const textTranslations = {
  zh: {
    "Proxy & VPN Reviews": "代理与 VPN 评测",
    "Compare speed, privacy, price and use cases across leading providers.": "按速度、隐私、价格和使用场景比较主流服务商。",
    "Public WiFi Safety": "公共 WiFi 安全",
    "A practical checklist for airports, hotels, cafes and shared networks.": "适用于机场、酒店、咖啡馆和共享网络的实用检查清单。",
    "DNS Setup Guide": "DNS 设置指南",
    "Cloudflare, Google, Quad9 and encrypted DNS configuration steps.": "Cloudflare、Google、Quad9 与加密 DNS 的配置步骤。",
    "Troubleshooting": "网络故障排除",
    "Step-by-step diagnostics for slow browsing, high ping and WiFi drops.": "针对网页慢、高延迟和 WiFi 掉线的分步诊断。",
    "IP Lookup": "IP 查询",
    "Check public IP, geolocation, ISP and HTTP latency from your browser.": "在浏览器中检查公网 IP、地理位置、ISP 和 HTTP 延迟。",
    "Country Deep Dive": "国家深度分析",
    "Explore synced country metrics, ISP comparisons and 12-month network trends.": "查看同步后的国家指标、ISP 对比和 12 个月网络趋势。",
    "Free, global and privacy-aware network performance tools for everyone.": "面向全球用户的免费、隐私友好网络性能工具。",
    "Network Toolkit": "网络工具箱",
    "DNS Guide": "DNS 指南",
    "VPN Reviews": "VPN 评测",
    "Country Detail": "国家详情",
    "Trust": "信任与合规",
    "WiFi Safety": "WiFi 安全",
    "Privacy & Disclosure": "隐私与广告披露",
    "About & Privacy": "关于、隐私与广告披露",
    "About": "关于",
    "Privacy Policy": "隐私政策",
    "Ad Disclosure": "广告披露",
    "About GlobalPing": "关于 GlobalPing",
    "GlobalPing provides free, accurate and accessible network testing tools, rankings and security guidance for global internet users.": "GlobalPing 为全球互联网用户提供免费、准确且易用的网络测速工具、排名和安全指南。",
    "Contact:": "联系：",
    "Advertising Disclosure": "广告披露",
    "Global Internet Speed Rankings": "全球网速排名",
    "Compare average connection performance across leading territories with searchable fixed and mobile datasets.": "通过可搜索的固定宽带和移动网络数据集比较主要地区的平均连接表现。",
    "World speed heat view": "世界网速热力视图",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "颜色更深的节点表示最新同步公开数据集中位下载速度更高。",
    "Filters": "筛选",
    "Fixed Broadband": "固定宽带",
    "Mobile Network": "移动网络",
    "All Regions": "全部地区",
    "Asia": "亚洲",
    "Europe": "欧洲",
    "Americas": "美洲",
    "Middle East": "中东",
    "Loading source status...": "正在加载数据源状态...",
    "Rank": "排名",
    "Country": "国家",
    "Latency": "延迟",
    "Trend": "趋势",
    "Network Toolkit": "网络工具箱",
    "Browser-safe tools for identifying your public network, measuring HTTP latency and preparing common diagnostics.": "用于识别公网网络、测量 HTTP 延迟和准备常见诊断的浏览器安全工具。",
    "Show public IP, location and ISP from a free geolocation API.": "通过免费地理定位 API 显示公网 IP、位置和 ISP。",
    "Open Tool": "打开工具",
    "Ping Test": "Ping 测试",
    "Estimate latency with repeat HTTP requests from this browser.": "通过浏览器重复 HTTP 请求估算延迟。",
    "Port Check": "端口检查",
    "Proxy Check": "代理检查",
    "WiFi Analyzer": "WiFi 分析",
    "DNS Resolver": "DNS 解析器",
    "Your IP result": "你的 IP 结果",
    "Click IP Lookup to query ipapi.co from your browser.": "点击 IP 查询，从浏览器请求 ipapi.co。",
    "Network Troubleshooting": "网络故障排除",
    "Start with the symptom, then follow a tight diagnostic path before changing router or ISP settings.": "先选择症状，再按诊断路径排查，之后再调整路由器或 ISP 设置。",
    "Step 1: What's your issue?": "步骤 1：你遇到什么问题？",
    "Slow browsing": "网页加载慢",
    "Can't connect": "无法连接",
    "High ping": "高延迟",
    "WiFi drops": "WiFi 掉线",
    "Choose an issue to see the first recommended checks.": "选择问题后查看首轮推荐检查。",
    "Popular fixes": "常见修复",
    "Public WiFi Safety Guide": "公共 WiFi 安全指南",
    "Protect yourself on airports, hotels, cafes and conference networks before you open email or banking apps.": "在机场、酒店、咖啡馆和会议网络中，打开邮件或银行应用前先保护自己。",
    "Pre-flight checklist": "连接前检查清单",
    "Review VPNs": "查看 VPN",
    "Open Toolkit": "打开工具箱",
    "DNS Setup Guide": "DNS 设置指南",
    "Faster, safer and more private name resolution with public DNS, DoH and DoT configuration references.": "通过公共 DNS、DoH 与 DoT 配置参考获得更快、更安全、更私密的解析。",
    "Provider": "服务商",
    "Primary": "主 DNS",
    "Secondary": "备用 DNS",
    "DoH Endpoint": "DoH 端点",
    "Platform configuration": "平台配置",
    "Country speed profile": "国家网速画像",
    "Loading country data...": "正在加载国家数据...",
    "Fixed broadband, mobile speed, ISP comparison and 12-month trend signals.": "固定宽带、移动网速、ISP 对比和 12 个月趋势信号。",
    "Annual Change": "年度变化",
    "ISP comparison": "ISP 对比",
    "Rating": "评分",
    "12-month trend": "12 个月趋势",
    "Country insight": "国家洞察",
    "Loading regional network insight.": "正在加载区域网络洞察。",
    "HTTP Ping Test": "HTTP Ping 测试",
    "Measure average HTTP latency from your browser using repeat edge requests.": "通过重复边缘请求测量浏览器平均 HTTP 延迟。",
    "Start Test": "开始测试",
    "Proxy / VPN Check": "代理 / VPN 检测",
    "Run IP Lookup before and after connecting. Changes in country, ASN or ISP indicate the tunnel is active.": "连接前后运行 IP 查询；国家、ASN 或 ISP 变化表示隧道已生效。",
    "Check Current Network": "检查当前网络",
    "Compare VPN Providers": "比较 VPN 服务商",
    "Port Check Guide": "端口检查指南",
    "Checklist": "检查清单",
    "All": "全部",
    "Streaming": "流媒体",
    "Travel": "旅行",
    "Free / Paid": "免费 / 付费",
    "Proxy status board": "代理状态看板",
    "Synced feed": "同步数据源",
    "Location": "位置",
    "Type": "类型",
    "Status": "状态",
    "Download": "下载",
    "Upload": "上传"
  },
  es: {
    "Proxy & VPN Reviews": "Reseñas de Proxy y VPN",
    "Public WiFi Safety": "Seguridad WiFi Pública",
    "DNS Setup Guide": "Guía de DNS",
    "Troubleshooting": "Solución de Problemas",
    "IP Lookup": "Consulta IP",
    "Country Deep Dive": "Análisis por País",
    "Network Toolkit": "Herramientas de Red",
    "Privacy & Disclosure": "Privacidad y Divulgación",
    "About & Privacy": "Acerca de y Privacidad",
    "Privacy Policy": "Política de Privacidad",
    "Ad Disclosure": "Divulgación Publicitaria",
    "Global Internet Speed Rankings": "Ranking Global de Velocidad",
    "World speed heat view": "Mapa de calor de velocidad",
    "Filters": "Filtros",
    "Fixed Broadband": "Banda Ancha Fija",
    "Mobile Network": "Red Móvil",
    "All Regions": "Todas las Regiones",
    "Rank": "Rango",
    "Country": "País",
    "Latency": "Latencia",
    "Trend": "Tendencia",
    "Open Tool": "Abrir Herramienta",
    "Ping Test": "Prueba de Ping",
    "Port Check": "Comprobación de Puertos",
    "Proxy Check": "Comprobación de Proxy",
    "Your IP result": "Resultado de tu IP",
    "Network Troubleshooting": "Diagnóstico de Red",
    "Public WiFi Safety Guide": "Guía de WiFi Público",
    "Provider": "Proveedor",
    "Primary": "Primario",
    "Secondary": "Secundario",
    "Platform configuration": "Configuración por plataforma",
    "Country speed profile": "Perfil de velocidad del país",
    "Annual Change": "Cambio anual",
    "ISP comparison": "Comparación de ISP",
    "Rating": "Puntuación",
    "12-month trend": "Tendencia de 12 meses",
    "Country insight": "Información del país",
    "HTTP Ping Test": "Prueba HTTP Ping",
    "Start Test": "Iniciar Prueba",
    "Proxy / VPN Check": "Comprobación Proxy / VPN",
    "Port Check Guide": "Guía de Puertos",
    "Checklist": "Lista de verificación",
    "All": "Todo",
    "Streaming": "Streaming",
    "Travel": "Viajes",
    "Free / Paid": "Gratis / Pago",
    "Status": "Estado"
  },
  pt: {
    "Proxy & VPN Reviews": "Avaliações de Proxy e VPN",
    "Public WiFi Safety": "Segurança em WiFi público",
    "DNS Setup Guide": "Guia de configuração DNS",
    "Troubleshooting": "Solução de problemas",
    "IP Lookup": "Consulta de IP",
    "Country Deep Dive": "Análise por país",
    "Network Toolkit": "Ferramentas de rede",
    "Privacy & Disclosure": "Privacidade e divulgação",
    "Privacy Policy": "Política de privacidade",
    "Ad Disclosure": "Divulgação de anúncios",
    "Global Internet Speed Rankings": "Classificações globais de velocidade",
    "World speed heat view": "Mapa de calor de velocidade",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Nós mais escuros indicam maiores velocidades medianas de download no conjunto público sincronizado",
    "Filters": "Filtros",
    "Fixed Broadband": "Banda larga fixa",
    "Mobile Network": "Rede móvel",
    "All Regions": "Todas as regiões",
    "Rank": "Classificação",
    "Country": "País",
    "Latency": "Latência",
    "Trend": "Tendência",
    "Open Tool": "Abrir ferramenta",
    "Ping Test": "Teste de ping",
    "Port Check": "Verificação de porta",
    "Proxy Check": "Verificação de proxy",
    "Your IP result": "Resultado do seu IP",
    "Network Troubleshooting": "Diagnóstico de rede",
    "Public WiFi Safety Guide": "Guia de segurança em WiFi público",
    "Provider": "Provedor",
    "Primary": "Primário",
    "Secondary": "Secundário",
    "Platform configuration": "Configuração por plataforma",
    "Country speed profile": "Perfil de velocidade do país",
    "Annual Change": "Mudança anual",
    "ISP comparison": "Comparação de ISP",
    "Rating": "Avaliação",
    "12-month trend": "Tendência de 12 meses",
    "Country insight": "Insight do país",
    "HTTP Ping Test": "Teste HTTP Ping",
    "Start Test": "Iniciar teste",
    "Proxy / VPN Check": "Verificação Proxy / VPN",
    "Port Check Guide": "Guia de verificação de portas",
    "Checklist": "Lista de verificação",
    "All": "Todos",
    "Streaming": "Streaming",
    "Travel": "Viagem",
    "Free / Paid": "Grátis / Pago",
    "Status": "Status"
  },
  fr: {
    "Proxy & VPN Reviews": "Avis Proxy et VPN",
    "Public WiFi Safety": "Sécurité WiFi publique",
    "DNS Setup Guide": "Guide de configuration DNS",
    "Troubleshooting": "Dépannage",
    "IP Lookup": "Recherche IP",
    "Country Deep Dive": "Analyse par pays",
    "Network Toolkit": "Outils réseau",
    "Privacy & Disclosure": "Confidentialité et divulgation",
    "Privacy Policy": "Politique de confidentialité",
    "Ad Disclosure": "Divulgation publicitaire",
    "Global Internet Speed Rankings": "Classements mondiaux de vitesse",
    "World speed heat view": "Carte thermique mondiale",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Les points plus sombres indiquent des vitesses médianes de téléchargement plus élevées dans le dernier jeu de données public synchronisé",
    "Filters": "Filtres",
    "Fixed Broadband": "Haut débit fixe",
    "Mobile Network": "Réseau mobile",
    "All Regions": "Toutes les régions",
    "Rank": "Rang",
    "Country": "Pays",
    "Latency": "Latence",
    "Trend": "Tendance",
    "Open Tool": "Ouvrir l’outil",
    "Ping Test": "Test ping",
    "Port Check": "Vérification de port",
    "Proxy Check": "Vérification proxy",
    "Your IP result": "Résultat de votre IP",
    "Network Troubleshooting": "Dépannage réseau",
    "Public WiFi Safety Guide": "Guide de sécurité WiFi publique",
    "Provider": "Fournisseur",
    "Primary": "Primaire",
    "Secondary": "Secondaire",
    "Platform configuration": "Configuration par plateforme",
    "Country speed profile": "Profil de vitesse du pays",
    "Annual Change": "Variation annuelle",
    "ISP comparison": "Comparaison des FAI",
    "Rating": "Note",
    "12-month trend": "Tendance sur 12 mois",
    "Country insight": "Aperçu du pays",
    "HTTP Ping Test": "Test HTTP Ping",
    "Start Test": "Lancer le test",
    "Proxy / VPN Check": "Vérification Proxy / VPN",
    "Port Check Guide": "Guide de vérification des ports",
    "Checklist": "Liste de contrôle",
    "All": "Tous",
    "Streaming": "Streaming",
    "Travel": "Voyage",
    "Free / Paid": "Gratuit / Payant",
    "Status": "Statut"
  },
  de: {
    "Proxy & VPN Reviews": "Proxy- und VPN-Bewertungen",
    "Public WiFi Safety": "Sicherheit in öffentlichem WLAN",
    "DNS Setup Guide": "DNS-Einrichtungsanleitung",
    "Troubleshooting": "Fehlerbehebung",
    "IP Lookup": "IP-Abfrage",
    "Country Deep Dive": "Länderanalyse",
    "Network Toolkit": "Netzwerk-Tools",
    "Privacy & Disclosure": "Datenschutz und Offenlegung",
    "Privacy Policy": "Datenschutzerklärung",
    "Ad Disclosure": "Werbehinweis",
    "Global Internet Speed Rankings": "Globale Geschwindigkeitsrankings",
    "World speed heat view": "Weltweite Geschwindigkeitskarte",
    "Darker nodes indicate higher median download speeds from the latest synced public dataset.": "Dunklere Punkte zeigen höhere mediane Download-Geschwindigkeiten im neuesten synchronisierten öffentlichen Datensatz",
    "Filters": "Filter",
    "Fixed Broadband": "Festnetz-Breitband",
    "Mobile Network": "Mobilfunknetz",
    "All Regions": "Alle Regionen",
    "Rank": "Rang",
    "Country": "Land",
    "Latency": "Latenz",
    "Trend": "Trend",
    "Open Tool": "Tool öffnen",
    "Ping Test": "Ping-Test",
    "Port Check": "Port-Prüfung",
    "Proxy Check": "Proxy-Prüfung",
    "Your IP result": "Ihr IP-Ergebnis",
    "Network Troubleshooting": "Netzwerkdiagnose",
    "Public WiFi Safety Guide": "Leitfaden für öffentliches WLAN",
    "Provider": "Anbieter",
    "Primary": "Primär",
    "Secondary": "Sekundär",
    "Platform configuration": "Plattformkonfiguration",
    "Country speed profile": "Geschwindigkeitsprofil des Landes",
    "Annual Change": "Jährliche Änderung",
    "ISP comparison": "ISP-Vergleich",
    "Rating": "Bewertung",
    "12-month trend": "12-Monats-Trend",
    "Country insight": "Länder-Einblick",
    "HTTP Ping Test": "HTTP-Ping-Test",
    "Start Test": "Test starten",
    "Proxy / VPN Check": "Proxy- / VPN-Prüfung",
    "Port Check Guide": "Port-Prüfungsleitfaden",
    "Checklist": "Checkliste",
    "All": "Alle",
    "Streaming": "Streaming",
    "Travel": "Reisen",
    "Free / Paid": "Kostenlos / Bezahlt",
    "Status": "Status"
  },
  ja: {
    "Proxy & VPN Reviews": "プロキシとVPNレビュー",
    "Public WiFi Safety": "公共WiFi安全",
    "DNS Setup Guide": "DNS設定ガイド",
    "Troubleshooting": "トラブルシューティング",
    "IP Lookup": "IP検索",
    "Country Deep Dive": "国別詳細分析",
    "Network Toolkit": "ネットワークツール",
    "Privacy & Disclosure": "プライバシーと広告開示",
    "About & Privacy": "概要とプライバシー",
    "Privacy Policy": "プライバシーポリシー",
    "Ad Disclosure": "広告開示",
    "Global Internet Speed Rankings": "世界インターネット速度ランキング",
    "World speed heat view": "世界速度ヒートビュー",
    "Filters": "フィルター",
    "Fixed Broadband": "固定ブロードバンド",
    "Mobile Network": "モバイルネットワーク",
    "All Regions": "すべての地域",
    "Rank": "順位",
    "Country": "国",
    "Latency": "遅延",
    "Trend": "傾向",
    "Open Tool": "ツールを開く",
    "Ping Test": "Pingテスト",
    "Port Check": "ポート確認",
    "Proxy Check": "プロキシ確認",
    "Your IP result": "IP結果",
    "Network Troubleshooting": "ネットワーク診断",
    "Public WiFi Safety Guide": "公共WiFi安全ガイド",
    "Provider": "プロバイダー",
    "Primary": "プライマリ",
    "Secondary": "セカンダリ",
    "Platform configuration": "プラットフォーム設定",
    "Country speed profile": "国別速度プロフィール",
    "Annual Change": "年間変化",
    "ISP comparison": "ISP比較",
    "Rating": "評価",
    "12-month trend": "12か月トレンド",
    "Country insight": "国別インサイト",
    "HTTP Ping Test": "HTTP Pingテスト",
    "Start Test": "テスト開始",
    "Proxy / VPN Check": "プロキシ / VPN確認",
    "Port Check Guide": "ポート確認ガイド",
    "Checklist": "チェックリスト",
    "All": "すべて",
    "Streaming": "ストリーミング",
    "Travel": "旅行",
    "Free / Paid": "無料 / 有料",
    "Status": "状態"
  }
};

function applyTextTranslations(lang) {
  const map = textTranslations[lang] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT", "OPTION"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      const text = node.textContent.trim();
      if (!text || !/[A-Za-z]/.test(text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.__globalpingSourceText) node.__globalpingSourceText = node.textContent.trim();
    const source = node.__globalpingSourceText;
    const next = lang === "en" ? source : (map[source] || source);
    const leading = node.textContent.match(/^\s*/)?.[0] || "";
    const trailing = node.textContent.match(/\s*$/)?.[0] || "";
    node.textContent = leading + next + trailing;
  });
}

// 支持的语言列表
const supportedLangs = ["en", "zh", "es", "pt", "fr", "de", "ja"];
const langNames = { en: "EN", zh: "中文", es: "ES", pt: "PT", fr: "FR", de: "DE", ja: "JA" };
let currentLang = "en";

function t(key, fallback = "") {
  return (langData[currentLang] && langData[currentLang][key]) ||
         (langData.en && langData.en[key]) ||
         fallback;
}

function initLanguage() {
  const requestedLang = new URLSearchParams(location.search).get("lang");
  currentLang = supportedLangs.includes(requestedLang) ? requestedLang : localStorage.getItem("globalping-lang");
  if (!currentLang || !supportedLangs.includes(currentLang)) {
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
    applyTextTranslations(lang);
    localStorage.setItem("globalping-lang", lang);
  };

  $$("[data-lang-select]").forEach((select) => {
    select.value = currentLang;
    select.addEventListener("change", () => {
      currentLang = select.value;
      $$("[data-lang-select]").forEach((item) => item.value = currentLang);
      applyLanguage(currentLang);
      renderHistory();
      renderRankings().catch(console.error);
      hydrateDataLists().catch(console.error);
      renderCountryDetail().then(() => applyTextTranslations(currentLang)).catch(console.error);
    });
  });
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

async function measureLatency(traceEndpoint = "https://www.cloudflare.com/cdn-cgi/trace") {
  const url = `${traceEndpoint}?t=${Date.now()}`;
  const attempts = [];
  for (let i = 0; i < 3; i += 1) {
    const started = performance.now();
    try {
      await fetch(url, { cache: "no-store", mode: "no-cors" });
      attempts.push(performance.now() - started);
    } catch {
      attempts.push(null);
    }
  }
  const valid = attempts.filter((value) => Number.isFinite(value));
  const loss = Math.round(((attempts.length - valid.length) / attempts.length) * 100);
  if (!valid.length) return { ping: 0, jitter: 0, loss: 100 };
  const ping = valid.reduce((a, b) => a + b, 0) / valid.length;
  const jitter = valid.reduce((sum, value) => sum + Math.abs(value - ping), 0) / valid.length;
  return { ping: Math.round(ping), jitter: Math.round(jitter), loss };
}

async function measureDownload(endpoint, bytes, onProgress) {
  const started = performance.now();
  const res = await fetch(`${endpoint}?bytes=${bytes}&cacheBust=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Download endpoint returned ${res.status}`);
  const reader = res.body?.getReader();
  if (!reader) {
    const buffer = await res.arrayBuffer();
    const seconds = (performance.now() - started) / 1000;
    return (buffer.byteLength * 8) / seconds / 1000000;
  }
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    const seconds = Math.max((performance.now() - started) / 1000, 0.05);
    onProgress?.((received * 8) / seconds / 1000000);
  }
  const seconds = (performance.now() - started) / 1000;
  return (received * 8) / seconds / 1000000;
}

async function measureUpload(endpoint, bytes) {
  const body = new Uint8Array(bytes);
  for (let offset = 0; offset < body.length; offset += 65536) {
    crypto.getRandomValues(body.subarray(offset, Math.min(offset + 65536, body.length)));
  }
  const started = performance.now();
  const res = await fetch(`${endpoint}?cacheBust=${Date.now()}`, {
    method: "POST",
    body,
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`Upload endpoint returned ${res.status}`);
  const seconds = (performance.now() - started) / 1000;
  return (bytes * 8) / seconds / 1000000;
}

async function runSpeedTest() {
  const btn = $("[data-start-test]");
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  btn.textContent = t("labelTesting", "Testing...");
  const status = $("[data-test-status]");
  if (status) status.textContent = t("statusMeasuring", "Measuring latency and throughput");
  const speedConfig = await loadJSON("data/speed-nodes.json");
  const selected = $("[data-speed-node]")?.value || "auto";
  const node = speedConfig.nodes.find((item) => item.id === selected) || speedConfig.nodes[0];
  let download = 0;
  let upload = 0;
  let ping = 0;
  let jitter = 0;
  try {
    const latency = await measureLatency(speedConfig.traceEndpoint);
    ping = latency.ping;
    jitter = latency.jitter;
    var loss = latency.loss;
    download = await measureDownload(speedConfig.downloadEndpoint, node.downloadBytes, setGauge);
    setGauge(download);
    try {
      upload = await measureUpload(speedConfig.uploadEndpoint, node.uploadBytes);
    } catch (error) {
      console.warn("Upload test unavailable", error);
      upload = 0;
    }
  } catch (error) {
    console.error(error);
    if (status) status.textContent = t("statusError", "Speed test endpoint unavailable. Please try again.");
    btn.disabled = false;
    btn.textContent = t("btnAgain", "Run Again");
    return;
  }
  const result = {
    date: new Date().toLocaleString(),
    download: Number(fmt(download, 1)),
    upload: Number(fmt(upload, 1)),
    ping,
    jitter,
    loss,
    node: node.label
  };
  $$("[data-metric]").forEach((el) => {
    const key = el.dataset.metric;
    if (result[key] !== undefined) el.textContent = result[key];
  });
  const history = JSON.parse(localStorage.getItem("globalping-history") || "[]");
  history.unshift(result);
  localStorage.setItem("globalping-history", JSON.stringify(history.slice(0, 5)));
  renderHistory();
  if (status) status.textContent = t("statusCompleted", "Test completed");
  btn.disabled = false;
  btn.textContent = t("btnAgain", "Run Again");
}

function renderHistory() {
  const body = $("[data-history]");
  if (!body) return;
  const history = JSON.parse(localStorage.getItem("globalping-history") || "[]");
  const unitSpeed = t("unitMbps", "Mbps");
  const unitLatency = t("unitMs", "ms");
  const unavailable = t("historyUnavailable", "Unavailable");
  body.innerHTML = history.length ? history.map((item) => `
    <tr>
      <td>${item.date}</td>
      <td>${item.download} ${unitSpeed}</td>
      <td>${item.upload ? `${item.upload} ${unitSpeed}` : unavailable}</td>
      <td>${item.ping} ${unitLatency}</td>
      <td>${item.jitter} ${unitLatency}</td>
    </tr>`).join("") : `<tr><td colspan="5">${t("historyEmpty", "No local tests yet.")}</td></tr>`;
}

async function renderRankings() {
  const table = $("[data-rankings]");
  const topCountries = $("[data-top-countries]");
  if (!table && !topCountries) return;
  const data = await loadJSON("data/rankings.json");
  const sourceEl = $("[data-ranking-source]");
  if (sourceEl) {
    const source = data.source || "public network dataset";
    const status = data.sourceStatus || "synced";
    sourceEl.textContent = t("rankSource", "Source: {source} · {status} · updated {updated}")
      .replace("{source}", source).replace("{status}", status).replace("{updated}", data.updated);
  }
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
    const unitSpeed = t("unitMbps", "Mbps");
    const unitLatency = t("unitMs", "ms");
    const na = t("unitNA", "N/A");
    table.innerHTML = rows.map((row) => `
      <tr>
        <td class="mono">#${row.rank}</td>
        <td><strong>${flag(row.flag)} ${row.country}</strong><div class="fine">${row.region}</div></td>
        <td><strong>${row.download} ${unitSpeed}</strong><div class="bar"><span style="width:${Math.min(row.download / 420 * 100, 100)}%"></span></div></td>
        <td>${Number.isFinite(Number(row.upload)) ? `${row.upload} ${unitSpeed}` : na}</td>
        <td>${Number.isFinite(Number(row.latency)) ? `${row.latency} ${unitLatency}` : na}</td>
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
      <p class="fine">${t("topCountriesLabel", "Median fixed broadband download")}</p>
    </article>`).join("");
}

async function renderCountryDetail() {
  const select = $("[data-country-select]");
  if (!select) return;
  const data = await loadJSON("data/countries.json");
  const countries = data.countries || [];
  const params = new URLSearchParams(location.search);
  const requested = params.get("country") || params.get("c") || "Singapore";
  if (!select.dataset.ready) {
    select.innerHTML = countries.map((item) => `<option value="${item.country}">${item.flag} ${item.country}</option>`).join("");
    select.addEventListener("change", () => {
      const url = new URL(location.href);
      url.searchParams.set("country", select.value);
      history.replaceState(null, "", url);
      drawCountry(countries.find((item) => item.country === select.value) || countries[0], data.updated);
    });
    select.dataset.ready = "true";
  }
  const country = countries.find((item) => item.country.toLowerCase() === requested.toLowerCase()) || countries[0];
  select.value = country.country;
  drawCountry(country, data.updated);
}

function drawCountry(country, updated) {
  if (!country) return;
  const unitSpeed = t("unitMbps", "Mbps");
  const unitLatency = t("unitMs", "ms");
  const title = $("[data-country-title]");
  if (title) title.textContent = `${country.flag} ${country.country}`;
  const crumb = $("[data-country-breadcrumb]");
  if (crumb) crumb.textContent = country.country;
  const lead = $("[data-country-lead]");
  if (lead) lead.textContent = `${country.country} scores ${country.score}/10 with ${country.fixedDownload} ${unitSpeed} fixed broadband and ${country.mobileDownload} ${unitSpeed} mobile median download signals.`;
  const updatedEl = $("[data-country-updated]");
  if (updatedEl) updatedEl.textContent = `Dataset updated ${updated} · ${country.region}`;
  const fixed = $("[data-country-fixed]");
  if (fixed) fixed.textContent = `${country.fixedDownload} ${unitSpeed}`;
  const mobile = $("[data-country-mobile]");
  if (mobile) mobile.textContent = `${country.mobileDownload} ${unitSpeed}`;
  const latency = $("[data-country-latency]");
  if (latency) latency.textContent = `${country.latency} ${unitLatency}`;
  const change = $("[data-country-change]");
  if (change) change.textContent = `${country.annualChange > 0 ? "+" : ""}${country.annualChange}%`;
  const isp = $("[data-country-isp]");
  if (isp) {
    isp.innerHTML = country.isps.map((row) => `<tr><td>${row.name}</td><td>${row.download} ${unitSpeed}</td><td>${row.upload} ${unitSpeed}</td><td>${row.rating}/5</td></tr>`).join("");
  }
  const trend = $("[data-country-trend]");
  if (trend) {
    const max = Math.max(...country.trend.map((row) => row.download), 1);
    trend.innerHTML = country.trend.map((row) => `<div><span class="fine">${row.month}</span><div class="bar"><span style="width:${Math.round(row.download / max * 100)}%"></span></div><strong>${row.download} ${unitSpeed}</strong></div>`).join("");
  }
  const insight = $("[data-country-insight]");
  if (insight) insight.textContent = t("countryInsight", "{country} is tracked in the {region} cohort with ISP-level estimates and rolling 12-month speed trend data for search landing pages and user comparison.").replace("{country}", country.country).replace("{region}", country.region);
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
        <div class="fine">${t("vpnSpeed", "Speed")}</div><div class="bar"><span style="width:${item.speed}%"></span></div>
        <div class="fine">${t("vpnSecurity", "Security")}</div><div class="bar"><span style="width:${item.security}%"></span></div>
        <p class="fine">${t("vpnSourceLabel", "Source:")} <a href="${item.source}" target="_blank" rel="noreferrer">${item.sourceStatus || t("ipUnknown", "Unknown")}</a></p>
      </article>`).join("");
  }
  const proxyBody = $("[data-proxy-list]");
  if (proxyBody) {
    const rows = await loadJSON("data/proxy-list.json");
    proxyBody.innerHTML = rows.map((item) => `
      <tr><td class="mono">${item.ip}</td><td>${item.location}</td><td>${item.type}</td><td>${item.speed}</td><td>${item.status}</td></tr>`).join("");
    const sync = await loadJSON("data/sync_state.json").catch(() => null);
    const proxySource = $("[data-proxy-source]");
    if (proxySource && sync?.sources?.proxies) {
      proxySource.textContent = t("proxySource", "Source: {source} · {status} · {updated}")
        .replace("{source}", sync.sources.proxies.source)
        .replace("{status}", sync.sources.proxies.status)
        .replace("{updated}", sync.updated);
    }
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
  target.innerHTML = t("ipChecking", "Checking your network...");
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    target.innerHTML = `
      <div class="grid grid-4">
        <div class="metric card"><span class="fine">${t("ipLabelIP", "IP")}</span><b class="mono">${data.ip || t("ipUnknown", "Unknown")}</b></div>
        <div class="metric card"><span class="fine">${t("ipLabelLocation", "Location")}</span><b>${data.city || "-"}, ${data.country_name || "-"}</b></div>
        <div class="metric card"><span class="fine">${t("ipLabelISP", "ISP")}</span><b>${data.org || t("ipUnknown", "Unknown")}</b></div>
        <div class="metric card"><span class="fine">${t("ipLabelProxy", "Proxy/VPN")}</span><b>${data.security?.vpn ? t("ipPossibleVPN", "Possible VPN") : t("ipNoSignal", "No signal")}</b></div>
      </div>`;
  } catch {
    target.innerHTML = t("ipError", "IP lookup could not reach the free API. Try again from a live connection.");
  }
}

async function initSpeedNodes() {
  const select = $("[data-speed-node]");
  if (!select) return;
  const config = await loadJSON("data/speed-nodes.json");
  select.innerHTML = config.nodes.map((node) => `<option value="${node.id}">${node.label}</option>`).join("");
  const source = $("[data-speed-source]");
  if (source) source.textContent = `${config.provider} · ${config.sourceStatus || "configured"} · ${config.updated}`;
}

async function runPingTool() {
  const result = $("[data-ping-result]");
  if (!result) return;
  result.textContent = t("pingTesting");
  const latency = await measureLatency();
  result.textContent = t("pingResult").replace("{value}", latency.ping);
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
  $$("[data-issue]").forEach((btn) => btn.addEventListener("click", () => {
    output.textContent = t(`advice${btn.dataset.issue[0].toUpperCase()}${btn.dataset.issue.slice(1)}`);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  setGauge(0);
  renderHistory();
  renderRankings().catch(console.error);
  hydrateDataLists().catch(console.error);
  renderCountryDetail().then(() => applyTextTranslations(currentLang)).catch(console.error);
  initSpeedNodes().catch(console.error);
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
    const down = $("[data-metric='download']")?.textContent || 0;
    const up = $("[data-metric='upload']")?.textContent || 0;
    const text = t("copyResultText").replace("{down}", down).replace("{up}", up);
    await navigator.clipboard?.writeText(text);
    copy.textContent = t("copyDone");
  });
});
