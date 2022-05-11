const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHTTPError } = require('../utils/handleErrors');

/**
 * To get the list of tracks from the database
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
	try {
		const user = req.user;
		const data = await tracksModel.findAllData({});
		res.send({ data, user });
	} catch (error) {
		handleHTTPError(res, 'ERROR_GET_TRACKS');
	}
};
/**
 * To get details from a track
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
	try {
		req = matchedData(req);
		const { id } = req;
		const data = await tracksModel.findOneData(id);
		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_GET_TRACK');
	}
};

/**
 * To insert an item into the database
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
	try {
		/* Mached data:
		It is responsible for leaving the data with the validation that we specify, that is cleaning the data */
		const body = matchedData(req);
		const data = await tracksModel.create(body);
		res.send(data);
	} catch (error) {
		handleHTTPError(req, 'ERROR_CREATE_TRACK');
	}
};

/**
 * To update a track
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
	try {
		const { id, ...body } = matchedData(req);
		const data = await tracksModel.findOneAndUpdate(id, body);
		res.send(data);
	} catch (error) {
		handleHTTPError(req, 'ERROR_UPDATE_TRACKS');
	}
};

/**
 * To delete a track
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
	try {
		req = matchedData(req);
		const { id } = req;
		const data = await tracksModel.delete({ _id: id });
		/**
		 * deleteOne: Does a physical delete on the database | It's a mongoose method
		 * delete: Does a logical delete on the database | It isn't a mongoose method
		 */
		res.send({ data });
	} catch (error) {
		handleHTTPError(req, 'ERROR_DELETE_TRACK');
	}
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
