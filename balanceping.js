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

	    base('VMs').update([{"id": `${recordid}`, "fields": data}])
	    .then(() => console.log("Airtable update successful"))
	    .catch(e => console.log(e))

		};

	async function getRecordID(searchID) {

		

		const ID = await response.json();
		return ID;


	};

	server.post('/webhook/balance', async (req, res) => {

		const info = req.body;

		const data = [];
		const record = await base('VMs').select({"filterByFormula": `SEARCH("${req.body.reference}", {vm ID})`}).firstPage();
		const recordID = record[0].id;
		

		if (req.body.bookie = 'Sportsbet') {

			const data1 = {"Sportsbet cash":`${req.body.cashBalance}`,"Sportsbet bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is Sportsbet');
			data.push(data1);

		} else if (req.body.bookie = 'Pointsbet') {

			const data2 = {"Pointsbet cash":`${req.body.cashBalance}`,"Pointsbet bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is Pointsbet');
			data.push(data2);

		} else if (req.body.bookie = 'BetR') {

			const data3 = {"BetR cash":`${req.body.cashBalance}`,"BetR bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is BetR');
			data.push(data3);

		} else if (req.body.bookie = 'TAB') {

			const data4 = {"TAB cash":`${req.body.cashBalance}`,"TAB bonus":`${req.body.bonusBalance}`};
			console.log('Bookie is TAB');
			data.push(data4);

		};

		console.log(data);
		console.log(recordID);

		airtableUpdate(recordID,data);


		res.send('done');


	});
