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
      "chefId" UUID REFERENCES chefs(id) NOT NULL
    );
  `;
	await client.query(SQL);

	//
	const [ joe, sally ] = await Promise.all([ createChef({ name: 'Joe' }), createChef({ name: 'Sally' }) ]);
	const [ applePie, lemonCake ] = await Promise.all([
		createRecipe({ name: 'Apple Pie', chefId: joe.id }),
		createRecipe({ name: 'Lemon Cake', chefId: sally.id })
	]);
	console.log(await readChefs());
	console.log(await readRecipes());
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

module.exports = {
	sync,
	createChef,
	createRecipe,
	read: {
		chefs: readChefs,
		recipes: readRecipes
	}
};
