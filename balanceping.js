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

	async function getRecordID(searchID) {

		const ID = await fetch(`https://api.airtable.com/v0/appkdHxBh7f5oCzwZ/VM's?filterByFormula=search(%22${searchID}%22%2C%7Bvm+ID%7D)`, {
			"headers": {
				"Authorization": "Bearer key8q2CivSfd21Mpu"}});

		return ID;


	};

	server.post('/webhook/balance', async (req, res) => {

		const info = req.body;

		const recordid = await getRecordID(req.body.reference);

		if (req.body.bookie = 'Sportsbet') {

			let data = {"Sportsbet cash":`${req.body.cashBalance}`,"Sportsbet bonus":`${req.body.bonusBalance}`};

		} else if (req.body.bookie = 'Pointsbet') {

			let data = {"Pointsbet cash":`${req.body.cashBalance}`,"Pointsbet bonus":`${req.body.bonusBalance}`};


		} else if (req.body.bookie = 'BetR') {

			let data = {"BetR cash":`${req.body.cashBalance}`,"BetR bonus":`${req.body.bonusBalance}`};

		} else if (req.body.bookie = 'TAB') {

			let data = {"TAB cash":`${req.body.cashBalance}`,"TAB bonus":`${req.body.bonusBalance}`};

		};

		console.log(data);
		console.log(recordid);


		res.send('done');


	});
