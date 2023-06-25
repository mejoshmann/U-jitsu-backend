const puppeteer = require("puppeteer");

const grapplingInfo = {
  url: "https://grapplingindustries.smoothcomp.com/en/event/9408",

  async scrapeWebsite() {
    try {
      // Launch a headless browser instance
      const browser = await puppeteer.launch();

      // Create a new page
      const page = await browser.newPage();

      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);

      // Wait for the required DOM to be rendered
      await page.waitForSelector(".content");

      // Scrape the desired information
      const dataObj = await page.evaluate(() => {
        const titleElement = document.querySelector("h1");
        const dateLocationElement = document.querySelector(
          ".information p:nth-child(2)"
        );

        return {
          title: titleElement ? titleElement.textContent.trim() : "",
          dateLocation: dateLocationElement
            ? dateLocationElement.textContent.trim()
            : "",
        };
      });

      console.log(dataObj);

      // Close the browser instance
      await browser.close();
    } catch (error) {
      console.error("An error occurred while scraping:", error);
    }
  },
};

module.exports = grapplingInfo;
