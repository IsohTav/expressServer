const express = require('express');

const server = express();

const PORT = 8000;

server.get('/', (req, res) => {
	res.json({hello: "world"});

});

server.post('/api/data1', (req, res) => {
	    
	    const data1 = req.body;
		res.json(data1)
	    
	    });

server.listen(8000, () => {
	console.log('incoming')

});
