const { matchedData } = require('express-validator');
const { userModel } = require('../models');
const { handleHTTPError } = require('../utils/handleErrors');
const { tokenSign } = require('../utils/handleJwt');
const { encryt, compare } = require('../utils/handlePassword');

/**
 * Registers a new user
 * Encryt the password
 * Encryt thr user's object by JWT
 * @param {*} datareq
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
	try {
		req = matchedData(req);
		const password = await encryt(req.password);
		const body = { ...req, password };
		const dataUser = await userModel.create(body);
		dataUser.set('password', undefined, { stric: false });

		// data: is the user's object but encryted by jwt
		const data = {
			token: await tokenSign(dataUser),
			user: dataUser,
		};

		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_REGISTER_USER'); // 'ERROR_REGISTERING_USER'
	}
};

const loginCtrl = async (req, res) => {
	try {
		req = matchedData(req);
		const user = await userModel
			.findOne({ email: req.email })
			.select('password name role email'); // is necessary, otherwise password returns undefined
		if (!user) {
			handleHTTPError(res, 'USER_NOT_EXISTS', 404); // 404: Not found
			return; // To kill the function
		}

		const hashPassword = await user.password;
		const check = await compare(req.password, hashPassword);
		if (!check) {
			handleHTTPError(res, 'PASSWORD_INVALID', 401); // 401: Unauthorized
			return; // To kill the function
		}

		user.set('password', undefined, { stric: false }); // To not show the password

		const data = {
			token: await tokenSign(user),
			user,
		};

		res.send({ data });
	} catch (error) {
		handleHTTPError(res, 'ERROR_LOGIN_USER'); // 'ERROR_LOGING_IN'
	}
};

module.exports = { registerCtrl, loginCtrl };
