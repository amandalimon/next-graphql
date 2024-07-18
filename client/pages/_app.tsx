import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'
import CartProvider from '@store/Cart'

const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000/'

const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
