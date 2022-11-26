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


		const record = await base('VM\'s').find(`${id}`);
		const recordFields = await record.fields;								    
		
		console.log(recordFields);								 
		
		return record;

	};

	async function airtableUpdate(recordid,data) {

	    base('VM\'s').update([{"id": `${recordid}`, "fields": data}])
	    .then(() => console.log("Airtable update successful"))
	    .catch(e => console.log(e))

		};

	server.post('/webhook/heartbeat', (req,res) => {

		const record = req.body;
		const i = record.reference;
		const i2 = i - 1;

		const idData = ['recGNfAcQi2YORE27','rec9o9IlEOChQb7xx','rec4UAXt95wVTlZdj','rec2jOkoroaQrcaND','reci1oQrdK6tsd5R0','recO63HKwfbmUil2D','ecxzea90SMQLpmO6','recdCKhhiOBx4VpCS','recIYdwb9VZhHl3UA','recdONmMRKDJ6bI4t','recXUwaCic3HkdJEF','rec6osfK1tAo4vpL0','recav8l3MdfHOQreD','rec7JLp9AJDOf4ydL','rec6LfsS0xoS6lDdZ','recdNCYaVNwt5BfPs','rec6CcZPhO3crSK6R','recuhNUzxxZl0Hj4e','rec4aATgeAaurcyRJ','receh0jvZkdtMbHpw','recILdhvOMCD7Ykma','recOcdNpcuZn5F7f1','rec4ectPPoKkVbuNu','rechiigMfu7gQVkQ4','rec5myS5u2tMWEGVu','recqSdNvEa1cb4O06','rec1BmaSBpNwQGmkU','recngJ1DMomnbpQbK','reccU5emnfpJc238U','recU2AmijdHN9JYDX','recELPFFih8OsvgT7','recLmjZvji6Yq6gp9','recCHMz94a8LIk3JP','rec4BdYC3GhJcO5Zs','recRrJwSfLwFbNJ6D','recW9hvN6xXPIpeHm','recVCYoJ1KJVOzOqu','recvVs3CR97LjxHsR','recmRYbH7IPpcpP2F','rec3wDy7ZULila4AB','reccrMADS2psRBRrA','recfgFCDbpTfzycsv','recIjz0yJduk82CMY','recDp5sprrzU3WxEr','rec7Rq2oKRXTCkChT','reciysSYWm0DRq9bS','recwUFIU2q1Ei5svT','recsB8NhdNmq4Mrqr','recpCD7RivAMsfiOB','recjWZbD648aEgcDA','recMSJBFtqobCjByw','recj5IeLxfYn6zdpw','recQSb2Fo7SRZ2zS9','receQHPrTYPr7bIL3'];

		airtableUpdate(idData[i2],{"Heartbeat":false});
		airtableUpdate(idData[i2],{"Heartbeat":true});
		res.send('done');

	});
