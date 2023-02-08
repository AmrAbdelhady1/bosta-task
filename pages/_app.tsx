import React from 'react';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Layout } from '@/components'
import '@/styles/globals.css'
import './../i18n.tsx'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
