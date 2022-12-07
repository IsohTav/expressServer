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
  
  const homePlayer = await page.$$eval('div.duelParticipant__home div.participant__participantNameWrapper div.participant__participantName.participant__overflow a', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));

  console.log(homePlayer);

  }
 
  
  
  await browser.close();
})();
