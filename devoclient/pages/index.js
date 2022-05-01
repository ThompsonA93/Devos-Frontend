import PollList from '../component/PollList'
import W3List from '../component/W3List'

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
          <h3>Latest Polls</h3>
          <PollList />
        </section>
        <section className="section">
          <h2 className="subtitle">System Pulse</h2>
          <W3List />
        </section>
      </div>
    </div>
  )
}

export default Home;