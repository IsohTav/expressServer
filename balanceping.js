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
	server.listen(8000, () => {
		console.log('incoming')

	});

	server.get('/', (req, res) => {
		res.json({hello: "world"});

	});

	async function airtableUpdate(recordid,data) {

	    base('VM\'s').update([{"id": `${recordid}`, "fields": data}])
	    .then(() => console.log("Airtable update successful"))
	    .catch(e => console.log(e))

		};


	server.post('/webhook/balance', (req, res) => {

		const info = req.body;
		console.log(info);
		res.send('done');


	});
