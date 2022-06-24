import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { W3Context } from '../../context/W3Context';

const Proposal = () => {
    const { idbContractCache, voteYes, voteNo } = useContext(W3Context);
    const router = useRouter();

    return (
        idbContractCache.map(ballot => {
            if (ballot.id == router.query.id) {
                console.log("Proposal::Rendering ballot [" + ballot.id + " - " + ballot.title + "]");
                return (
                    <div>
                        <section className="hero is-small has-background-grey">
                            <div className="hero-body">
                                <p className="title has-text-white">
                                    Proposal #{ballot.id}
                                </p>
                            </div>
                        </section>
                        <div className='container mt-5'>
                            <h1 className="title">{ballot.title}</h1>
                            <h2 className="subtitle">by {ballot.creator}</h2>
                            <div className='section'>
                                {ballot.metaInfo}
                                <div className='mt-5'>Voting ends on {ballot.endTime}</div>
                            </div>
                            {
                                ballot.endTime <= new Date().toLocaleString() ? (
                                    <>
                                        <div>The voting has concluded.</div>
                                        <h3>{ballot.proVotes} have voted in favor, {ballot.totalVotes - ballot.proVotes} have voted against.</h3>
                                    </>
                                ) : (
                                    <div className="field is-grouped">
                                        <p className="control">
                                            <button onClick={() => voteYes(ballot.id)} className="button is-large is-success">Vote Yes</button>
                                        </p>
                                        <p className="control">
                                            <button onClick={() => voteNo(ballot.id)} className="button is-large is-danger">Vote No</button>
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        })
    )
}

export default Proposal;