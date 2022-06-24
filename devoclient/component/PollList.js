import React, { useContext } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollList = () => {
    const { idbContractCache } = useContext(W3Context);

    return (
        <dl className='m-4'>
            {idbContractCache.map(ballot => {
                //console.log("\t\tRendering Ballot: " + poll.id + " | " + poll.title);
                return ballot.id >= 0 ? (
                    <PollDetails ballot={ballot} key={ballot.id}/>
                    ) : (
                    <></>
                )
            })}
        </dl>
    )
}

export default PollList;