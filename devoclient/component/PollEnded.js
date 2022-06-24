import React, { useContext } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollEnded = () => {
    const { idbContractCache } = useContext(W3Context);

    return (
        <dl className='m-4'>
            {idbContractCache.map(ballot => {
                //console.log("\t\tRendering Ballot: " + poll.id + " | " + poll.title);
                return ballot.endTime <=  new Date().toLocaleString() ? (
                    <PollDetails ballot={ballot} key={ballot.id}/>
                    ) : (
                    <></>
                )
            })}
        </dl>
    )
}

export default PollEnded;