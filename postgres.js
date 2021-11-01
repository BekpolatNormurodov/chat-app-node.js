const { Pool } = require("pg");

const pool = new Pool({
	host: "topsy.db.elephantsql.com",
	password: "8q7H-LQGkVYmZ5ccfyQwsCVdc_3zjYYx",
	port: 5432,
	user: "olxwwayo",
	database: "olxwwayo",
});

async function connection(query, ...array) {
	const client = await pool.connect();
	try {
		const { rows } = await client.query(query, array.length ? array : null);
		return rows;
	} catch (error) {
		console.log(error);
	} finally {
		await client.release();
	}
}

module.exports = connection;
