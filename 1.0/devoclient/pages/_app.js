import Head from 'next/head'
import Layout from '../component/Layout'
import W3ContextProvider from '../context/W3Context'

import '../styles/globals.css'
import 'bulma/css/bulma.css'
import PollContextProvider from '../context/PollContext'
import RemoteAPIContextProvider from '../context/RemoteAPIContext'


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
          <RemoteAPIContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RemoteAPIContextProvider>
        </PollContextProvider>
      </W3ContextProvider>
    </>
  )
}

export default MyApp;
