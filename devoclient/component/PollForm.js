import React, { useContext, useState } from 'react';
import { PollContext } from '../context/PollContext';
import { W3Context } from '../context/W3Context';

const NewPollForm = () => {
    const { createPoll } = useContext(PollContext);
    const { getAddress, deployToChain } = useContext(W3Context);

    const [title, setTitle] = useState('');
    const [metainfo, setMetainfo] = useState('');
    const [votingDays, setVotingDays] = useState('');

    const submitHandler = (e) => {
        e.preventDefault(); // Avoid reloading

        var creator = getAddress();
        createPoll(creator, title, metainfo, votingDays);
        deployToChain(title, metainfo, votingDays);

        // Reset data to default
        setTitle('');
        setMetainfo('');
        setVotingDays('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="field m-4">
                <label className="label">Poll title</label>
                <div className="control">
                    <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" />
                </div>
            </div>
            <div className="field m-4">
                <label className="label">Message</label>
                <div className="control">
                    <textarea className="textarea" placeholder='Description' value={metainfo} onChange={(e) => setMetainfo(e.target.value)} required ></textarea>
                </div>
            </div>
            <div className="field m-4">
                <label className="label">Voting Time</label>
                <div className="control">
                    <input className="input" type="text" placeholder='Voting Days' value={votingDays} onChange={(e) => setVotingDays(e.target.value)} required />
                </div>
            </div>

            <div className="field">
                <div className="control m-4">
                    <label className="checkbox">
                        <input type="checkbox" />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>
            <div className="field is-grouped m-4">
                <div className="control">
                    <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default NewPollForm;


/** Kept for reference
            <input type="text" placeholder='Poll title' value={title}
                onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder='Description' value={metainfo}
                onChange={(e) => setMetainfo(e.target.value)} required />
            <input type="text" placeholder='Voting Days' value={votingDays}
                onChange={(e) => setVotingDays(e.target.value)} required />
            <input type="submit" value="Create Proposal" />
 */