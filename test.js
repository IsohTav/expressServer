const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();

const PORT = 8000;

server.use(bodyParser.text()) 

server.get('/', (req, res) => {
	res.json({hello: "world"});

});


server.listen(8000, () => {
	console.log('incoming')

});


const data = [];

server.post('/test1', (req, res) => {
	const data1 = req.body;
	data.push(data1);
	res.send(data);
	console.log(data);


});
