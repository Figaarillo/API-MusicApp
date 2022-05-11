const ENGINE_DB = process.env.ENGINE_DB;

const models = {
	userModel: require(`./${ENGINE_DB}/users`),
	tracksModel: require(`./${ENGINE_DB}/tracks`),
	storageModel: require(`./${ENGINE_DB}/storage`),
};

module.exports = models;
