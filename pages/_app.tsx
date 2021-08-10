import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head'

import '../styles/tailwind.css';
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/components/pagination/pagination.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/> {/* experimental */}
      <meta name="description">{pageProps.desc ? pageProps.desc : "Nineboltのページです。"}</meta>
      <title>{pageProps.title ? pageProps.title + " - Ninebolt" : "Ninebolt"}</title>
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp;
