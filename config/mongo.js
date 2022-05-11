require('dotenv').config({ path: 'ENV_FILENAME' });
const mongoose = require('mongoose');

const dbConnectMongo = () => {
	const DB_URI = process.env.URI;
	mongoose
		.connect(DB_URI, { usenewurlparser: true, useunifiedtopology: true })
		.then(() => console.log('Database connected ❤️‍🔥'))
		.catch(err => console.log(`Can not connect to database ☹️, ${err}`));
};

module.exports = dbConnectMongo;
