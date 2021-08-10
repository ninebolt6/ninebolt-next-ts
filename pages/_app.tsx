import '../styles/globals.css';
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/components/navigation/navigation.scss';
import '../node_modules/swiper/components/pagination/pagination.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Ninebolt</title>
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp;
