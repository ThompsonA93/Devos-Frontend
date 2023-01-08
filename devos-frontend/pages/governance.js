import { useContext } from 'react';
import Link from 'next/link';

import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';
import PollList from '../components/page/PollList';

import { DataContext } from '../context/DataContext';

Governance.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Governance() {
  const { address } = useContext(DataContext);

  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Governance Overview</p>
        </div>
      </section>
      <div className="container mt-5">
        {address !== '' ? (
          <>
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
            <div className="container mt-5">
              <h2 className="subtitle">Latest Proposals</h2>
              <PollList />
            </div>
          </>
        ) : (
          <>
            <h2 className="subtitle">Welcome back</h2>
            <h3>Please login to MetaMask to use DeVoS.</h3>
            <p>
              If it is your first time using DeVoS,{' '}
              <Link href="/help">follow this link</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
