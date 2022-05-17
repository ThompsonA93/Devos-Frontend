import React, { useContext } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollUser = () => {
    const { address, localBallots } = useContext(W3Context);

    return (
        <dl className='m-4'>
            {localBallots.map(poll => {
                //console.log("\t\tCheck to render user ballot: \n\t" + poll.id + " || "+ poll.creator +  ":" + address);
                return poll.creator === address ? (
                    <PollDetails poll={poll} key={poll.id} />
                ) : (
                    <></>
                )
            })}
        </dl>
    )
}

export default PollUser;