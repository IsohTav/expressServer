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


	function sleep(ms) {
    		return new Promise(resolve => setTimeout(resolve, ms));
						
						};

	async function scrapeFixture(url) {
	
			const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
			const page = await browser.newPage();

			await page.goto(url);


			fixtures = await page.$$eval('div.sportName.table-tennis div', elements => elements.map(LL => LL.id));

			const unqFixture = [...new Set(fixtures)];
			
			const out = unqFixture.map(function(v) { return v.slice(5) });
			const out2 = out.slice(1);

			console.log(out2);

			const mainScores = [];

			for (let i = 0; i < await out2.length; i++) {

				sleep(5000);
				score = await scrapeScore(out2[i]);
				console.log(score);
				mainScores.push(score);

			};

			console.log(mainScores);
			return fixtures;

				};


	async function scrapeScore(url) {

		const url2 = `https://www.flashscore.com/match/${url}/#/match-summary`;

		const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
		const page = await browser.newPage();

		await page.goto(url2);

		scores = await page.$$eval('div.smh__template.table-tennis', elements => elements.map(LL => {


				//home scores
				const homeScore = LL.querySelector('div.smh__part smh__score.smh__home smh__part--current')?.innerText || 0;
				const homesc1 = LL.querySelector('div.smh__part.smh__home.smh__part--1')?.innerText || 0;
				const homesc2 = LL.querySelector('div.smh__part.smh__home.smh__part--2')?.innerText || 0;
				const homesc3 = LL.querySelector('div.smh__part.smh__home.smh__part--3')?.innerText || 0;
				const homesc4 = LL.querySelector('div.smh__part.smh__home.smh__part--4')?.innerText || 0;
				const homesc5 = LL.querySelector('div.smh__part.smh__home.smh__part--5')?.innerText || 0;
				const homesc6 = LL.querySelector('div.smh__part.smh__home.smh__part--6')?.innerText || 0;
				const homesc7 = LL.querySelector('div.smh__part.smh__home.smh__part--7')?.innerText || 0;


				//away scores
				const awayScore = LL.querySelector('div.smh__part.smh__score.smh__away.smh__part--current')?.innerText || 0;
				const awaysc1 = LL.querySelector('div.smh__part.smh__away.smh__part--1')?.innerText || 0;
				const awaysc2 = LL.querySelector('div.smh__part.smh__away.smh__part--2')?.innerText || 0;
				const awaysc3 = LL.querySelector('div.smh__part.smh__away.smh__part--3')?.innerText || 0;
				const awaysc4 = LL.querySelector('div.smh__part.smh__away.smh__part--4')?.innerText || 0;
				const awaysc5 = LL.querySelector('div.smh__part.smh__away.smh__part--5')?.innerText || 0;
				const awaysc6 = LL.querySelector('div.smh__part.smh__away.smh__part--6')?.innerText || 0;
				const awaysc7 = LL.querySelector('div.smh__part.smh__away.smh__part--7')?.innerText || 0;


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

	scrapeFixture('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/results/');
	
