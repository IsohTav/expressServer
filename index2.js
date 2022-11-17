const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();

const PORT = 8000;

server.use(bodyParser.text()) 

server.get('/', (req, res) => {
	res.json({hello: "world"});

});




async function scrapeItem(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('/html/body/section[2]/div/div[1]/div[1]/dl/dd/span');
	const text = await el.getProperty('textContent');
	const textTXT = await text.jsonValue();

	return textTXT;
}

const data1info = "";


server.post('/api/data1', (req, res) => {
	    
	    data1info.push = JSON.stringify(req.body);
	    res.status(201).send(data1info);
		console.log(data1info);


	    });

server.post('/api/scrape1', async (req, res) => {
	    
	    const scrapedData = await scrapeItem(data1info)
		res.send(scrapedData);
		console.log(scrapedData);


	    });

server.listen(8000, () => {
	console.log('incoming')

});
