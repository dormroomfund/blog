import { getSinglePost } from "utils";
import Layout from "components/Layout";
import styles from "styles/Post.module.css";
import { request, gql } from "graphql-request"; // GraphQL request library
import dayjs from "dayjs";
import Link from "next/link";

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
    posts(first: 4) {
      nodes {
        title
        uri
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }`;
}

export default function Post({ url, post, featured }) {
  console.log(featured);

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
          <div>
            {post.tags && post.tags.length > 0
              ? post.tags.map((tag, i) => {
                  return <span key={i}>{tag.name}</span>;
                })
              : null}
          </div>
          <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src="/vectors/link.svg" alt="Link share button" />
            </a>
            <a
              href={`http://twitter.com/share?text=Check%20out%20Dorm%20Room%20Fund%27s%20post:&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/vectors/twitter.svg" alt="Twitter share button" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=Check%20out%20Dorm%20Room%20Fund%27s%20post:`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/vectors/facebook.svg" alt="Facebook share button" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.others}>
        <div>
          <h4>You might also like</h4>
          <div>
            {featured.map((post, i) => {
              return (
                <Link href={post.uri} key={i}>
                  <a>
                    <img
                      src={post.featuredImage.node.mediaItemUrl}
                      alt="Article image"
                    />
                    <h2>{post.title}</h2>
                  </a>
                </Link>
              );
            })}
          </div>
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
    process.env.NEXT_PUBLIC_WP_URL,
    postQueryGenerator(slug)
  ); // Collect post data
  const post = await getSinglePost(res); // Clean GraphQL response

  // Return posts to page
  return {
    props: {
      url: `https://blog.dormroomfund.org/post/${slug}`,
      post: post.post,
      featured: post.featuredPosts,
    },
  };
}
