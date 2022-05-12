import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollListRunning = () => {
    const { runningPolls } = useContext(PollContext);

    return (
        <dl className='m-4'>
            {runningPolls.map(poll => {
                console.log("\tRunning Ballot: " + poll.id + " | " + poll.title);
                return (
                    <PollDetails poll={poll} key={poll.id} />
                )
            })}
        </dl>
    )
}

export default PollListRunning;