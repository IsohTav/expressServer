const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/results/');
  await page.screenshot({path: 'example.png'});
  const divs = await page.$$eval('div.event.event--results div div.sportName.table-tennis div', divs => divs.map(div => div.id));
  const filteredDivs = divs.filter(Boolean);
  console.log(divs);
  console.log(filteredDivs);
  await browser.close();
})();
