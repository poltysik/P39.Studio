const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await page.goto("http://127.0.0.1:3002/", { waitUntil: "networkidle" });
  await page.locator('button[aria-label="Switch language"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "p39-ru.png" });

  await page.locator('button[aria-label="Switch theme"]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "p39-light.png" });

  await page.getByRole("button", { name: /Начать проект|Start Project/ }).first().click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "p39-terminal.png" });

  await browser.close();
})();
