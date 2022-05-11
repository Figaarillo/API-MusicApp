const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;

// readdir: returns the names of the files in the specified path

/**
 *
 */
fs.readdir(PATH_ROUTES, (err, files) => {
	if (err) console.log(`## An error has occurred ##\n${err}`);
	files
		.filter(file => file !== 'index.js')
		.forEach(file => router.use(`/${file.split('.')[0]}`, require(`./${file}`)));
});

module.exports = router;
