import Link from 'next/link'
import PollListTotal from '../component/PollListTotal';
import PollListRunning from '../component/PollListRunning';
import PollListComplete from '../component/PollListComplete';

const Governance = () => {
    return (
        <div>
            <section className="hero is-small has-background-grey">
                <div className="hero-body">
                    <p className="title has-text-white">
                        Governance Overview
                    </p>
                </div>
            </section>
            <div className="container mt-5">
                <div className="buttons is-centered">
                    <Link href="/proposals/newProposal">
                        <button className="btn rounded m-1 gbtn-blue gbtn-transit">
                            <h4 className="pt-1">Create new Proposal</h4>
                            <p>Create a new proposal to the community.</p>
                        </button>
                    </Link>
                    <Link href="/proposals">
                        <button className="btn rounded m-1 gbtn-yellow gbtn-transit">
                            <h4 className="pt-1">Show all proposals </h4>
                            <p>Looking for some other proposal? View here.</p>
                        </button>
                    </Link>
                    <Link href="/help">
                        <button className="btn rounded m-1 gbtn-green gbtn-transit ">
                            <h4 className="pt-1">Help </h4>
                            <p>Need help? Click this!</p>
                        </button>
                    </Link>
                    <Link href="/report">
                        <button className="btn rounded m-1 gbtn-red gbtn-transit">
                            <h4 className="pt-1">Report an error </h4>
                            <p>Found something odd? Contact us.</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container mt-5">
                <h2 className="subtitle">Total Proposals</h2>
                <PollListTotal />
                
                <h2 className="subtitle">Running Proposals</h2>
                <PollListRunning />

                <h2 className="subtitle">Completed Proposals</h2>
                <PollListComplete />
            </div>
        </div>
    )
}

export default Governance;

