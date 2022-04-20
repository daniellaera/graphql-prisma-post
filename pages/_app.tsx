import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api/graphql'
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
