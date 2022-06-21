import { useContext } from 'react';
import ConfigDetails from '../component/ConfigDetails';
import ConfigForm from '../component/ConfigForm';
import PollUser from '../component/PollUser';
import Link from 'next/link'

import { W3Context } from '../context/W3Context';


const Home = () => {
  const { address } = useContext(W3Context);
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
          {
            address !== '' ? (
              <>
                <h2 className="subtitle">Welcome back {address}</h2>
                <h3>Your latest Polls</h3>
                <PollUser />
              </>
            ) : (
              <>
                <h2 className="subtitle">Welcome back</h2>
                <p>Please login to MetaMask to use DeVoS.</p>
                <p>If it is your first time using DeVoS, <Link href="/help">follow this link</Link></p>
              </>
            )
          }
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