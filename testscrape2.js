const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key8q2CivSfd21Mpu' }).base('appfWswW4PFm3mL8A');
async function createRecord(data) {
  
          const homeScore1 = homeScores.homeScore1;
  try {
    const record = await base('Table 1').create([
      {
        "fields": {
          ...data
          
        }
      }
    ]);
    console.log(record);
  } catch (err) {
    console.error(err);
  }
};

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/results/');
  const divs = await page.$$eval('div.event.event--results div div.sportName.table-tennis div', divs => divs.map(div => div.id));
const filteredDivs = divs.filter(Boolean);
const divsTrimmed = filteredDivs.map(div => div.substring(5));
const links = [];
for (let i = 0; i < divsTrimmed.length; i++) {
  links.push(`https://www.flashscore.com/match/${divsTrimmed[i]}/#/match-summary`);
}
for (let i = 0; i < links.length; i++) {
  await page.goto(links[i]);
  await page.waitFor(1000);
  const homePlayer = await page.$$eval('div.duelParticipant__home div.participant__participantNameWrapper div.participant__participantName.participant__overflow a', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const awayPlayer = await page.$$eval('div.duelParticipant__away div.participant__participantNameWrapper div.participant__participantName.participant__overflow a', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const gameTime = await page.$$eval('div.duelParticipant__startTime div', gameTime => gameTime.map(gameTime => gameTime.innerText));
  const homeScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
    const homeScore1 = section.querySelector('div.smh__part.smh__home.smh__part--1').innerText;
    const homeScore2 = section.querySelector('div.smh__part.smh__home.smh__part--2').innerText;
    const homeScore3 = section.querySelector('div.smh__part.smh__home.smh__part--3').innerText;
    const homeScore4 = section.querySelector('div.smh__part.smh__home.smh__part--4').innerText;
    const homeScore5 = section.querySelector('div.smh__part.smh__home.smh__part--5').innerText;
    return {
      homePlayer: homePlayer,
      awayPlayer: awayPlayer,
      section: section.innerText,
      homeScore1: homeScore1,
      homeScore2: homeScore2,
      homeScore3: homeScore3,
      homeScore4: homeScore4,
      homeScore5: homeScore5
    }
  }));
  console.log(homeScores);
};
};