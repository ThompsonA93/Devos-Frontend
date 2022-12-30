import Image from 'next/image';

import Layout from '../components/layout/PrimaryLayout';
import Footer from '../components/navigation/Footer';
import Navbar from '../components/navigation/Navbar';

Help.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};

export default function Help() {
  return (
    <div>
      <section className="hero is-small has-background-grey">
        <div className="hero-body">
          <p className="title has-text-white">Help</p>
        </div>
      </section>
      <div className="container">
        <section className="section">
          <h2 className="subtitle is-size-2">The Project</h2>
          <p className="m-3">
            The goal of this research project, DeVoS, is the fundamental
            analysis, specification and creation of a full-fledged DLT-Voting
            system conforming to constitutional rights and requirements for
            effective use in future democratic systems. The resulting knowledge
            of both the thesis and the project will aid any present and future,
            democratic governments in their implementation of voting
            functionalities in pursuit for a true, transparent, free, equal and
            direct democracy.
          </p>
        </section>
        <section className="section">
          <h2 className="subtitle is-size-2">Getting Started</h2>
          <h3 className="is-size-4 m-2">1. Installing MetaMask</h3>
          <p className="m-3">
            First, you need to install MetaMask, a Browser-Plugin that allows
            you to connect to blockchain systems.
          </p>
          <a href="https://metamask.io/" target="_blank" rel="noreferrer">
            <div className="box">
              <figure className="image is-3by1">
                <Image src="/MetaMask.svg" alt="MetaMask.svg" layout="fill" />
                Click here to download MetaMask now!
              </figure>
            </div>
          </a>
          <h3 className="is-size-4 m-2">2. Create a Wallet</h3>
          <p className="m-3">
            The first step after installing MetaMask is the setup of the Wallet.
          </p>
          <p className="m-3">
            MetaMask will guide you accordingly through the setup.
          </p>
          <h3 className="is-size-4 m-2">
            3. Connect to the Sepolia test network
          </h3>
          <p className="m-3">
            Once Metamask is installed, you need to select and connect to the
            correct Network.
          </p>
          <p className="m-3">
            As of December, 2022, DeVoS is deployed within the Sepolia Network.
          </p>

          <div className="columns m-5">
            <div
              className="column is-one-quarter m-5"
              style={{ width: '20%', height: '400px', position: 'relative' }}
            >
              <Image
                src="/MetaMask_Setup00.jpg"
                alt="MetaMask_Setup00.jpg"
                layout="fill"
              />
            </div>
            <div
              className="column is-one-quarter m-5"
              style={{ width: '20%', height: '400px', position: 'relative' }}
            >
              <Image
                src="/MetaMask_Setup01.jpg"
                alt="MetaMask_Setup01.jpg"
                layout="fill"
              />
            </div>
            <div
              className="column is-one-quarter m-5"
              style={{ width: '20%', height: '400px', position: 'relative' }}
            >
              <Image
                src="/MetaMask_Setup02.jpg"
                alt="MetaMask_Setup02.jpg"
                layout="fill"
              />
            </div>
            <div
              className="column is-one-quarter m-5"
              style={{ width: '20%', height: '400px', position: 'relative' }}
            >
              <Image
                src="/MetaMask_Setup03.jpg"
                alt="MetaMask_Setup03.jpg"
                layout="fill"
              />
            </div>
          </div>

          <h3 className="is-size-4 m-2">4. Request Ethereum Tokens</h3>
          <p className="m-3">
            In order to vote on DeVoS, you require some of the networks native
            Tokens - Ethereum.
          </p>
          <p className="m-3">
            For the Sepolia test network, you can use one of the following
            faucets:
          </p>
          <li>
            The Chainlink-Faucet:{' '}
            <a href="https://faucets.chain.link/">
              https://faucets.chain.link/
            </a>
          </li>
          <li>
            The Alchemy-Faucet:{' '}
            <a href="https://rinkebyfaucet.com/">https://rinkebyfaucet.com/</a>
          </li>
          <h3 className="is-size-4 m-2">5. Use the DeVoS-System</h3>
          <p className="m-3">
            After receiving some Ethereum on the Sepolia network, you can freely
            route through the webpage and commence voting.
          </p>
        </section>
      </div>
    </div>
  );
}
