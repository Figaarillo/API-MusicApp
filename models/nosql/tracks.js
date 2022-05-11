const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

// Scheme to the database
const TracksScheme = new mongoose.Schema(
	{
		name: { type: String },
		album: { type: String },
		cover: {
			type: String,
			validate: {
				validator: req => true, // TODO
				message: 'ERROR_URL',
			},
		},
		artist: {
			name: { type: String },
			nickname: { type: String },
			nationality: { type: String },
		},
		duration: {
			start: { type: Number },
			end: { type: Number },
		},
		mediaId: { type: mongoose.Types.ObjectId },
	},
	{
		timestamps: true, // TODO: createAt, updateAt
		versionKey: false,
	}
);

// TODO: investigate more 😂😂
TracksScheme.static.findAllData = function () {
	const joinData = this.aggregate([
		{
			$lookup: {
				from: 'storages',
				localField: 'mediaId',
				foreignKey: '_id',
				as: 'audio',
			},
		},
		{ $unwind: '$audio' },
	]);
	return joinData;
};

// TODO: investigate more 😂😂
TracksScheme.static.findAllData = function (id) {
	const joinData = this.aggregate([
		{
			$lookup: {
				from: 'storages',
				localField: 'mediaId',
				foreignKey: '_id',
				as: 'audio',
			},
		},
		{ $unwind: '$audio' },
		{
			$match: {
				_id: mongoose.Types.ObjectId(id),
			},
		},
	]);
	return joinData;
};

// Adds a new property to the model to indicate if it was removed
TracksScheme.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('tracks', TracksScheme);
