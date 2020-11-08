import Layout from "components/Layout";
import { request, gql } from "graphql-request"; // GraphQL request library

export default function Post() {
  return (
    <Layout>
      <span>Post</span>
    </Layout>
  );
}

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
          uri
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
