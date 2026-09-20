/* Renders assets/og-image.jpg (1200×630 link preview) and assets/logo.webp
   (160px raster for the 40px nav / 36px footer slots) from assets/logo.png.

   Not part of the build; run it only when the logo or the tagline changes:

     npm i --no-save sharp
     node tools/og-image.js

   The brand fonts are pulled from the Google Fonts repo into a temp dir and
   handed to libvips through fontconfig. Without that step the text falls back
   to whatever sans-serif the OS has. */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');

const root = path.join(__dirname, '..');
const fontDir = path.join(os.tmpdir(), 'kavyro-og-fonts');
const FONTS = {
  'Montserrat.ttf':      'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf',
  'Poppins-Regular.ttf': 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf',
  'Poppins-Medium.ttf':  'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Medium.ttf'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error(url + ' -> ' + res.statusCode));
      res.pipe(fs.createWriteStream(dest)).on('finish', resolve).on('error', reject);
    }).on('error', reject);
  });
}

async function ensureFonts() {
  fs.mkdirSync(fontDir, { recursive: true });
  for (const [name, url] of Object.entries(FONTS)) {
    const dest = path.join(fontDir, name);
    if (!fs.existsSync(dest)) await download(url, dest);
  }
  const conf = path.join(fontDir, 'fonts.conf');
  const dir = fontDir.split(path.sep).join('/');
  fs.writeFileSync(conf,
    '<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig>\n' +
    `  <dir>${dir}</dir>\n  <cachedir>${dir}/cache</cachedir>\n</fontconfig>\n`);
  // Must be set before sharp (and so libvips) is first required.
  process.env.FONTCONFIG_FILE = conf;
}

(async () => {
  await ensureFonts();
  const sharp = require('sharp');

  const W = 1200, H = 630;
  const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d3d73"/>
      <stop offset="0.6" stop-color="#1658a1"/>
      <stop offset="1" stop-color="#1d78c4"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.55">
      <stop offset="0" stop-color="#54c8da" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#54c8da" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g font-family="Montserrat" fill="#ffffff">
    <text x="470" y="262" font-size="92" font-weight="800" letter-spacing="2">KAVYRO</text>
    <text x="474" y="308" font-size="26" font-weight="600" letter-spacing="9" fill="#54c8da">SOLUTIONS</text>
  </g>
  <g font-family="Poppins">
    <text x="472" y="372" font-size="30" font-weight="500" fill="#ffffff">AI-Driven Digital Agency</text>
    <text x="472" y="416" font-size="19" fill="#ffffff" fill-opacity="0.78">Digital Marketing  ·  SEO  ·  Web Design  ·  Video  ·  Virtual Assistants</text>
  </g>
  <rect x="472" y="448" width="64" height="4" rx="2" fill="#54c8da"/>
  <text x="472" y="490" font-family="Poppins" font-size="20" font-weight="500" fill="#54c8da">kavyrosolutions.com</text>
</svg>`);

  // The logo file carries its own white ground, so it is rounded with a mask
  // rather than sat on a drawn card.
  const size = 300, r = 32;
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`);
  const card = await sharp(path.join(root, 'assets/logo.png'))
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const shadow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size + 80}" height="${size + 80}"><defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter></defs><rect x="40" y="52" width="${size}" height="${size}" rx="${r}" fill="#061e3a" fill-opacity="0.55" filter="url(#b)"/></svg>`);

  const cardX = 110, cardY = 165;
  await sharp(bg)
    .composite([
      { input: shadow, left: cardX - 40, top: cardY - 40 },
      { input: card, left: cardX, top: cardY }
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, 'assets/og-image.jpg'));

  await sharp(path.join(root, 'assets/logo.png'))
    .resize(160, 160)
    .webp({ quality: 82 })
    .toFile(path.join(root, 'assets/logo.webp'));

  console.log('wrote assets/og-image.jpg and assets/logo.webp');
})().catch(err => { console.error(err); process.exit(1); });
