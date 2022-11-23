	const express = require('express');
	const bodyParser = require('body-parser')
	const puppeteer = require('puppeteer');
	const server = express();
	const axios = require('axios');
	const PORT = 8000;

	const api = "2594b963-9cfb-40ce-82d2-8cd85197fc0a";

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



	async function getProfile(api) {

		let profiles = await axios.get('https://api.sandbox.transferwise.tech/v1/profiles', [ headers: `Authorization: Bearer ${api}`] ).then(response => {return(response.id)});
		console.log(profiles);

	};


	getProfile(api);
