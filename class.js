import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance with full-screen settings
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      "--start-maximized", // Start the browser maximized
      "--window-size=1920,1080" // Set specific dimensions (adjust if needed)
    ],
    userDataDir: "./tmp"
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a URL
  await page.goto('https://www.amazon.com/s?k=amazon+basics&page=7');
  // Wait for the page to fully load
   waituntil: "load"
  // Optionally, set specific viewport dimensions (if needed)
  await page.setViewport({
    width: 1300,
    height: 1080
  });
  // Using page.$()
  const is_disabled = await page.$('.s-pagination-item.s-pagination-next.s-pagination-disabled ') !== null;
 console.log(is_disabled);

})();
