const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/chefs', (req, res, next) => {
	db.read.chefs().then((chefs) => res.send(chefs)).catch(next);
});
app.get('/api/recipes', (req, res, next) => {
	db.read.recipes().then((recipes) => res.send(recipes)).catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => console.log(`listening on port ${port}`));
});
