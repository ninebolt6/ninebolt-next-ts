import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head'
import usePageView from 'hooks/usePageView';

import 'styles/tailwind.scss';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/> {/* experimental */}
        <meta name="description" content={pageProps.desc ? pageProps.desc : "Nineboltのページです。"}/>
        <meta name="robots" content="noindex,nofollow,noarchive" />
        <title>{pageProps.title ? pageProps.title + " - Ninebolt" : "Ninebolt"}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp;
