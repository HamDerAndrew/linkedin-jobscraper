const puppeteer = require('puppeteer');
require('dotenv').config({path: './config/env.env' });

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://dk.linkedin.com/');
  await page.setViewport({
    width: 1200,
    height: 800
});

  // Login
  const loginEmail = await page.$('#session_key');
  const loginPass = await page.$('#session_password');
  const loginButton = await page.$('.sign-in-form__submit-button')
  await loginEmail.click();
  await page.keyboard.type(process.env.EMAIL);
  await loginPass.click();
  await page.keyboard.type(process.env.PASSWORD);
  await loginButton.click();
  await page.waitForNavigation({waitUntil: 'domcontentloaded'})

  // Go to Job page
  const jobListItem = await page.$('#jobs-nav-item');
  const jobLink = await jobListItem.$('.nav-item__link nav-item__link--underline, .js-nav-item-link');
  await jobLink.click();
  await page.waitForNavigation({waitUntil: 'domcontentloaded'})

  // Scroll down to the bottom of the JobPage to load in more jobs
  await autoScroll(page)

  // await browser.close();
})();

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 140;
      const scrollTimer  = setInterval(() => {
        // Get the scrollable height from the DOM body
        const scrollHeight = document.body.scrollHeight;
        // Scroll down by x amount of distance
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(scrollTimer)
          resolve()
        }
      }, 500)
    })
  })
}