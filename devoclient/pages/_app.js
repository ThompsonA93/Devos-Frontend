import Head from 'next/head'
import Layout from '../component/Layout'
import W3ContextProvider from '../context/W3Context'

import '../styles/globals.css'
import 'bulma/css/bulma.css'
import PollContextProvider from '../context/PollContext'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Head>
          <title>DevoClient</title>
          <meta name='description' content='Devos Web3-Frontend' />
        </Head>
      </div>
      <W3ContextProvider>
        <PollContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PollContextProvider>
      </W3ContextProvider>
    </>
  )
}

export default MyApp;
