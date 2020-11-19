import client from "apollo"; // Apollo GraphQL client
import Link from "next/link"; // Dynamic routing
import Layout from "components/Layout"; // Layout wrapper
import { ALL_POSTS } from "apollo/queries"; // GraphQL posts query
import { getAllPosts } from "apollo/parse"; // Clean GraphQL response
import styles from "styles/Home.module.css"; // Component module styling

export default function Home({ posts }) {
  return (
    <Layout>
      <div className={styles.head}>
        <div>
          <div>
            <h1>Final Draft.</h1>
            <p>The go-to blog for all things student entrepreneurship.</p>
          </div>
          <div>
            <img src="/brand/community_photo.jpg" alt="DRF" />
          </div>
        </div>
      </div>

      <Link href={posts[0].uri}>
        <a className={styles.feature}>
          <img src={posts[0].featuredImage} alt="Featured article image" />
          <div>
            <h2>{posts[0].title}</h2>
            <div dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
            <p>Feature &nbsp;·&nbsp; {posts[0].readingTime} min read</p>
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
                  <p>{post.readingTime} min read</p>
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
  const response = await client.query({ query: ALL_POSTS }); // Collect posts
  const posts = await getAllPosts(response.data); // Clean response GraphQL

  // Return posts to page
  return {
    props: { posts: posts },
  };
}
