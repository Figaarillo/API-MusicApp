const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

// Scheme to the database
const StorageScheme = new mongoose.Schema(
	{
		url: { type: String },
		filename: { type: String },
	},
	{
		timestamps: true, // TODO: createAt, updateAt
		versionKey: false,
	}
);

// Adds a new property to the model to indicate if it was removed
StorageScheme.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('storage', StorageScheme);
