	const express = require('express');
	const bodyParser = require('body-parser')
	const puppeteer = require('puppeteer');
	const server = express();
	const PORT = 8000;


	var Airtable = require('airtable');
	


	//express config
	server.use(express.json());
	server.use(bodyParser.text()); 
	
	server.get('/', (req, res) => {
		res.json({hello: "world"});

	});


	async function scrapeFixture(url) {
	
			const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
			const page = await browser.newPage();

			await page.goto(url);


			fixtures = await page.$$eval('div.sportName.table-tennis div', elements => elements.map(LL => LL.id));

			const unqFixture = [...new Set(fixtures)];
			
			const out = unqFixture.map(function(v) { return v.slice(6) });
			const out2 = out.slice(1);

			console.log(out2);
			return fixtures;

				};


	async function scrapeScore(url) {

		const url2 = `https://www.flashscore.com/match/${url}/#/match-summary`;

		const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
		const page = await browser.newPage();

		await page.goto(url2);

		scores = await page.$$eval('div.smh__template.table-tennis', elements => elements.map(LL => {


				//home scores
				const homeScore = LL.querySelector('div.smh__part smh__score.smh__home smh__part--current').innerText;
				const homesc1 = LL.querySelector('div.smh__part.smh__home.smh__part--1')?.innerText;
				const homesc2 = LL.querySelector('div.smh__part.smh__home.smh__part--2')?.innerText;
				const homesc3 = LL.querySelector('div.smh__part.smh__home.smh__part--3')?.innerText;
				const homesc4 = LL.querySelector('div.smh__part.smh__home.smh__part--4')?.innerText;
				const homesc5 = LL.querySelector('div.smh__part.smh__home.smh__part--5')?.innerText;
				const homesc6 = LL.querySelector('div.smh__part.smh__home.smh__part--6')?.innerText;
				const homesc7 = LL.querySelector('div.smh__part.smh__home.smh__part--7')?.innerText;


				//away scores
				const awayScore = LL.querySelector('div.smh__part.smh__score.smh__away.smh__part--current').innerText;
				const awaysc1 = LL.querySelector('div.smh__part.smh__away.smh__part--1')?.innerText;
				const awaysc2 = LL.querySelector('div.smh__part.smh__away.smh__part--2')?.innerText;
				const awaysc3 = LL.querySelector('div.smh__part.smh__away.smh__part--3')?.innerText;
				const awaysc4 = LL.querySelector('div.smh__part.smh__away.smh__part--4')?.innerText;
				const awaysc5 = LL.querySelector('div.smh__part.smh__away.smh__part--5')?.innerText;
				const awaysc6 = LL.querySelector('div.smh__part.smh__away.smh__part--6')?.innerText;
				const awaysc7 = LL.querySelector('div.smh__part.smh__away.smh__part--7')?.innerText;


			return {
				homeScore: homeScore,
				homesc1: homesc1,
				homesc2: homesc2,
				homesc3: homesc3,
				homesc4: homesc4,
				homesc5: homesc5,
				homesc6: homesc6,
				homesc7: homesc7,
				awayScore: awayScore,
				awaysc1: awaysc1,
				awaysc2: awaysc2,
				awaysc3: awaysc3,
				awaysc4: awaysc4,
				awaysc5: awaysc5,
				awaysc6: awaysc6,
				awaysc7: awaysc7,
			}

		}));

		console.log(scores);
		return scores;


	}


	scrapeScore('zP7pgqgB');
