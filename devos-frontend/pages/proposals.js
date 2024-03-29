import { useContext } from 'react';

import { DataContext } from '../context/DataContext';

import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';
import PollList from '../components/page/PollList';

Proposals.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Proposals() {
  const { address } = useContext(DataContext);

  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Proposals</p>
        </div>
      </section>
      <div className="container">
        <section className="section">
          {address !== '' ? (
            <>
              <h2 className="subtitle">Overview of all proposals</h2>
              <h3>Current Proposals</h3>
              <PollList />
            </>
          ) : (
            <>
              <h2 className="subtitle">Overview of all proposals</h2>
              <div>Please login to MetaMask to use DeVoS.</div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
