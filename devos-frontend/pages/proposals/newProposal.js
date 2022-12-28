import Layout from '../../components/layout/PrimaryLayout';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';
import BallotForm from '../../components/page/BallotForm';

newProposal.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function newProposal() {
  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Create a new Proposal</p>
        </div>
      </section>
      <div className="container">
        <BallotForm />
      </div>
    </div>
  );
}
