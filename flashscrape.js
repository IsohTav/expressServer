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
	var out = unqFixture.map(function(v) { return v.slice(6) });
	var out2 = out.splice(1, 1);

	console.log(out2);
	return fixtures;

		};


	scrapeFixture('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/fixtures/');
