const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
	try {
		validationResult(req).throw(); // If don't fulfill validation then an error is 'throw' to catch it
		return next(); // Go to the controller
	} catch (err) {
		res.status(403); // Forbidden
		res.send({ errors: err.array() });
	}
};

module.exports = validateResults;
