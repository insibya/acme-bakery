import React, { useState } from 'react';

const RecipeForm = ({ create, chefs }) => {
	const [ name, setName ] = useState('');
	const [ chefId, setChefId ] = useState('');
	const onSubmit = (ev) => {
		ev.preventDefault();
		create({ name, chefId }).then(() => {
			setName('');
			setChefId('');
		});
	};
	return (
		<form onSubmit={onSubmit}>
			<h2>Create Recipe</h2>
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
			<button disabled={!name || !chefId}>Create</button>
		</form>
	);
};

export default RecipeForm;
