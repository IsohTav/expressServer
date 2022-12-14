const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key8q2CivSfd21Mpu' }).base('appfWswW4PFm3mL8A');
async function createRecord(data) {
  try {
    const record = await base('Table 1').create([
      {
        "fields": {
          ...data
        }
      }
    ], { typecast: true });
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
  await page.screenshot({path: 'example.png'});
  const divs = await page.$$eval('div.event.event--results div div.sportName.table-tennis div', divs => divs.map(div => div.id));
  const filteredDivs = divs.filter(Boolean);
  const divsTrimmed = filteredDivs.map(div => div.substring(5));
  const links = [];
  for (let i = 0; i < divsTrimmed.length; i++) {
    links.push(`https://www.flashscore.com/match/${divsTrimmed[i]}/#/match-summary`);
  }
  
  
  const FixedLinks = [...new Set(links)];
  console.log(FixedLinks.length);
  console.log(FixedLinks);

for (let i = 0; i < FixedLinks.length; i++) {
  await page.goto(FixedLinks[i]);
  
  const homePlayer = await page.$$eval('div.duelParticipant div.duelParticipant__home', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const awayPlayer = await page.$$eval('div.duelParticipant div.duelParticipant__away', awayPlayer => awayPlayer.map(awayPlayer => awayPlayer.innerText));
  const score = await page.$$eval('div.duelParticipant div.duelParticipant__startTime', score => score.map(score => score.innerText));
  const homeScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
    const homeScore1 = section.querySelector('div.smh__part.smh__home.smh__part--1').innerText;
    const homeScore2 = section.querySelector('div.smh__part.smh__home.smh__part--2').innerText;
    const homeScore3 = section.querySelector('div.smh__part.smh__home.smh__part--3').innerText;
    const homeScore4 = section.querySelector('div.smh__part.smh__home.smh__part--4').innerText;
    const homeScore5 = section.querySelector('div.smh__part.smh__home.smh__part--5').innerText;
    const gamescoreHome = section.querySelector('div.smh__part.smh__score.smh__home.smh__part--current').innerText;

    return {
      
      homeScore1: homeScore1,
      homeScore2: homeScore2,
      homeScore3: homeScore3,
      homeScore4: homeScore4,
      homeScore5: homeScore5,
      gamescoreHome: gamescoreHome
    }
  }));
  const awayScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
    const awayScore1 = section.querySelector('div.smh__part.smh__away.smh__part--1').innerText;
    const awayScore2 = section.querySelector('div.smh__part.smh__away.smh__part--2').innerText;
    const awayScore3 = section.querySelector('div.smh__part.smh__away.smh__part--3').innerText;
    const awayScore4 = section.querySelector('div.smh__part.smh__away.smh__part--4').innerText;
    const awayScore5 = section.querySelector('div.smh__part.smh__away.smh__part--5').innerText;
    const gamescoreAway = section.querySelector('div.smh__part.smh__score.smh__away.smh__part--current').innerText;
    return {
      
      awayScore1: awayScore1,
      awayScore2: awayScore2,
      awayScore3: awayScore3,
      awayScore4: awayScore4,
      awayScore5: awayScore5,
      gamescoreAway: gamescoreAway
    }
  }));
  
  const allScores = {
  ...homeScores[0],
  ...awayScores[0],
    homePlayer: homePlayer[0],
    awayPlayer: awayPlayer[0],
    Gamedatetime: score[0],
    gameURL: links[i]
  
  }
const today = new Date();
const todayMonth = today.getMonth() + 1;

const [date, time] = allScores.Gamedatetime.split(' ');
const [day, month] = date.split('.');

if (month == todayMonth && day == today.getDate()) {
  console.log(allScores);
  createRecord(allScores);
} else {
  console.log(`Dates do not match. Today: ${today.getDate()}.${todayMonth}, Event: ${day}.${month}`);
}




  
  
  
}
 
  
  
  await browser.close();
})();
