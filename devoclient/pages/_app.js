import Head from 'next/head'
import Layout from '../component/Layout'
import W3ContextProvider from '../context/W3Context'

import '../styles/globals.css'
import 'bulma/css/bulma.css'
import RemoteAPIContextProvider from '../context/RemoteAPIContext'
import IDBContextProvider from '../context/IDBContext'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Head>
          <title>DevoClient</title>
          <meta name='description' content='Devos Web3-Frontend' />
        </Head>
      </div>
      <IDBContextProvider>
        <W3ContextProvider>
          <RemoteAPIContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RemoteAPIContextProvider>
        </W3ContextProvider>
      </IDBContextProvider>

    </>
  )
}

export default MyApp;
