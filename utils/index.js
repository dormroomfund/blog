/**
 * Cleans GraphQL response to posts array
 * @param {object} QLPosts containing GraphQL response
 * @returns {object[]} array of posts
 */
const getAllPosts = async (QLPosts) => {
  const posts = QLPosts.posts.nodes; // Collect posts
  let finalPosts = []; // Initialize array for final posts

  // For each post in request
  for (const post of posts) {
    // Append to final posts:
    finalPosts.push({
      // 1. Post title
      title: post.title,
      // 2. Post url
      uri: `/post${post.uri}`,
      // 3. Post featured image
      featuredImage: `http://104.196.157.57${post.featuredImage.node.uri}`,
      // 4 Post excerpt
      excerpt: post.excerpt,
    });
  }

  // Return array of posts
  return finalPosts;
};

/**
 * Cleans GraphQL response to single post
 * @param {object} QLPost containing GraphQL response
 * @returns {object} cleaned post info
 */
const getSinglePost = async (QLPost) => {
  // Return post information
  return {
    title: QLPost.postBy.title,
    author: {
      name: QLPost.postBy.author.node.name,
      avatar: QLPost.postBy.author.node.avatar.url,
    },
    featuredImage: QLPost.postBy.featuredImage.node,
    date: QLPost.postBy.date,
    content: QLPost.postBy.content,
    tags: QLPost.postBy.tags.nodes,
  };
};

// Export utils
export { getAllPosts, getSinglePost };
