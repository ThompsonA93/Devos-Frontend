import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import Layout from '../components/layout'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  // Workaround for Bootstrap given missing window/document objects. TODO :: Find workaround
  useEffect (() => {
    import ("bootstrap/dist/js/bootstrap")
  })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
