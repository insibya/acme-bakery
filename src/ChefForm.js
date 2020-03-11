import React, { useState } from 'react';

const ChefForm = ({ create }) => {
	const [ name, setName ] = useState('');
	const onSubmit = (ev) => {
		ev.preventDefault();
		create({ name }).then(() => {
			setName('');
		});
	};
	return (
		<form onSubmit={onSubmit}>
			<h2>Create Chef</h2>
			<input value={name} onChange={(ev) => setName(ev.target.value)} />
			<button disabled={!name}>Create</button>
		</form>
	);
};

export default ChefForm;
