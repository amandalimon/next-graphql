import { ApolloClient, InMemoryCache } from '@apollo/client'

const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000/'

const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avo: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            }
          }
        }
      }
    }
  }),
})

export default client
