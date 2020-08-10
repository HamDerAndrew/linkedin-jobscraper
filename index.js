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

  // Grab jobs according to criteria
  await grabJobs(page);

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

const grabJobs = async (page) => {
  const jobsUl = await page.$('.card-list, card-list--tile, jobs-jymbii__list');
  // Remember to remove the first item in the list on the site as it is not a "job post", but some profile premium offer
  const jobsNode = await jobsUl.$$('.jobs-jymbii__list-item, .jobs-jymbii__list-item--job-card-addon, .card-list__item, .a11y-job-card');
  const jobList = await Array.from(jobsNode);
  let count = 0;
  let earlybirdJobs = [];

  jobList.forEach(async (job, index) => {
    const jobTitleContainer = await job.$('.job-card-square__title');
    // page.evaluate gives access to the complete DOM API. Therefore you can use 'innerText'
    const jobText = await page.evaluate(async (element) => {
      return element.innerText
    }, jobTitleContainer)
    console.log(jobText);
  })

}

// https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore