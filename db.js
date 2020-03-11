const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

client.connect();

const sync = async () => {
	const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    DROP TABLE IF EXISTS recipes;
    DROP TABLE IF EXISTS chefs;
    CREATE TABLE chefs(
      id UUID PRIMARY KEY default uuid_generate_v4(),
      name VARCHAR(255) NOT NULL UNIQUE,
      CHECK (char_length(name) > 0)
    );
    CREATE TABLE recipes(
      id UUID PRIMARY KEY default uuid_generate_v4(),
      name VARCHAR(255) NOT NULL UNIQUE,
      CHECK (char_length(name) > 0),
      "chefId" UUID REFERENCES chefs(id) ON DELETE CASCADE
    );
  `;
	await client.query(SQL);

	//
	const [ joe, sally ] = await Promise.all([ createChef({ name: 'Joe' }), createChef({ name: 'Sally' }) ]);
	const [ applePie, lemonCake ] = await Promise.all([
		createRecipe({ name: 'Apple Pie', chefId: joe.id }),
		createRecipe({ name: 'Lemon Cake', chefId: sally.id })
	]);
	//
};

const createChef = async ({ name }) => {
	const SQL = 'INSERT INTO chefs(name) values($1) returning *';
	return (await client.query(SQL, [ name ])).rows[0];
};
const createRecipe = async ({ name, chefId }) => {
	const SQL = 'INSERT INTO recipes(name, "chefId") values($1, $2) returning *';
	return (await client.query(SQL, [ name, chefId ])).rows[0];
};

const readChefs = async () => {
	const SQL = 'SELECT * from chefs';
	return (await client.query(SQL)).rows;
};
const readRecipes = async () => {
	const SQL = 'SELECT * from recipes';
	return (await client.query(SQL)).rows;
};

const updateChef = async (name, id) => {
	return (await client.query('UPDATE chefs SET name=$1 WHERE id=$2 RETURNING *', [ name, id ])).rows[0];
};
const updateRecipe = async (name, id, chefId) => {
	return (await client.query('UPDATE recipes SET "chefId"=$1, name=$2 WHERE id=$3 RETURNING *', [ chefId, name, id ]))
		.rows[0];
};

const deleteChef = async (id) => {
	await client.query('DELETE FROM chefs WHERE id=$1', [ id ]);
};
const deleteRecipe = async (id) => {
	await client.query('DELETE FROM recipes WHERE id=$1', [ id ]);
};

module.exports = {
	sync,
	createChef,
	createRecipe,
	readChefs,
	readRecipes,
	updateChef,
	updateRecipe,
	deleteChef,
	deleteRecipe
};
