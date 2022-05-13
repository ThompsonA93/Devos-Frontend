import React, { useContext, useState } from 'react';
import { W3Context } from '../context/W3Context';

const NewPollForm = () => {
    const { address, deployBallotToChain } = useContext(W3Context);

    const [title, setTitle] = useState('');
    const [metainfo, setMetainfo] = useState('');
    const [votingDays, setVotingDays] = useState('');

    const submitHandler = (e) => {
        e.preventDefault(); // Avoid reloading

        if(address){
            deployBallotToChain(title, metainfo, votingDays);
    
            // Reset data to default
            setTitle(''); setMetainfo(''); setVotingDays('');
        }else{
            console.log("User is not logged in to MetaMask")
            alert("Please log in to MetaMask to publish a new Poll");
        }
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
            </div>
        </form>
    )
}

export default NewPollForm;