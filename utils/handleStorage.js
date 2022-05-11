const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		const pathStorage = `${__dirname}/../storage`; // Path where the file are stored
		callback(null, pathStorage);
	},
	filename: function (req, file, callback) {
		const ext = file.originalname.split('.').pop(); // To extract the extension
		const filename = `file-${Date.now()}.${ext}`; // To create the filename
		callback(null, filename);
	},
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
