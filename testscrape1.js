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
  const awayPlayer = await page.$$eval('div.duelParticipant__away div.participant__participantNameWrapper div.participant__participantName.participant__overflow a', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const homeScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
  
  const homeScore1 = section.querySelector('smh__part.smh__home.smh__part--1');
  const homeScore2 = section.querySelector('smh__part.smh__home.smh__part--2');
    
    return {
    homeScore1:homeScore1,
    homeScore2:homeScore2
    
    };
  
  
  
  }));
    
    
  console.log(homePlayer);
  console.log(awayPlayer);
  console.log(homeScores);

  }
 
  
  
  await browser.close();
})();
