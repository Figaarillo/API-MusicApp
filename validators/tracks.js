const { check } = require('express-validator');
const validateResults = require('../utils/handleValidators');

const validatorCreateItem = [
	// Using express validator to check that conditions are valid
	check('name').exists().notEmpty(),
	check('album').exists().notEmpty(),
	check('cover').exists().notEmpty(),
	check('artist').exists().notEmpty(),
	check('artist.name').exists().notEmpty(),
	check('artist.nickname').exists().notEmpty(),
	check('artist.nationality').exists().notEmpty(),
	check('duration').exists().notEmpty(),
	check('duration.start').exists().notEmpty(),
	check('duration.end').exists().notEmpty(),
	// check('mediaId').exists().notEmpty().isMongoId(), to be use in mongo and mysql remove 'isMongoId'
	check('mediaId').exists().notEmpty(),
	(req, res, next) => validateResults(req, res, next),
];

const validatorGetItem = [
	// check('id').exists().notEmpty().isMongoId(),
	check('id').exists().notEmpty(),
	(req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorCreateItem, validatorGetItem };
