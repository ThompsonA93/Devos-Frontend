import { useContext } from 'react';
import Link from 'next/link';

import { DataContext } from '../context/DataContext';

import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';
import UserPoll from '../components/page/UserPoll';

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Index() {
  const { address } = useContext(DataContext);

  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Home</p>
        </div>
      </section>
      <div className="container">
        <section className="section">
          {address !== '' ? (
            <>
              <h2 className="subtitle">Welcome back {address}</h2>
              <h3>Your latest Polls</h3>
              <UserPoll />
            </>
          ) : (
            <>
              <h2 className="subtitle">Welcome back</h2>
              <p>Please login to MetaMask to use DeVoS.</p>
              <p>
                If it is your first time using DeVoS,{' '}
                <Link href="/help">follow this link</Link>
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
