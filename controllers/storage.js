const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models'); // Here we get the model from the database
const { handleHTTPError } = require('../utils/handleErrors');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * TODO: Document this section
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
	try {
		const { file } = await req;

		const fileData = {
			filename: file.filename,
			url: `${PUBLIC_URL}/${file.filename}`,
		};

		const data = await storageModel.create(fileData);

		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_CREATE_TRACK');
	}
};

/**
 *
 * @param {*} _req
 * @param {*} res
 */
const getItems = async (_req, res) => {
	try {
		const data = await storageModel.find({}); // In this way we get everything from the database
		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_GET_TRACKS');
	}
};

/**
 * TODO: Complete
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const data = await storageModel.findById(id);
		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_GET_TRACK');
	}
};

/**
 * TODO: Complete
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const dataFile = await storageModel.findById(id);
		await storageModel.deleteOne(id);
		// If you don't want to do a physical delete, you can change this to delete({_id:id})
		const { filename } = dataFile;
		filePath = `${MEDIA_PATH}/${filename}`;

		fs.unlinkSync(filePath);

		const data = {
			filePath,
			delete: 1,
		};

		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_DELETE_TRACK');
	}
};

module.exports = { getItems, getItem, createItem, deleteItem };
