import type { AppProps } from 'next/app';
import '@portkey/did-ui-react/dist/assets/index.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
