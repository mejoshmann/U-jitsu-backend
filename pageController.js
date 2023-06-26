const pageScraper = require("../scraper/independentPageScraper");

async function scrapeAll(browserInstance, scraper) {
  let browser;
  try {
    browser = await browserInstance;
    await scraper.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = scrapeAll;