const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/chefs', (req, res, next) => {
	db.createChef(req.body).then((chef) => res.status(201).send(chef)).catch(next);
});
app.post('/api/recipes', (req, res, next) => {
	db.createRecipe(req.body).then((recipe) => res.status(201).send(recipe)).catch(next);
});

app.get('/api/chefs', (req, res, next) => {
	db.readChefs().then((chefs) => res.send(chefs)).catch(next);
});
app.get('/api/recipes', (req, res, next) => {
	db.readRecipes().then((recipes) => res.send(recipes)).catch(next);
});

app.put('/api/chefs/:id', (req, res, next) => {
	db.updateChef(req.body).then((chef) => res.send(chef)).catch(next);
});
app.put('/api/recipes/:id', (req, res, next) => {
	db.updateRecipe(req.body).then((recipe) => res.send(recipe)).catch(next);
});

app.delete('/api/chefs/:id', (req, res, next) => {
	db.deleteChef(req.params.id).then(() => res.sendStatus(204)).catch(next);
});
app.delete('/api/recipes/:id', (req, res, next) => {
	db.deleteRecipe(req.params.id).then(() => res.sendStatus(204)).catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => console.log(`listening on port ${port}`));
});
