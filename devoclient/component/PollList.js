import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollList = () => {
    const { totalPolls, runningPolls, completedPolls, userPolls } = useContext(PollContext);

    // {votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }
    return (
        <dl className='m-4'>
            {userPolls.map(poll => {
                console.log("Ballot: " + poll.id + " | " + poll.title);
                return (
                    <PollDetails poll={poll} key={poll.id} />
                )
            })}
        </dl>
    )
}

export default PollList;