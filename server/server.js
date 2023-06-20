'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ip = require('ip');

/* 
	option = 0 -> ip_address = "localhost"
	option = 1 -> ip_address = machine local ip address
*/
const option = 0;

let ip_address;

if(option === 0) {
	ip_address = "localhost"
}
else if(option === 1){
	ip_address = "195.231.81.64";
}

const eventsRouter = require('./routers/eventsRouter');
const usersRouter = require('./routers/usersRouter');

// init express
const app = new express();
const port = 3001;

//setup and enable Cors
const corsOptions = {
	origin: `http://${ip_address}:3000`,
	optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));

/******API******/

app.use('/api', eventsRouter);
app.use('/api', usersRouter);

// activate the server
app.listen(port, () => {
	console.log(`Server listening at http://${ip_address}:${port}`);
});

module.exports = app;
