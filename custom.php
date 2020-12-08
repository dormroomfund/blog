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