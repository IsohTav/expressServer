const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();

const PORT = 8000;

server.use(bodyParser.text()) 

server.get('/', (req, res) => {
	res.json({hello: "world"});

});




async function scrapeEmail(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('/html/body/section[1]/div[2]/div/div/div[3]/form/input[2]');
	const email = await el.getProperty('value');
	const emailTXT = await email.jsonValue();

	return emailTXT;
};







const data1 = [];




server.post('/scraping/profile', async (req, res) => {
	    
	    const data1info = req.body;
	    data1.push(data1info);
	    const data1txt = data1.toString();
	    const scrapedData = await scrapeEmail(data1txt);
		res.send(scrapedData);
		data1.length = 0;
		
	    });


server.post('/test1', (req,res) => {

	const respond1 = req.body.respond1;
	const respond2 = req.body.respond2;
	res.json(respond1);
	console.log(respond2);


});



server.listen(8000, () => {
	console.log('incoming')

});
