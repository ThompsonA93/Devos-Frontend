import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

export default function Index() {
  return <section>Hello from Index</section>;
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};
