const puppeteer = require("puppeteer");

async function grapplingInfo() {
  const urls = [ 
                "https://grapplingindustries.smoothcomp.com/en/event/9408",
                "https://adcc.smoothcomp.com/en/event/11951",
];

  const scrapedData = [];

    try {
      const browser = await puppeteer.launch({
        headless: "new",
      });


      for (const url of urls) {
        console.log(`Navigation to ${url}...`);

      
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector(".content");

      const dataObj = await page.evaluate(() => {
        const titleElement = document.querySelector("h1");
        const locationElement = document.querySelector("div.information p");
        const dateElement = document.querySelector("div.date");
        const daysLeftElement = document.querySelector("div.days muted span");
      
        const title = titleElement ? titleElement.textContent.trim() : "";
        const location = locationElement ? locationElement.textContent.trim() : "";
        const date = dateElement ? dateElement.textContent.trim() : "";
        const daysLeft = daysLeftElement ? daysLeftElement.textContent.trim() : "";
      
        return {
          title,
          location,
          date,
          daysLeft,
        };
      });
      scrapedData.push(dataObj);
    }
      

      await browser.close();
    } catch (error) {
      console.error("An error occurred while scraping:", error);
      throw error;
    }

  return scrapedData;
}

module.exports = grapplingInfo;
