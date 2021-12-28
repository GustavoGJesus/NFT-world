import { AppProps} from 'next/app';
import { Header } from '../components/Header';
import { MoralisProvider } from 'react-moralis';

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  <Header />
  return( 
    <MoralisProvider 
    appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_ID}
    >
      <Header />
      <Component {...pageProps} />
    </MoralisProvider>
  
    )
}

export default MyApp;
