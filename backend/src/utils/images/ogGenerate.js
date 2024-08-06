const puppeteer = require("puppeteer");
const ogTemplate = require("../template/ogTemplate");

async function generateOgImage(title, content, image) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(ogTemplate("medial_username_1", title, content, image));
  const screenshot = await page.screenshot({ type: "webp" });
  await browser.close();
  return screenshot;
}
module.exports = generateOgImage;