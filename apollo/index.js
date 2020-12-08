import { ApolloClient } from "@apollo/client"; // Apollo client

// Create new Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WP_URL,
});

// Export client
export default client;
