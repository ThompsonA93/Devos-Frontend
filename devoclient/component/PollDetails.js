import Link from 'next/link';
import React from 'react';


const PollDetails = ({ poll }) => {

    return (
        <div className='m-2'>
            <dt>{poll.title}, by {poll.creator}</dt>
            <dd>{poll.metainfo}</dd>
            <dd>Voting available until [{poll.endDate}]</dd>
            <Link href={{pathname: `/proposals/[id]`, query: {id: poll.id}}}>            
            <dd><button className='button is-link is-small is-inverted'>Vote Now!</button></dd>
            </Link>
        </div>

    );
}

export default PollDetails;