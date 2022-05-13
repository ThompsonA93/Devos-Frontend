import { W3Context } from '../context/W3Context';
import { useContext } from 'react';
import PollList from '../component/PollList';

const Proposals = () => {
  const { address } = useContext(W3Context);


  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">
            Proposals
          </p>
        </div>
      </section>
      <div className='container'>

        <section className="section">

          {
            address !== '' ? (
              <>
                <h2 className="subtitle">Overview of all proposals</h2>
                <PollList />
              </>
            ) : (
              <>
                <h2 className="subtitle">Overview of all proposals</h2>
                <div>Please login to MetaMask to use DeVoS.</div>
              </>
            )
          }
        </section>
      </div>
    </div>
  )
}

export default Proposals;