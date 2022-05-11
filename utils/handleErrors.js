const handleHTTPError = (res, message, code = 403) => {
	res.status(code);
	res.send({ error: message });
};

module.exports = { handleHTTPError };
