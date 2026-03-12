const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  const dir = path.join('/Users/hammamsawalma/.gemini/antigravity/brain/5d3e96c1-adcf-4365-99b7-61289b229143');

  console.log('Capturing Arabic version...');
  await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle' });
  // Wait for 3D canvas to init
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, 'hero_ar_split.png'), fullPage: false });

  console.log('Capturing English version...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, 'hero_en_split.png'), fullPage: false });

  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
