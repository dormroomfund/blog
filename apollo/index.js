import { ApolloClient, InMemoryCache } from "@apollo/client"; // Apollo client

// Create new Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WP_URL,
  // With in memory caching
  cache: new InMemoryCache(),
});

// Export client
export default client;
