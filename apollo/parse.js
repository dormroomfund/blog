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
      featuredImage: post.featuredImage?.node?.mediaItemUrl
        ? post.featuredImage.node.mediaItemUrl
        : "",
      // 4. Post excerpt
      excerpt: post.excerpt,
      // 5. Post reading time in minute(s)
      readingTime: post.readingTime,
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
  // Collect other featured posts
  let otherPosts = QLPost.posts.nodes;

  // Clean data from other featured posts
  otherPosts = otherPosts.filter((post) => {
    // Check for conflicting post title
    if (post.title !== QLPost.post.title) {
      // Return cleaned data
      return {
        title: post.title,
        uri: post.uri,
        featuredImage: post.featuredImage.node,
      };
    }
  });

  // Collect first 3 featured posts
  const featuredPosts = otherPosts.slice(0, 3);

  // Return post information
  return {
    post: {
      title: QLPost.post.title,
      excerpt: QLPost.post.excerpt,
      author: {
        name: QLPost.post.author.node.name,
        avatar: QLPost.post.author.node.avatar.url,
      },
      featuredImage: QLPost.post.featuredImage.node,
      date: QLPost.post.date,
      content: QLPost.post.content,
      tags: QLPost.post.tags.nodes,
    },
    featuredPosts,
  };
};

// Export parsing utils
export { getAllPosts, getSinglePost };
