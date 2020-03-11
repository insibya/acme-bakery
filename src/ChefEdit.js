import React, { useState, useEffect } from 'react';

const ChefEdit = ({ update, chef }) => {
	const [ name, setName ] = useState('');

	useEffect(
		() => {
			if (chef) {
				setName(chef.name);
			}
		},
		[ chef ]
	);

	const onSubmit = (ev) => {
		ev.preventDefault();
		update({ ...chef, name }).then(() => {
			window.location.hash = '#';
			setName('');
		});
	};
	return (
		<form onSubmit={onSubmit}>
			<h2>Edit Chef</h2>
			<input value={name} onChange={(ev) => setName(ev.target.value)} />
			<button disabled={!name || (chef && chef.name === name)}>Update</button>
			<a href="#">Cancel</a>
		</form>
	);
};

export default ChefEdit;
