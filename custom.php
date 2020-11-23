/**
  * Changes the post read more from ... to [...]
 */
function custom_excerpt_more($more) {
	global $post;
	return ' [...]';
}

/**
  * Reduces default excerpt length to 20 words
 */
function custom_excerpt_length($length) {
	return 20;
}

// Adds functions
add_filter('excerpt_more', 'custom_excerpt_more');
add_filter('excerpt_length', 'custom_excerpt_length');

/**
  * Custom reading time calculation for WPGraphQL
  * From: https://github.com/m-muhsin/wp-graphql-reading-time
 */
function custom_graphql_register_types() {
	register_graphql_field(
		'post',
		'readingTime',
		[
			'type'        => 'String',
			'description' => __( 'Post reading time', 'wp-graphql' ),
			'resolve'     => function( $post ) {
				$reading_time = wpgql_rt_calculate_reading_time( $post->ID );
				return $reading_time;
			},
		]
	);
}
add_action( 'graphql_register_types', 'custom_graphql_register_types' );

function wpgql_rt_calculate_reading_time( $wpgql_rt_post_id ) {

	$wpgql_rt_content = get_post_field( 'post_content', $wpgql_rt_post_id );
	$wpgql_rt_content = wp_strip_all_tags( $wpgql_rt_content );
	$word_count       = count( preg_split( '/\s+/', $wpgql_rt_content ) );

	// Hardcoding words / min value.
	$wpm = 300;

	$reading_time = $word_count / $wpm;

	// If the reading time is 0 then return it as < 1 instead of 0.
	if ( 1 > $reading_time ) {
		$reading_time = __( '< 1', 'reading-time-wp' );
	} else {
		$reading_time = ceil( $reading_time );
	}

	return $reading_time;
}