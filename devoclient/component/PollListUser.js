import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollListUser = () => {
    const { userPolls } = useContext(PollContext);

    return (
        <dl className='m-4'>
            {userPolls.map(poll => {
                console.log("\t User Ballot: " + poll.id + " | " + poll.title);
                return (
                    <PollDetails poll={poll} key={poll.id} />
                )
            })}
        </dl>
    )
}

export default PollListUser;