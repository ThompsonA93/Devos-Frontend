import '../styles/globals.css';
import W3Context from '/context/W3Context';
import 'bulma/css/bulma.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return <W3Context>{getLayout(<Component {...pageProps} />)}</W3Context>;
}
