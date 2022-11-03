import { useContext } from 'react';
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
  return <>Lots to be refactored.</>;
}
