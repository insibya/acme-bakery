import React from 'react';

const Chefs = ({ chefs, recipes }) => {
	return (
		<div>
			<h2>Chefs ({chefs.length})</h2>
			<ul>
				{chefs.map((chef) => {
					return <li key={chef.id}> {chef.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default Chefs;
