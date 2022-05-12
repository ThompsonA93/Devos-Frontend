import ConfigDetails from '../component/ConfigDetails';
import ConfigForm from '../component/ConfigForm';
import PollList from '../component/PollList';

const Home = () => {
  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">
            Home
          </p>
        </div>
      </section>
      <div className='container'>
        <section className="section">
          <h2 className="subtitle">Welcome back</h2>
          <h3>Your latest Polls</h3>
          {/*
            <PollListUser />
          */}
          <PollList />
        </section>
        <section className="section">
          <h2 className="subtitle">System Pulse</h2>
            <ConfigDetails />
            <ConfigForm />
        </section>
      </div>
    </div>
  )
}

export default Home;