import Link from "next/link"; // Dynamic routing
import { getAllPosts } from "utils"; // Clean GraphQL response
import Layout from "components/Layout"; // Layout wrapper
import { request, gql } from "graphql-request"; // GraphQL request library

// Collect all posts from WordPress
const ALL_POSTS = gql`
  {
    posts {
      nodes {
        title
        uri
        excerpt
        featuredImage {
          node {
            uri
          }
        }
      }
    }
  }
`;

export default function Home({ posts }) {
  return (
    <Layout>
      <h1>All posts:</h1>
      {posts.map((post, i) => {
        return (
          <Link key={i} href={post.uri}>
            <a>
              <img src={post.featuredImage} alt="Feature image" />
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          </Link>
        );
      })}
    </Layout>
  );
}

/**
 * Server-side render, pull posts
 */
export async function getServerSideProps() {
  const res = await request("http://104.196.157.57/graphql", ALL_POSTS); // Collect posts
  const posts = await getAllPosts(res); // Clean response GraphQL

  // Return posts to page
  return { props: { posts: posts } };
}
