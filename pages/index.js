import Link from "next/link"; // Dynamic routing
import { getAllPosts } from "utils"; // Clean GraphQL response
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/Home.module.css"; // Component module styling
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
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export default function Home({ posts }) {
  return (
    <Layout>
      <div className={styles.head}>
        <div>
          <div>
            <h1>Final Draft.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div>
            <img
              src="https://www.dormroomfund.com/_next/static/images/community-photo-e21bc4920c77d7d3eec48547ba87c3b2.jpg"
              alt="DRF"
            />
          </div>
        </div>
      </div>
      <Link href={posts[0].uri}>
        <a className={styles.feature}>
          <img src={posts[0].featuredImage} alt="Featured article image" />
          <div>
            <h2>{posts[0].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
          </div>
        </a>
      </Link>
      <div className={styles.posts}>
        {posts.slice(1).map((post, i) => {
          return (
            <Link href={post.uri} key={i}>
              <a>
                <img src={post.featuredImage} alt="Featured image" />
                <div>
                  <h3>{post.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

/**
 * Server-side render, pull posts
 */
export async function getServerSideProps() {
  const res = await request(process.env.NEXT_PUBLIC_WP_URL, ALL_POSTS); // Collect posts
  const posts = await getAllPosts(res); // Clean response GraphQL

  // Return posts to page
  return { props: { posts: posts } };
}
