import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chefs from './Chefs';
import Recipes from './Recipes';

const App = () => {
	const [ chefs, setChefs ] = useState([]);
	const [ recipes, setRecipes ] = useState([]);
	useEffect(() => {
		Promise.all([ axios.get('/api/chefs'), axios.get('/api/recipes') ]).then((responses) => {
			setChefs(responses[0].data);
			setRecipes(responses[1].data);
		});
	}, []);
	return (
		<div>
			<h1>Acme Bakery</h1>
			<Chefs chefs={chefs} recipes={recipes} />
			<Recipes recipes={recipes} chefs={chefs} />
		</div>
	);
};

export default App;
