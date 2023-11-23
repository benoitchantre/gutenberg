<?php
/**
 * PHP and WordPress configuration compatibility functions for the Gutenberg
 * editor plugin changes related to REST API.
 *
 * @package gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

/**
 * Registers the Global Styles Revisions REST API routes.
 */
function gutenberg_register_global_styles_revisions_endpoints() {
	$global_styles_revisions_controller = new Gutenberg_REST_Global_Styles_Revisions_Controller_6_5();
	$global_styles_revisions_controller->register_routes();
}

add_action( 'rest_api_init', 'gutenberg_register_global_styles_revisions_endpoints' );

/**
 * Registers the Block Rederer REST API routes.
 */
function gutenberg_register_block_rederer_routes() {
	$block_renderer_controller = new Gutenberg_Render_Blocks_Controller();
	$block_renderer_controller->register_routes();
}

add_action( 'rest_api_init', 'gutenberg_register_block_rederer_routes' );
