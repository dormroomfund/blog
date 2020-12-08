import { ApolloClient, InMemoryCache } from "@apollo/client"; // Apollo client

// Apollo cache override (for running in getServerSideProps)
const noCache = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

// Create new Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WP_URL,
  // Setup required in-memory cache
  cache: new InMemoryCache(),
  // Override in-memory cache with query overrides
  defaultOptions: noCache,
});

// Export client
export default client;
