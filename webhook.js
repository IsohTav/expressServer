	const express = require('express');
	const bodyParser = require('body-parser')
	const puppeteer = require('puppeteer');
	const server = express();
	const PORT = 8000;


	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');


	//express config
	server.use(express.json());
	server.use(bodyParser.text()); 
	server.listen(8000, () => {
		console.log('incoming')

	});

	server.get('/', (req, res) => {
		res.json({hello: "world"});

	});

	

	server.post('/webhook/1', (req,res) => {
		const info = req.body;
		console.log(info);
		res.send('done');


	});


	console.log('message 1');
	setTimeout(test12,5000);
