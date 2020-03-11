import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import Chefs from './Chefs';
import ChefForm from './ChefForm';
import ChefEdit from './ChefEdit';
import Recipes from './Recipes';
import RecipeForm from './RecipeForm';
import RecipeEdit from './RecipeEdit';

const App = () => {
	const [ chefs, setChefs ] = useState([]);
	const [ recipes, setRecipes ] = useState([]);
	const [ params, setParams ] = useState(qs.parse(window.location.hash.slice(1)));
	useEffect(() => {
		window.addEventListener('hashchange', () => {
			setParams(qs.parse(window.location.hash.slice(1)));
		});
	}, []);
	const { view } = params;
	useEffect(() => {
		Promise.all([ axios.get('/api/chefs'), axios.get('/api/recipes') ]).then((responses) => {
			setChefs(responses[0].data);
			setRecipes(responses[1].data);
		});
	}, []);

	const createChef = async (chef) => {
		const created = (await axios.post('/api/chefs', chef)).data;
		setChefs([ ...chefs, created ]);
	};
	const createRecipe = async (recipe) => {
		const created = (await axios.post('/api/recipes', recipe)).data;
		setRecipes([ ...recipes, created ]);
	};

	const updateChef = async (chef) => {
		const updated = (await axios.put(`/api/chefs/${chef.id}`, chef)).data;
		setChefs(chefs.map((chef) => (chef.id === updated.id ? updated : chef)));
	};
	const updateRecipe = async (recipe) => {
		const updated = (await axios.put(`/api/recipes/${recipe.id}`, recipe)).data;
		setRecipes(recipes.map((recipe) => (recipe.id === updated.id ? updated : recipe)));
	};

	const deleteChef = async (id) => {
		await axios.delete(`/api/chefs/${id}`);
		setChefs(chefs.filter((chef) => chef.id !== id));
	};
	const deleteRecipe = async (id) => {
		await axios.delete(`/api/recipes/${id}`);
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	};
	return (
		<div>
			<h1>
				<a href="#">Acme Bakery</a>
			</h1>
			{view === 'chef' && (
				<ChefEdit chef={chefs.find((chef) => chef.id === params.id)} recipes={recipes} update={updateChef} />
			)}
			{view === 'recipe' && (
				<RecipeEdit
					recipe={recipes.find((recipe) => recipe.id === params.id)}
					chefs={chefs}
					update={updateRecipe}
				/>
			)}
			{!view && (
				<div>
					<ChefForm create={createChef} />
					<Chefs chefs={chefs} recipes={recipes} deleteIt={deleteChef} />
					<RecipeForm create={createRecipe} chefs={chefs} />
					<Recipes recipes={recipes} chefs={chefs} deleteIt={deleteRecipe} />
				</div>
			)}
		</div>
	);
};

export default App;
