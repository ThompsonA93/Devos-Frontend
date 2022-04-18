import Head from 'next/head'
import Layout from '../components/layout'

import '../styles/globals.css'
import 'bulma/css/bulma.css'


function MyApp({ Component, pageProps }) {

  return (
    <>
      <div>
        <Head>
          <title>DevoClient</title>
          <meta name='description' content='Devos Web3-Frontend' />
        </Head>
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
