const puppeteer = require('puppeteer');

test('We can launch a browser', async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
});