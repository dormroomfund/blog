import { ApolloClient, InMemoryCache } from "@apollo/client"; // Apollo client

// Create new Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WP_URL,
  // Setup temporary cache
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

// Export client
export default client;
