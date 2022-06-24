import React, { useContext, useEffect, useState } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollUser = () => {
    const { idbContractCache, address } = useContext(W3Context);

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
        </dl>
    )
}

export default PollUser;