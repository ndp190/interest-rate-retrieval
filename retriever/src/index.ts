import puppeteer from 'puppeteer';

const banks = ["ACB", "VCB", "Techcombank", "MbBank"];

async function scrapeBankInterest(bankName: string) {
  const searchQuery = `Lãi suất ngân hàng ${bankName}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    await page.waitForSelector('h3'); // Wait for the search results to load

    const firstResult = await page.$('h3');
    if (firstResult) {
      await firstResult.click();

      await page.waitForNavigation({ waitUntil: 'load' });

      const htmlContent = await page.content();

      // Save the HTML content to a file
      const fs = require('fs');
      fs.writeFileSync(`output/${bankName}.html`, htmlContent);

      console.log(`Downloaded content for ${bankName}`);
    }
  } catch (error) {
    console.error(`Failed to scrape for ${bankName}: `, error);
  } finally {
    await browser.close();
  }
}

(async () => {
  const fs = require('fs');
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }

  for (const bank of banks) {
    await scrapeBankInterest(bank);
  }
})();
