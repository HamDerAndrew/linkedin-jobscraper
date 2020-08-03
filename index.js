const puppeteer = require('puppeteer');
require('dotenv').config({path: './config/env.env' });

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://dk.linkedin.com/');

  const loginEmail = await page.$('#session_key');
  const loginPass = await page.$('#session_password');
  const loginButton = await page.$('.sign-in-form__submit-button')
  await loginEmail.click();
  await page.keyboard.type(process.env.EMAIL);
  await loginPass.click();
  await page.keyboard.type(process.env.PASSWORD);
  await loginButton.click();

  await page.screenshot({path: 'example.png'});

  await browser.close();
})();