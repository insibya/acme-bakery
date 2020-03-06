import React from 'react';

const Recipes = ({ chefs, recipes }) => {
	return (
		<div>
			<h2>Recipes ({recipes.length})</h2>
			<ul>
				{recipes.map((recipe) => {
					return <li key={recipe.id}> {recipe.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default Recipes;
