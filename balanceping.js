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

	    base('VMs').update([{"id": `${recordid}`, "fields": data}],{typecast: true})
	    .then(() => console.log("Airtable update successful"))
	    .catch(e => console.log(e))

		};

	async function getRecordID(searchID) {

		

		const ID = await response.json();
		return ID;


	};

	server.post('/webhook/balance', async (req, res) => {

		const info = req.body;
		const modes = info.modes;
		
		

		
		const record = await base('VMs').select({"filterByFormula": `SEARCH("${req.body.reference}", {vm ID})`}).firstPage();
		const recordID = record[0].id;
		

		if (req.body.bookie = 'Sportsbet') {

			const data = {"Sportsbet cash":`${req.body.cashBalance}`,"Sportsbet bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is Sportsbet');
			airtableUpdate(recordID,data);

		} else if (req.body.bookie = 'Pointsbet') {

			const data = {"Pointsbet cash":`${req.body.cashBalance}`,"Pointsbet bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is Pointsbet');
			airtableUpdate(recordID,data);

		} else if (req.body.bookie = 'BetR') {

			const data = {"BetR cash":`${req.body.cashBalance}`,"BetR bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is BetR');
			airtableUpdate(recordID,data);

		} else if (req.body.bookie = 'TAB') {

			const data = {"TAB cash":`${req.body.cashBalance}`,"TAB bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is TAB');
			airtableUpdate(recordID,data);

		};

		
		console.log(recordID);
		console.log(JSON.stringify(modes));
		


		res.send('done');


	});

	server.post('/webhook/', async (req, res) => {

		const info = req.body;
		console.log(info);

	});
