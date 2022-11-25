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

	

	server.post('/webhook/1', (req,res) => {
		const info = req.body;
		console.log(info);
		res.send('done');


	});


	async function getRecord(id) {


		const record = await base('VM\'s').find(`${id}`, function(err, record) {
										    if (err) { console.error(err); return; }
										    console.log('Retrieved', record.id);
											});
		console.log(record);
		return record;

	}

	getRecord('rec9o9IlEOChQb7xx');
