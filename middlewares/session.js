const { handleHTTPError } = require('../utils/handleErrors');
const { verifyToken } = require('../utils/handleJwt');
const { userModel } = require('../models/');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

/**
 * Protect access to specified routes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			handleHTTPError(res, 'NEED_SESSION', 401);
			return;
		}

		const token = req.headers.authorization.split(' ').pop();
		const dataToken = await verifyToken(token);

		if (!dataToken) {
			handleHTTPError(res, 'NOT_PAYLOAD_DATA', 401);
			return;
		}

		const query = {
			[propertiesKey.id]: dataToken[propertiesKey.id],
		};

		// const user = await userModel.findById(dataToken._id);.// findById is a specific method of mongodb
		const user = await userModel.findOne(query);
		req.user = user; // The property 'user' is created to check who makes the request.

		next();
	} catch (error) {
		handleHTTPError(res, 'NOT_SESSION', 401); // 401: Unauthorized
	}
};

module.exports = authMiddleware;
