import { getSinglePost } from "utils";
import Layout from "components/Layout";
import styles from "styles/Post.module.css";
import { request, gql } from "graphql-request"; // GraphQL request library
import dayjs from "dayjs";

/**
 * Generate GraphQL request from dynamic page slug
 * @param {string} slug post slug
 * @returns {gql} gql query object
 */
function postQueryGenerator(slug) {
  return gql`
  query MyQuery {
    postBy(slug: "${slug}") {
      title
      author {
        node {
          avatar {
            url
          }
          name
        }
      }
      date
      featuredImage {
        node {
          mediaItemUrl
          caption
        }
      }
      content(format: RENDERED)
      tags {
        nodes {
          name
        }
      }
    }
  }`;
}

export default function Post({ post }) {
  console.log(post);

  return (
    <Layout>
      <div className={styles.post}>
        <div className={styles.head}>
          <h1>{post.title}</h1>
          <div>
            <img src={post.author.avatar} alt="Author avatar" />
            <h4>{post.author.name}</h4>
            <span>|</span>
            <span>{dayjs(new Date(post.date)).format("MMMM D, YYYY")}</span>
          </div>
        </div>
        <div className={styles.featuredImage}>
          <img
            src={post.featuredImage.mediaItemUrl}
            alt="Article featured image"
          />
          <div
            dangerouslySetInnerHTML={{ __html: post.featuredImage.caption }}
          />
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className={styles.foot}>
          <span>Tags and social here</span>
        </div>
      </div>
    </Layout>
  );
}

/**
 * Server-side render, pull individual post from slug
 */
export async function getServerSideProps({ params: { slug } }) {
  const res = await request(
    "http://104.196.157.57/graphql",
    postQueryGenerator(slug)
  ); // Collect post data
  const post = await getSinglePost(res); // Clean GraphQL response

  // Return posts to page
  return { props: { post: post } };
}
