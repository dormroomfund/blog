import client from "apollo"; // Apollo GraphQL client
import Link from "next/link"; // Dynamic routing
import LazyLoad from "react-lazyload"; // LazyLoad wrapper
import Layout from "components/Layout"; // Layout wrapper
import { ALL_POSTS } from "apollo/queries"; // GraphQL loadedPosts query
import { getAllPosts } from "apollo/parse"; // Clean GraphQL response
import styles from "styles/Home.module.css"; // Component module styling
import { useState } from "react"; // Hooks

export default function Home({ allPosts }) {
	const [loadedPosts, setLoadedPosts] = useState(allPosts.slice(0, allPosts.length < 11 ? allPosts.length : 11)); // Load 11 posts on the first render
	const [isLoadingPosts, setIsLoadingPosts] = useState(false); // Loading state of the LOAD MORE button

	const loadMorePost = (event) => {
		event.preventDefault(); // Prevent default behavior
		const remainingPosts = allPosts.length - loadedPosts.length; // Get remaining posts
		const extraPosts = (remainingPosts < 10) ? remainingPosts : 10; // Load 10 more posts if there are more than 10
		setLoadedPosts(loadedPosts.concat(allPosts.slice(loadedPosts.length, loadedPosts.length + extraPosts))); // Add the extra posts to the loaded posts
	}

	return (
		<Layout>
			<div className={styles.head}>
				<div>
					<div>
						<h1>Final Draft.</h1>
						<p>
							The latest thoughts, news, and musings from Dorm Room Fund,
							the original student-run venture fund.
						</p>
					</div>
					<div>
						<img src="/brand/community_photo.jpg" alt="DRF" />
					</div>
				</div>
			</div>

			<Link href={loadedPosts[0].uri}>
				<a className={styles.feature}>
					<img src={loadedPosts[0].featuredImage} alt="Featured article image" />
					<div>
						<div>
							<h2>{loadedPosts[0].title}</h2>
							<div dangerouslySetInnerHTML={{ __html: loadedPosts[0].excerpt }} />
						</div>
						<p>Feature &nbsp;·&nbsp; {loadedPosts[0].readingTime} min read</p>
					</div>
				</a>
			</Link>
			<div className={styles.posts}>
				{loadedPosts.slice(1).map((post, i) => {
					return (
						<LazyLoad offset={300} key={i} once>
							<Link href={post.uri}>
								<a>
									<img src={post.featuredImage} alt="Featured image" />
									<div>
										<h3>{post.title}</h3>
										<div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
										<p>{post.readingTime} min read</p>
									</div>
								</a>
							</Link>
						</LazyLoad>
					);
				})}
			</div>
			<div className={styles.loadMore}><a href="/" onClick={event => loadMorePost(event)} style={{display: (loadedPosts.length >= allPosts.length) ? "none" : "inline-block"}}>LOAD MORE</a></div>
		</Layout>
	);
}

/**
 * Server-side render, pull allPosts
 */
export async function getServerSideProps() {
	const response = await client.query({ query: ALL_POSTS }); // Collect allPosts from GraphQL
	const allPosts = await getAllPosts(response.data); // Clean response GraphQL

	// Return allPosts to page
	return {
		props: { allPosts: allPosts },
	};
}
