import Layout from "components/Layout";
import styles from "styles/Search.module.css";
import { withRouter } from "next/router";
import Search from "components/Search";
import { useState, useEffect } from "react";
import { postSearchGenerator } from "apollo/queries"; // GraphQL posts query
import { getAllPosts } from "apollo/parse";
import { useLazyQuery } from "@apollo/client";

function SearchPage({
  router: {
    query: { search },
  },
}) {
  const [searchQuery, setSearchQuery] = useState(search);
  const [getSearchResults, { loading, data }] = useLazyQuery({
    query: postSearchGenerator(searchQuery),
  });

  const collectSearchResults = async () => {
    if (searchQuery) {
      setSearchQuery(null);
      getSearchResults();
    }
    console.log(loading, data);
  };

  useEffect(collectSearchResults, [searchQuery, loading, data]);

  return (
    <Layout>
      <div className={styles.searchHead}>
        <Search defaultSearchQuery={searchQuery} />
      </div>
      <span>Blog search page goes here</span>
    </Layout>
  );
}

export default withRouter(SearchPage);
