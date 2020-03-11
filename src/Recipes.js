import React from 'react';

const Recipes = ({ chefs, recipes, deleteIt }) => {
	return (
		<div>
			<h2>Recipes ({recipes.length})</h2>
			<ul>
				{recipes.map((recipe) => {
					const chef = chefs.find((chef) => chef.id === recipe.chefId);
					return (
						<li key={recipe.id}>
							<a href={`#view=recipe&id=${recipe.id}`}>{recipe.name}</a> by {!!chef && chef.name}
							<button onClick={() => deleteIt(recipe.id)}>x</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Recipes;
