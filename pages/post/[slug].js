import dayjs from "dayjs"; // Date rendering
import client from "apollo"; // Apollo GraphQL client
import Head from "next/head"; // Head meta
import Link from "next/link"; // Dynamic routing
import Layout from "components/Layout"; // Layout wrapper
import { useLocalStorage } from "utils"; // useLocalStorage hook for newsletter CTA
import styles from "styles/Post.module.css"; // Component module styling
import { useState, useEffect } from "react"; // React state management
import { getSinglePost } from "apollo/parse"; // Collect post information
import { Modal } from "react-responsive-modal"; // Newsletter CTA modal
import Newsletter from "components/Newsletter"; // Newsletter CTA modal component
import { postQueryGenerator } from "apollo/queries"; // Posts retrieval query

// SLUG --> current page slug
// URL --> current page url
// POST --> post content
// FEATURED --> array of 3 other post titles, images, and slugs
export default function Post({ slug, url, post, featured }) {
  const [modalOpen, setModalOpen] = useState(false); // Newsletter CTA status
  const [newsletter, setNewsletter] = useLocalStorage("drf-newsletter"); // Newsletter previous check

  /**
   * Formats html entities in description strings
   * @param {string} string containing meta description
   */
  const handleEntities = (string) => {
    return (string + "").replace(/&#\d+;/gm, function (s) {
      return String.fromCharCode(s.match(/\d+/gm)[0]);
    });
  };

  /**
   * Lifecycle to show newsletter on load
   */
  useEffect(() => {
    // Trigger newsletter popup after 15 seconds
    const timedCTA = setTimeout(() => {
      // If newsletter popup has not been shown before
      if (!newsletter) {
        // Set newsletter popup to shown in localStorage
        setNewsletter("true");
        // Show newsletter popup
        setModalOpen(true);
      }
    }, 15 * 1000);

    // --> Lifecycle method: on unmount, clear timeout
    return () => clearTimeout(timedCTA);
  }, []);

  return (
    // Render page in layout
    <Layout isPost>
      {/* Render Newsletter CTA modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} center>
        {/* Newsletter component */}
        <Newsletter close={() => setModalOpen(false)} />
      </Modal>

      {/* Dynamic post meta */}
      <Head>
        {/* Meta: General meta */}
        <title>Final Draft: {post.title}</title>
        <meta name="title" content={post.title} />
        <meta
          name="description"
          content={`${handleEntities(
            post.excerpt.replace(/<[^>]+>/g, "").slice(0, -11)
          )}...`}
        />

        {/* Meta: Open Graph + Facebook */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={`${handleEntities(
            post.excerpt.replace(/<[^>]+>/g, "").slice(0, -11)
          )}...`}
        />
        <meta
          property="og:image"
          content={`https://blog.dormroomfund.com/api/meta?slug=${slug}`}
        />

        {/* Meta: Twitter */}
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={post.title} />
        <meta
          property="twitter:description"
          content={`${handleEntities(
            post.excerpt.replace(/<[^>]+>/g, "").slice(0, -11)
          )}...`}
        />
        <meta
          property="twitter:image"
          content={`https://blog.dormroomfund.com/api/meta?slug=${slug}`}
        />
      </Head>

      {/* Post content */}
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
                <Link href={`/post${post.uri}`} key={i}>
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
  const query = postQueryGenerator(slug); // Generate gql query
  const response = await client.query({ query: query }); // Collect GraphQL response
  const post = await getSinglePost(response.data); // Clean GraphQL response

  // Return data to page
  return {
    props: {
      slug: slug,
      url: `https://blog.dormroomfund.com/post/${slug}`,
      post: post.post,
      featured: post.featuredPosts,
    },
  };
}
