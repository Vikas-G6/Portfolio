// Builds optimized portrait assets from the original photos in the project root.
// Portrait.png = source photo (white background).
// The script removes the background using alpha channel compositing and exports WebP sizes + OG image.
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

// Use Portrait.png as the source (white-bg passport style photo)
const src = existsSync('Portrait.png') ? 'Portrait.png' : (existsSync('pic1.jpeg') ? 'pic1.jpeg' : null);
if (!src) {
  console.error('No source portrait found. Place Portrait.png in the project root.');
  process.exit(1);
}

const hi = sharp(src);
const { width, height } = await hi.metadata();

let cutout;
if (existsSync('pic.png')) {
  // Legacy: use background-removed cutout mask from pic.png
  const alpha = await sharp('pic.png')
    .ensureAlpha()
    .extractChannel('alpha')
    .resize(width, height, { kernel: 'lanczos3' })
    .blur(0.8)
    .raw()
    .toBuffer();

  const rgb = await sharp(src).removeAlpha().raw().toBuffer();
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = rgb[i * 3];
    rgba[i * 4 + 1] = rgb[i * 3 + 1];
    rgba[i * 4 + 2] = rgb[i * 3 + 2];
    rgba[i * 4 + 3] = alpha[i];
  }
  cutout = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
} else {
  // No mask: use the photo as-is (white background will show — fine for passport photos)
  cutout = await sharp(src).png().toBuffer();
}

for (const w of [1100, 720, 420]) {
  await sharp(cutout).resize({ width: w }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/portrait-${w}.webp`);
}

// Social share image (1200x630) — RPG / gaming aesthetic: forge gold on near-black
const portrait = await sharp(cutout).resize({ height: 580 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#080706' } })
  .composite([
    // Warm forge-gold radial glow on the right
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="78%" cy="45%" r="48%">
            <stop offset="0" stop-color="#d4820a" stop-opacity="0.42"/>
            <stop offset="1" stop-color="#d4820a" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="glow2" cx="20%" cy="80%" r="40%">
            <stop offset="0" stop-color="#c0392b" stop-opacity="0.18"/>
            <stop offset="1" stop-color="#c0392b" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#glow)"/>
        <rect width="1200" height="630" fill="url(#glow2)"/>
      </svg>`),
    },
    // Subtle scanline texture
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({ length: 63 }, (_, i) =>
          `<line x1="0" y1="${i * 10}" x2="1200" y2="${i * 10}" stroke="white" stroke-opacity="0.018" stroke-width="1"/>`
        ).join('')}
      </svg>`),
    },
    { input: portrait, gravity: 'southeast' },
    // Text layer
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <text x="72" y="280" font-family="Impact, 'Arial Narrow', sans-serif" font-size="122" fill="#f0ede8" letter-spacing="4">VIKAS</text>
        <text x="78" y="338" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="28" fill="#d4820a" letter-spacing="14">THE BUILD</text>
        <text x="78" y="400" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="17" fill="#a8a49c" letter-spacing="5">JAVA FULL STACK  •  SPRING BOOT  •  AWS</text>
        <line x1="72" y1="310" x2="480" y2="310" stroke="#d4820a" stroke-width="2" stroke-opacity="0.6"/>
      </svg>`),
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(`${OUT}/og-image.jpg`);

console.log('✓ Images built → public/assets/');
