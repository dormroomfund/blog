import dayjs from "dayjs"; // Date rendering
import Link from "next/link"; // Dynamic routing
import { getSinglePost } from "utils"; // Collect post information
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/Post.module.css"; // Component module styling
import { request, gql } from "graphql-request"; // GraphQL request library

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

// URL --> current page slug
// POST --> post content
// FEATURED --> array of 3 other post titles, images, and slugs
export default function Post({ url, post, featured }) {
  return (
    // Render page in layout
    <Layout>
      <div className={styles.post}>
        {/* Article title container */}
        <div className={styles.head}>
          {/* Article title */}
          <h1>{post.title}</h1>

          {/* Article metadata */}
          <div>
            <img src={post.author.avatar} alt="Author avatar" />
            <h4>{post.author.name}</h4>
            <span>|</span>
            <span>{dayjs(new Date(post.date)).format("MMMM D, YYYY")}</span>
          </div>
        </div>

        {/* Article featured image */}
        <div className={styles.featuredImage}>
          {/* Image */}
          <img
            src={post.featuredImage.mediaItemUrl}
            alt="Article featured image"
          />
          {/* Injected caption */}
          <div
            dangerouslySetInnerHTML={{ __html: post.featuredImage.caption }}
          />
        </div>

        {/* Article content */}
        <div className={styles.content}>
          {/* Inject content */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Article tags + social buttons */}
        <div className={styles.foot}>
          {/* Article tags */}
          <div>
            {post.tags && post.tags.length > 0
              ? // If tags array exists and contains > 0 tags
                post.tags.map((tag, i) => {
                  // Loop through and render tag names
                  return <span key={i}>{tag.name}</span>;
                })
              : // Else, render nothing
                null}
          </div>

          {/* Article social buttons */}
          <div>
            {/* URL share link */}
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src="/vectors/link.svg" alt="Link share button" />
            </a>

            {/* Twitter share link */}
            <a
              href={`http://twitter.com/share?text=Check%20out%20Dorm%20Room%20Fund%27s%20post:&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/vectors/twitter.svg" alt="Twitter share button" />
            </a>

            {/* Facebook share link */}
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

      {/* Other featured articles section */}
      <div className={styles.others}>
        <div>
          <h4>You might also like</h4>
          <div>
            {featured.map((post, i) => {
              // For each featured article
              return (
                // Return dynamic link to article
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

  // Return data to page
  return {
    props: {
      url: `https://blog.dormroomfund.org/post/${slug}`,
      post: post.post,
      featured: post.featuredPosts,
    },
  };
}
