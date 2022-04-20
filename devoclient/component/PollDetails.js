import Link from 'next/link';
import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';


const PollDetails = ({ poll }) => {
    const { removePoll } = useContext(PollContext);

    return (
        <div className='m-2'>
            <dt>{poll.title}, by {poll.author}</dt>
            <dd>{poll.description}</dd>
            <Link href={{pathname: `/proposals/[id]`, query: {id: poll.id}}}>            
            <dd><button className='button is-link is-small is-inverted'>Vote Now!</button></dd>
            </Link>
        </div>

    );
}

export default PollDetails;