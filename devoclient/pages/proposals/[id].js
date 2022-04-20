import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { PollContext } from '../../context/PollContext';

const Proposal = () => {
    const { polls } = useContext(PollContext);
    const router = useRouter();

    return (
        polls.map(poll => {
            if (poll.id == router.query.id) {
                return (
                    <div className='section'>
                        <div>{poll.title}</div>
                        <div>by {poll.author}</div>
                        <div className='section'>
                            {poll.description}
                        </div>
                        <button>Vote YES</button>
                    </div>
                )
            }
        })
    )


}

export default Proposal;