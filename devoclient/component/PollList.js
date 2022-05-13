import React, { useContext } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollList = () => {
    const { localBallots } = useContext(W3Context);

    return (
        <dl className='m-4'>
            {localBallots.map(poll => {
                console.log("\tBallot: " + poll.id + " | " + poll.title);
                return poll.id >= 0 ? (
                    <PollDetails poll={poll} key={poll.id} />
                ) : (
                    <></>
                )
            })}
        </dl>
    )
}

export default PollList;