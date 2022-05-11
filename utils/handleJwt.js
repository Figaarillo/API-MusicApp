const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require('./handlePropertiesEngine');
const propertiesKey = getProperties();

/**
 * Pass the user's object to create a JWT
 * @param {*} user
 */
const tokenSign = async user => {
	const sign = await jwt.sign(
		{
			[propertiesKey.id]: user[propertiesKey.id],
			role: user.role,
		},
		JWT_SECRET,
		{
			expiresIn: '2h',
		}
	);
	return sign;
};

/**
 * Pass the token to verify the sign
 * @param {*} usertokenJWT
 * @returns
 */
const verifyToken = async tokenJWT => {
	try {
		return jwt.verify(tokenJWT, JWT_SECRET);
	} catch (error) {
		return null;
	}
};

module.exports = { tokenSign, verifyToken };
