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

const data1 = [];


server.post('/api/scrapeUserprofile', async (req, res) => {
	    
	    const data1info = req.body;
	    data1.push(data1info);
	    const data1txt = data1.toString();
	    const scrapedData = await scrapeItem(data1txt);
		res.send(scrapedData);
		console.log(scrapedData);

		 const data1 = [];
	    });



server.listen(8000, () => {
	console.log('incoming')

});
