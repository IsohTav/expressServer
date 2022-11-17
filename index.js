const express = require('express');

const server = express();

const PORT = 8000;



server.get('/', (req, res) => {
	res.json({hello: "world"});

});


const data1 = [];

server.post('/api/data1', (req, res) => {
	    
	    const data1info = req.body;
	    data1.push(data1info);
		console.log(data1info);
		console.log(data1);
	    res.status(201).send(data1info);
		


	    });

server.listen(8000, () => {
	console.log('incoming')

});
