import React, { useContext } from 'react';
import { PollContext } from '../context/PollContext';
import PollDetails from './PollDetails';

const PollList = () => {
    const {polls} = useContext(PollContext);

    return (
        <dl className='m-4'>
            {polls.map(poll => {
                    return (
                        <PollDetails poll={poll} key={poll.id}/>
                    )
                })}
        </dl>
    )
}

export default PollList;