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
 const divs = await page.$$eval('div.event.event--results div div.sportName.table-tennis div', divs => {
  // Get the current date in the format "DD.MM.YYYY"
  const currentDate = new Date().toLocaleDateString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"});

  // Ignore the first div by slicing the array of divs
  return divs.slice(1)
    .map(div => {
      // Retrieve the event time element for each div
      const eventTimeElement = div.querySelector('div.event__time');
let eventTime;
if (eventTimeElement) {
  eventTime = new Date(eventTimeElement.innerText).toLocaleDateString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"});
}
      // If the event time matches the current date, return the div id
      if (eventTime === currentDate) {
        return div.id;
      }
    })
    .filter(id => id !== undefined); // Filter out any undefined values
});

  console.log(divs);
  const filteredDivs = divs.filter(Boolean);
  const divsTrimmed = filteredDivs.map(div => div.substring(5));
 const links = [];
for (let i = 0; i < divsTrimmed.length; i++) {
  links.push(`https://www.flashscore.com/match/${divsTrimmed[i]}/#/match-summary`);
}

for (let i = 0; i < links.length; i++) {
  await page.goto(links[i]);

  const homePlayer = await page.$$eval('div.duelParticipant div.duelParticipant__home', homePlayer => homePlayer.map(homePlayer => homePlayer.innerText));
  const awayPlayer = await page.$$eval('div.duelParticipant div.duelParticipant__away', awayPlayer => awayPlayer.map(awayPlayer => awayPlayer.innerText));
  const score = await page.$$eval('div.duelParticipant div.duelParticipant__startTime', score => score.map(score => score.innerText));
const homeScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
  const homeScore1 = section.querySelector('div.smh__part.smh__home.smh__part--1').innerText;
  const homeScore2 = section.querySelector('div.smh__part.smh__home.smh__part--2').innerText;
  const homeScore3 = section.querySelector('div.smh__part.smh__home.smh__part--3').innerText;
  const homeScore4 = section.querySelector('div.smh__part.smh__home.smh__part--4').innerText;
  return [homeScore1, homeScore2, homeScore3, homeScore4];
}));
const awayScores = await page.$$eval('div.section div.smh__template.table-tennis', section => section.map(section => {
  const awayScore1 = section.querySelector('div.smh__part.smh__away.smh__part--1').innerText;
  const awayScore2 = section.querySelector('div.smh__part.smh__away.smh__part--2').innerText;
  const awayScore3 = section.querySelector('div.smh__part.smh__away.smh__part--3').innerText;
  const awayScore4 = section.querySelector('div.smh__part.smh__away.smh__part--4').innerText;
  return [awayScore1, awayScore2, awayScore3, awayScore4];
}));

for (let i = 0; i < homePlayer.length; i++) {
  const data = {
    "Home player": homePlayer[i],
    "Away player": awayPlayer[i],
    "Score": score[i],
    "Home scores": homeScores[i],
    "Away scores": awayScores[i]
  };

  await createRecord(data);
}
}

await browser.close();
})();
