import Link from 'next/link';
import React from 'react';


const PollDetails = ({ ballot }) => {

    return (
        <div className='m-2'>
            <dt>{ballot.title}, by {ballot.creator}</dt>
            <dd>{ballot.metainfo}</dd>
            <dd>Voting available until [{ballot.endTime}]</dd>
            <dd>{ballot.totalVotes} have voted, {ballot.proVotes} voted in favor.</dd>
            <Link href={{pathname: `/proposals/[id]`, query: {id: ballot.id}}}>            
            <dd>
                <button className='button is-link is-small is-inverted'>Vote Now!</button></dd>
            </Link>
        </div>
    );
}

export default PollDetails;