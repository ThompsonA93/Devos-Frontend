import { useContext } from 'react';
import Link from 'next/link';

import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

Report.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Report() {
  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Report an Error</p>
        </div>
      </section>
      <div className="container">
        <section className="section">
          <h2 className="subtitle">Report an error in the app</h2>
        </section>
      </div>
    </div>
  );
}
