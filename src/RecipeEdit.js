import React, { useState, useEffect } from 'react';

const RecipeEdit = ({ update, chefs, recipe }) => {
	const [ name, setName ] = useState('');
	const [ chefId, setChefId ] = useState('');

	useEffect(
		() => {
			if (recipe) {
				setName(recipe.name);
				setChefId(recipe.chefId);
			}
		},
		[ recipe ]
	);

	const onSubmit = (ev) => {
		ev.preventDefault();
		update({ ...recipe, name, chefId }).then(() => {
			window.location.hash = '#';
			setName('');
			setChefId('');
		});
	};
	return (
		<form onSubmit={onSubmit}>
			<h2>Edit Recipe</h2>
			<input value={name} onChange={(ev) => setName(ev.target.value)} />
			<select value={chefId} onChange={(ev) => setChefId(ev.target.value)}>
				<option value="">-- Choose a Chef --</option>
				{chefs.map((chef) => {
					return (
						<option value={chef.id} key={chef.id}>
							{chef.name}
						</option>
					);
				})}
			</select>
			<button disabled={!name || (recipe && recipe.name === name && recipe.chefId === chefId)}>Update</button>
			<a href="#">Cancel</a>
		</form>
	);
};

export default RecipeEdit;
