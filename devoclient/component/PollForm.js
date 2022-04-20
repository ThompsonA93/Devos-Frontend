import React, { useContext, useState } from 'react';
import { PollContext } from '../context/PollContext';
import { W3Context } from '../context/W3Context';

const NewPollForm = () => {
    const { createPoll } = useContext(PollContext);
    const { getAddress } = useContext(W3Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = (e) => {
        e.preventDefault(); // Avoid reloading
        var address = getAddress();
        createPoll(title, address, description);
        // Reset data to default
        setTitle('');
        setDescription('');
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='Poll title' value={title}
            onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder='Description' value={description}
            onChange={(e) => setDescription(e.target.value)} required />
            <input type="submit" value="Create Proposal" />
        </form>
    )
}

export default NewPollForm;