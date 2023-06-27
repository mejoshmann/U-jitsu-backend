const pageScraper = require("../scraper/independentPageScraper");
const pageScraper = require("./scrape")

async function scrapeAll(browserInstance, scraper) {
  let browser;
  try {
    browser = await browserInstance;
    await scraperAll(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = scrapeAll;