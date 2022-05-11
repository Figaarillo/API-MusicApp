const ENGINE_DB = process.env.ENGINE_DB;
const getProperties = () => {
	const data = {
		nosql: { id: '_id' },
		sql: { id: 'id' },
	};
	return data[ENGINE_DB]; // -> 'nosql' || 'sql'
};

module.exports = getProperties;
