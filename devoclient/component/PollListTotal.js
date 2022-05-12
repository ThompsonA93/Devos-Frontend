import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollListTotal = () => {
    const { totalPolls } = useContext(PollContext);

    

    return (
        <dl className='m-4'>
            {totalPolls.map(poll => {
                console.log("\Total Ballot: " + poll.id + " | " + poll.title);
                return (
                    <PollDetails poll={poll} key={poll.id} />
                )
            })}
        </dl>
    )
}

export default PollListTotal;