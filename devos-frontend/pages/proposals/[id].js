import { useContext } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import { DataContext } from '../../context/DataContext';

import Layout from '../../components/layout/PrimaryLayout';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';

Proposal.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Proposal() {
  const { idbContractCache, voteYes, voteNo } = useContext(DataContext);
  const router = useRouter();

  return idbContractCache.map((poll) => {
    if (poll.id == router.query.id) {
      console.log('Rendering Ballot' + poll.id + ' - ' + poll.title);
      return (
        <div>
          <section className="hero is-small has-background-grey">
            <div className="hero-body">
              <p className="title has-text-white">Proposal #{poll.id}</p>
            </div>
          </section>
          <div className="container mt-5">
            <h1 className="title">{poll.title}</h1>
            <h2 className="subtitle">by {poll.creator}</h2>
            <div className="section">
              {poll.metaInfo}
              <div className="mt-5">Voting ends on {poll.endDate} days</div>
            </div>
            <div className="field is-grouped">
              <p className="control">
                <button
                  onClick={() => voteYes(poll.id)}
                  className="button is-large is-success"
                >
                  Vote Yes
                </button>
              </p>
              <p className="control">
                <button
                  onClick={() => voteNo(poll.id)}
                  className="button is-large is-danger"
                >
                  Vote No
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }
  });
}
