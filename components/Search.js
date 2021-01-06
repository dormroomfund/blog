import { useState } from "react"; // State management
import styles from "styles/Search.module.css"; // Search component styles

export default function Search({ defaultSearchQuery, searchFunction }) {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery); // Search query

  /**
   * Handle search input and redirect
   */
  const handleSearch = (e) => {
    // If no search query
    if (!searchQuery) {
      // Don't do anything
      return;
    }

    // If key is enter
    if (e.key === "Enter") {
      // Return props function with query
      searchFunction(searchQuery);
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* Search icon */}
      <img src="/vectors/search.svg" alt="Search" />

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search topics, titles, or authors"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={(input) => input && input.focus()}
        onKeyDown={handleSearch}
      />

      {searchQuery ? (
        // Display search clear if query !== ""
        <button onClick={() => setSearchQuery("")}>
          <img src="/vectors/x.svg" alt="Clear search" />
        </button>
      ) : null}
    </div>
  );
}
