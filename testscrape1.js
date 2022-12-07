const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key8q2CivSfd21Mpu' }).base('appfWswW4PFm3mL8A');
async function createRecord(homePlayer,awayPlayer,gameTime,homeScores,awayScores) => {
  try {
    const record = await base('Table 1').create([
      {
        "fields": {
          "homePlayer": `${homePlayer}`,
          "awayPlayer": `${awayPlayer}`,
          "Gamedatetime":`${gameTime}`,
          "homeScore1":homeScores.homeScore1,
          "homeScore2":homeScores.homeScore2,
          "homeScore3":homeScores.homeScore3,
          "homeScore4":homeScores.homeScore4,
          "homeScore5":homeScores.homeScore5,
          "gamescoreHome":homeScores.gameScore,
          "gamescoreAway":awayScores.gameScore,
          "awayScore1":awayScores.awayScore1,
          "awayScore2":awayScores.awayScore2,
          "awayScore3":awayScores.awayScore3,
          "awayScore4":awayScores.awayScore4,
          "awayScore5":awayScores.awayScore5,
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
  const gameTime = await page.$$eval('div.duelParticipant__startTime div', gameTime => gameTime.map(gameTime => gameTime.innerText));
  const homeScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
  
  const homeScore1 = section.querySelector('div.smh__part.smh__home.smh__part--1').innerText;
  const homeScore2 = section.querySelector('div.smh__part.smh__home.smh__part--2').innerText;
  const homeScore3 = section.querySelector('div.smh__part.smh__home.smh__part--3').innerText;
  const homeScore4 = section.querySelector('div.smh__part.smh__home.smh__part--4').innerText;
  const homeScore5 = section.querySelector('div.smh__part.smh__home.smh__part--5').innerText;
  const gameScore = section.querySelector('div.smh__part.smh__score.smh__home.smh__part--current').innerText;
    
    return {
    homeScore1:homeScore1,
    homeScore2:homeScore2,
    homeScore3:homeScore3,
    homeScore4:homeScore4,
    homeScore5:homeScore5,
    gameScore:gameScore
    
    };
  
  
  
  }));
    
  const awayScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
  
  const awayScore1 = section.querySelector('div.smh__part.smh__away.smh__part--1').innerText;
  const awayScore2 = section.querySelector('div.smh__part.smh__away.smh__part--2').innerText;
  const awayScore3 = section.querySelector('div.smh__part.smh__away.smh__part--3').innerText;
  const awayScore4 = section.querySelector('div.smh__part.smh__away.smh__part--4').innerText;
  const awayScore5 = section.querySelector('div.smh__part.smh__away.smh__part--5').innerText;
  const gameScore = section.querySelector('div.smh__part.smh__score.smh__away.smh__part--current').innerText;
    
    return {
    awayScore1:awayScore1,
    awayScore2:awayScore2,
    awayScore3:awayScore3,
    awayScore4:awayScore4,
    awayScore5:awayScore5,
    gameScore:gameScore
    
    };
  
  
  
  }));
    
    
  console.log(homePlayer);
  console.log(awayPlayer);
  console.log(gameTime);
  console.log(homeScores);
  console.log(awayScores);

  createRecord(homePlayer,awayPlayer,gameTime,homeScores,awayScores);
  }
 
  
  
  await browser.close();
})();
