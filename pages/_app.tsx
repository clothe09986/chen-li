import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.HASURA_API,
  headers: {
    'x-hasura-admin-secret': String(process.env.HASURA_API_SECRET),
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </>
  )
}

export default MyApp
