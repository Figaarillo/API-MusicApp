const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

// Scheme to the database
const UserScheme = new mongoose.Schema(
	{
		name: { type: String },
		age: { type: Number },
		email: { type: String, unique: true },
		password: { type: String, select: false },
		role: { type: ['user', 'admin'], default: 'user' },
	},
	{
		timestamps: true, // TODO: createAt, updateAt
		versionKey: false,
	}
);

// Adds a new property to the model to indicate if it was removed
UserScheme.plugin(MongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('user', UserScheme);
