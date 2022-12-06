const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/results/');
  await page.screenshot({path: 'example.png'});
  const divs = await page.$$eval('div.event.event--results div div.sportName.table-tennis div', divs => divs.map(div => div.id));
  const filteredDivs = divs.filter(Boolean);
  const divsTrimmed = filteredDivs.map(div => div.substring(5));
  const links = [];
  for (let i = 0; i < divsTrimmed.length; i++) {
    links.push(`https://www.flashscore.com/match/${divsTrimmed[i]}/#/match-summary`);
  }
  
  console.log(links);
  for (let i = 0; i < links.length; i++) {
  await page.goto(links[i]);
  await page.waitFor(1000);
  const homePlayer = await page.$$eval('div.event__participant.event__participant--home span.event__participant--name', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const awayPlayer = await page.$$eval('div.event__participant.event__participant--away span.event__participant--name', awayPlayer => awayPlayer.map(awayPlayer => awayPlayer.innerText));
  console.log(homePlayer);
  console.log(awayPlayer);
  }
 
  
  
  await browser.close();
})();
