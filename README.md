# Puppet Tutorial 🐾

A Node.js tutorial project demonstrating features like Puppeteer automation, server-side pagination, and more.

---

## 📁 Project Structure




🧠 What is Puppeteer?
Puppeteer is a Node.js library that provides a high-level API to control headless browsers (like Chrome or Chromium) using JavaScript.

👉 Think of it as a way to automate a browser — like a robot that can open web pages, click buttons, take screenshots, or extract information — without you doing anything manually.

🔧 What Can Puppeteer Do?
Here are common things Puppeteer is used for:

🛠️ Use Case	💡 Description
🖼️ Take screenshots	Capture images of web pages (for testing, previews, etc.)
📝 Web scraping	Extract content from websites (titles, prices, links, etc.)
🧪 Automated testing	Test websites automatically without a browser UI
📄 Generate PDFs	Convert any webpage into a downloadable PDF
🔐 Auto login / form fill	Simulate typing and filling forms (like a real user)
🧭 Navigate like a user	Click buttons, go to next pages, wait for loading, etc.

🧪 Example: Take Screenshot of Google
js
Copy code
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(); // opens Chromium
  const page = await browser.newPage();     // opens new tab
  await page.goto('https://google.com');    // visits Google
  await page.screenshot({ path: 'google.png' }); // takes screenshot
  await browser.close();                    // closes browser
})();
This script opens Google in a headless browser, takes a screenshot, and saves it as google.png.

🎯 When Should You Use Puppeteer?
You want to scrape websites that require JavaScript to load content

You need to automate UI actions (like clicking, typing, uploading)

You're building a web testing tool

You want to generate PDF reports from webpages

You want to simulate a real user browsing

⚙️ Puppeteer vs Other Tools
Tool	Focus	Headless Browser Support
Puppeteer	Full browser automation	Chrome / Chromium
Cheerio	Static HTML scraping	❌ No browser
Selenium	UI Testing (multi-browser)	✅ Chrome, Firefox, etc.
Playwright	Advanced cross-browser	✅ Chrome, Firefox, WebKit

you can also do things like:

Auto-login to a site

Scrape product prices

Fill a form and submit


puppet-tutorial/
├── index.js
├── class.js
├── exp.js
├── hey.js
├── package.json
└── node_modules/



🧠 Notes
This is a learning/tutorial project

Contributions or suggestions are welcome!