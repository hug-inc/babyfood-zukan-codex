<?php
/**
 * 離乳食ずかん theme bootstrap.
 *
 * @package Rinyushoku_Zukan
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'RZ_THEME_VERSION', '1.1.8' );
define( 'RZ_THEME_DIR', get_template_directory() );
define( 'RZ_THEME_URI', get_template_directory_uri() );

require_once RZ_THEME_DIR . '/inc/template-tags.php';
require_once RZ_THEME_DIR . '/inc/content-types.php';

/** Configure theme defaults and WordPress-managed features. */
function rz_theme_setup() {
	load_theme_textdomain( 'rinyushoku-zukan', RZ_THEME_DIR . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' )
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 80,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	register_nav_menus(
		array(
			'primary' => __( 'メインナビゲーション', 'rinyushoku-zukan' ),
			'footer'  => __( 'フッターナビゲーション', 'rinyushoku-zukan' ),
		)
	);
}
add_action( 'after_setup_theme', 'rz_theme_setup' );

/** Load the small, framework-free front-end bundle. */
function rz_enqueue_assets() {
	$css_path = RZ_THEME_DIR . '/assets/css/theme.css';
	$js_path  = RZ_THEME_DIR . '/assets/js/theme.js';

	wp_enqueue_style(
		'rinyushoku-zukan-fonts',
		'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'rinyushoku-zukan',
		RZ_THEME_URI . '/assets/css/theme.css',
		array( 'rinyushoku-zukan-fonts' ),
		file_exists( $css_path ) ? (string) filemtime( $css_path ) : RZ_THEME_VERSION
	);
	wp_enqueue_script(
		'rinyushoku-zukan',
		RZ_THEME_URI . '/assets/js/theme.js',
		array(),
		file_exists( $js_path ) ? (string) filemtime( $js_path ) : RZ_THEME_VERSION,
		true
	);
	wp_localize_script(
		'rinyushoku-zukan',
		'rinyushokuZukan',
		array(
			'compareLabel' => __( '比較リスト', 'rinyushoku-zukan' ),
			'maxMessage'   => __( '比較できる商品は最大3件です。', 'rinyushoku-zukan' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'rz_enqueue_assets' );

/** Improve font connection startup without blocking theme rendering. */
function rz_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array( 'href' => 'https://fonts.googleapis.com' );
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'rz_resource_hints', 10, 2 );

/** Set a useful excerpt length for cards. */
function rz_excerpt_length() {
	return 54;
}
add_filter( 'excerpt_length', 'rz_excerpt_length', 20 );

/** Output basic structured data unless a dedicated SEO plugin takes over. */
function rz_schema_markup() {
	if ( is_admin() ) {
		return;
	}
	$data = array(
		'@context'  => 'https://schema.org',
		'@type'     => 'WebSite',
		'name'      => get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : '離乳食ずかん',
		'url'       => home_url( '/' ),
		'inLanguage'=> 'ja-JP',
		'publisher' => array(
			'@type' => 'Organization',
			'name'  => '株式会社HUG',
		),
	);
	printf( '<script type="application/ld+json">%s</script>' . "\n", wp_json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) );
}
add_action( 'wp_head', 'rz_schema_markup', 30 );
