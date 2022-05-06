import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { PollContext } from '../../context/PollContext';
import { W3Context } from '../../context/W3Context';

const Proposal = () => {
    const { polls } = useContext(PollContext);
    const router = useRouter();

    return (
        polls.map(poll => {
            if (poll.id == router.query.id) {
                return (
                    <div>
                        <section className="hero is-small has-background-grey">
                            <div className="hero-body">
                                <p className="title has-text-white">
                                    Proposal #{poll.id}
                                </p>
                            </div>
                        </section>
                        <div className='container mt-5'>
                            <h1 className="title">{poll.title}</h1>
                            <h2 className="subtitle">by {poll.creator}</h2>
                            <div className='section'>
                                {poll.metainfo}
                                <div className='mt-5'>Voting ends in {poll.votingDays} days</div>
                            </div>
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button is-large is-success">Vote Yes</button>
                                </p>
                                <p className="control">
                                    <button className="button is-large is-danger">Vote No</button>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    )
}

export default Proposal;