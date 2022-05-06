import NewPollForm from "../../component/PollForm";

const newProposal = () => {
    return (
        <div>
            <section className="hero is-small has-background-grey">
                <div className="hero-body">
                    <p className="title has-text-white">
                        Create a new Proposal
                    </p>
                </div>
            </section>
            <div className="container">
                <NewPollForm />
            </div>
        </div>
    )
}

export default newProposal;