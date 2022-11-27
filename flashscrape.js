	const express = require('express');
	const bodyParser = require('body-parser')
	const puppeteer = require('puppeteer');
	const server = express();
	const PORT = 8000;


	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'key8q2CivSfd21Mpu'}).base('appkdHxBh7f5oCzwZ');


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


	fixtures = await page.$$eval('div.sportName.table-tennis', elements => elements.map(LL => {

	        //Top skills section of OLJ profile
	        const gameID = LL.getAttribute('id');
	        




	        return {
	          gameID: gameID,
	          
	      }
	}));



	console.log(fixtures);
	return fixtures;

		};


	scrapeFixture('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/fixtures/');
