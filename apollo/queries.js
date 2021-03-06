import { gql } from "@apollo/client"; // Query structure

// Home: Collect first 100 posts from WordPress
const ALL_POSTS = gql`
  {
    posts(first: 100) {
      nodes {
        title
        uri
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        readingTime
      }
    }
  }
`;

/**
 * Posts: Generate GraphQL request from dynamic page slug
 * @param {string} slug post slug
 * @returns {gql} gql query object
 */
function postQueryGenerator(slug) {
  return gql`
  query MyQuery {
    post(id: "${slug}" idType: SLUG) {
      title
      excerpt
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

/**
 * Posts: Generate GraphQL request from dynamic page slug for meta
 * @param {string} slug post slug
 * @returns {gql} gql query object
 */
function postMetaGenerator(slug) {
  return gql`
  query MyQuery {
    post(id: "${slug}" idType: SLUG) {
      title
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }`;
}

// Export queries
export { ALL_POSTS, postQueryGenerator, postMetaGenerator };
