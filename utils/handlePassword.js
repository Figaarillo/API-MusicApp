const bcryptjs = require('bcryptjs');

/**
 * TODO: Encrypt password
 * @param {*} passwordPlain
 */
const encryt = async passwordPlain => {
	const hash = await bcryptjs.hash(passwordPlain, 10);
	return hash;
};

/**
 * TODO: Check if the hash corresponds to the key
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
	return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encryt, compare };
