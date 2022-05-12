import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollListComplete = () => {
    const { completedPolls } = useContext(PollContext);

    return (
        <dl className='m-4'>
            {completedPolls.map(poll => {
                console.log("\tCompleted Ballots: " + poll.id + " | " + poll.title);
                return (
                    <PollDetails poll={poll} key={poll.id} />
                )
            })}
        </dl>
    )
}

export default PollListComplete;