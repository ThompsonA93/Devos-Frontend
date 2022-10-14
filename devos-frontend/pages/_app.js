import '../styles/globals.css';
import DataContext from '/context/DataContext';
import 'bulma/css/bulma.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return <DataContext>{getLayout(<Component {...pageProps} />)}</DataContext>;
}
