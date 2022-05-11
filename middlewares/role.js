const { handleHTTPError } = require('../utils/handleErrors');

/**
 * Array with the allowed roles
 * @param {*} role
 * @returns
 */
const checkRole = roles => (req, res, next) => {
	// roles: roles assigned to the user. Examples -> ['admin', 'user', 'manager'...]
	console.log(roles);

	try {
		const { user } = req;
		console.log({ user });
		const rolesByUser = user.role;

		const checkValueRole = roles.some(role => rolesByUser.includes(role));

		if (!checkValueRole) {
			handleHTTPError(res, 'USER_NOT_PERMISSIONS', 403);
			return;
		}

		next();
	} catch (error) {
		handleHTTPError(res, 'ERROR_PERMISSIONS_REQUEST', 403);
	}
};

module.exports = checkRole;





