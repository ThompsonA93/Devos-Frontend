import React, { useContext, useEffect, useState } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollUser = () => {
    const { idbContractCache, address } = useContext(W3Context);

    useEffect(() => {
        // Just reload on Cache-Change
        console.log("PollUser::Reloading following idbContractCache-Chance", idbContractCache);
    }, [idbContractCache]);

    return (
        <dl className='m-4'>
            {   
                idbContractCache.map(ballot => {
                    console.log("Filtering on creator: " + ballot.creator);
                    return ballot.creator === address ? (
                        <PollDetails ballot={ballot} key={ballot.id}/>
                    ) : (
                        <></>
                    )
                })
            }
            
            {
            /* {localBallots.map(poll => {
                //console.log("\t\tCheck to render user ballot: \n\t" + poll.id + " || "+ poll.creator +  ":" + address);
                return poll.creator === address ? (
                    <PollDetails poll={poll} key={poll.id} />
                ) : (
                    <></>
                )
            })} */
            }
        </dl>
    )
}

export default PollUser;