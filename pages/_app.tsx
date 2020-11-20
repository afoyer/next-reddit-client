import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"/>
    </Head>
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
    </Provider>
    </>)
}

export default MyApp
