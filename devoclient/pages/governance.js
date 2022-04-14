const Governance = () => {
    return (
        <div>
            <h1>Governance Overview</h1>
            <div>
                <div>
                    <div>
                        <h3>Total Proposals:</h3>
                        <p> Fetching ...</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Running Proposals</h5>
                        <p>Fetching ...</p>
                    </div>
                    <div>
                        <h5>Completed Proposals</h5>
                        <p>Fetching ...</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <ul>
                        <li>Proposal #1</li>
                        <li>Proposal #2</li>
                        <li>Proposal #3</li>
                        <li>Proposal #4</li>
                        <li>Proposal #5</li>
                    </ul>
                </div>
                <div>
                    <div class="btn-group">
                        <a href="/">
                            <button class="btn rounded m-1 gbtn-blue gbtn-transit">
                                <h4 class="pt-1">Create new Proposal</h4>
                                <p>Create a new proposal to the community.</p>
                            </button>
                        </a>
                        <a href="/">
                            <button class="btn rounded m-1 gbtn-yellow gbtn-transit">
                                <h4 class="pt-1">Show all proposals </h4>
                                <p>Looking for some other proposal? View here.</p>
                            </button>
                        </a>
                    </div>
                    <div class="btn-group">
                        <a href="/">
                            <button class="btn rounded m-1 gbtn-green gbtn-transit ">
                                <h4 class="pt-1">Help </h4>
                                <p>Need help? Click this!</p>
                            </button>
                        </a>
                        <a href="/">
                            <button href class="btn rounded m-1 gbtn-red gbtn-transit">
                                <h4 class="pt-1">Report an error </h4>
                                <p>Found something odd? Contact us.</p>
                            </button>
                        </a>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Governance;