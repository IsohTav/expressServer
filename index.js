const express = require('express');

const server = express();

const PORT = 8000;

server.get('/', (req, res) => {
	res.json({hello: "world"});

});


server.listen(8000, () => {
	console.log('incoming')

});
