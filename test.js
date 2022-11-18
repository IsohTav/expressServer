const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();

const PORT = 8000;

server.use(express.json()) 

server.get('/', (req, res) => {
	res.json({hello: "world"});

});


server.listen(8000, () => {
	console.log('incoming')

});




server.post('/test1', (req, res) => {
	const username = req.body.username
	const cock = req.body.cock
	res.send(username);
	console.log(username);


});


const data2 = data[];

server.get('/test2', (req,res) => {
	console.log(data2);
	res.json(data2);


});
