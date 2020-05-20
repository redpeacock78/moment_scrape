const puppeteer = require("puppeteer");

const arg: string = process.argv[2];

if (arg === "-h" || arg === "--help") {
  console.log("Usage: moment_url [-h,--help][URL]");
} else if (arg == null) {
  console.log("Usage: moment_url [-h,--help][URL]");
} else {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; Touch; rv:11.0) like Gecko";
    const page = await browser.newPage();
    await page.setUserAgent(ua);
    const url: string = arg;
    await page.goto(url);

    const selecter =
      "div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.original-tweet.js-original-tweet.has-cards.has-content > div.content > div.stream-item-header > small";
    const html: string = await page.$$eval(selecter, (items) =>
      items
        .map((item) => item.innerHTML)
        .join("")
        .replace(/\n+/g, "\n")
        .replace(/ {2}<a href="/g, "https://twitter.com")
        .replace(/" class.*/g, "")
        .trim()
    );

    console.log(html);

    await browser.close();
  })();
}
