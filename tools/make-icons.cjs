// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、家と時計（家族と相続の期限）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M12 52 L44 24 L76 52 V84 H12 Z" fill="#fffdf7"/><rect x="36" y="62" width="16" height="22" fill="#8fb8de"/><rect x="20" y="58" width="11" height="11" fill="#8fb8de"/><rect x="57" y="58" width="11" height="11" fill="#8fb8de"/><circle cx="80" cy="30" r="14" fill="#f2a43a"/><path d="M80 22 V30 L86 34" stroke="#123554" stroke-width="3" fill="none"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
