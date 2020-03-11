import React from 'react';

const Chefs = ({ chefs, recipes, deleteIt }) => {
	return (
		<div>
			<h2>Chefs ({chefs.length})</h2>
			<ul>
				{chefs.map((chef) => {
					const filtered = recipes.filter((recipe) => recipe.chefId === chef.id);
					return (
						<li key={chef.id}>
							<a href={`#view=chef&id=${chef.id}`}>{chef.name}</a>
							{filtered.length === 0 && <button onClick={() => deleteIt(chef.id)}>x</button>}
							<ul>
								{filtered.map((recipe) => {
									return <li key={recipe.id}>{recipe.name}</li>;
								})}
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Chefs;
