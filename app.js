require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnectMongo = require('./config/mongo');
const { dbConnectMySQL } = require('./config/mysql');
const morganBody = require('morgan-body');
const loggerStream = require('./utils/handleLogger');

const ENGINE_DB = process.env.ENGINE_DB;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

morganBody(app, {
	noColors: true,
	stream: loggerStream,
	skip: function (req, res) {
		return res.statusCode < 404;
	},
});

const port = process.env.PORT;


app.use('/api', require('./routes/'));

// Run server
app.listen(port, () => console.log(`Server run! 🤙🤙 Go to http://localhost:${port}/`));

// Connect to db
ENGINE_DB === 'nosql' ? dbConnectMongo() : dbConnectMySQL();
