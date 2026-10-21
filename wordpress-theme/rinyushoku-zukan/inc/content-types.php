<?php
/**
 * Product content model and basic editing fields.
 *
 * For a large multisite deployment this content model can later move to a
 * companion plugin without changing the template API.
 *
 * @package Rinyushoku_Zukan
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Register the future-facing product database. */
function rz_register_content_types() {
	register_post_type(
		'rz_product',
		array(
			'labels' => array(
				'name'          => 'ベビーフード',
				'singular_name' => 'ベビーフード',
				'add_new_item'  => '商品を追加',
				'edit_item'     => '商品を編集',
				'view_item'     => '商品を表示',
				'search_items'  => '商品を検索',
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-carrot',
			'has_archive'  => 'products',
			'rewrite'      => array( 'slug' => 'products' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		)
	);

	$taxonomies = array(
		'rz_age'        => array( 'name' => '対象月齢', 'slug' => 'age' ),
		'rz_food_type'  => array( 'name' => '商品タイプ', 'slug' => 'food-type' ),
		'rz_ingredient' => array( 'name' => '食材', 'slug' => 'ingredient' ),
		'rz_storage'    => array( 'name' => '保存方法', 'slug' => 'storage' ),
		'rz_brand'      => array( 'name' => 'ブランド', 'slug' => 'brand' ),
	);
	foreach ( $taxonomies as $taxonomy => $config ) {
		register_taxonomy(
			$taxonomy,
			array( 'rz_product' ),
			array(
				'label'             => $config['name'],
				'public'            => true,
				'hierarchical'      => false,
				'show_admin_column' => true,
				'show_in_rest'      => true,
				'rewrite'           => array( 'slug' => $config['slug'] ),
			)
		);
	}

	$meta_fields = array(
		'_rz_price'       => 'integer',
		'_rz_ec_url'      => 'string',
		'_rz_is_pr'       => 'boolean',
		'_rz_is_sample'   => 'boolean',
		'_rz_views30d'    => 'integer',
		'_rz_raw_materials' => 'string',
		'_rz_allergens'   => 'string',
		'_rz_nutrition'   => 'string',
	);
	foreach ( $meta_fields as $key => $type ) {
		register_post_meta(
			'rz_product',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'integer' === $type ? 'absint' : ( 'boolean' === $type ? 'rest_sanitize_boolean' : 'sanitize_text_field' ),
				'auth_callback'     => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'rz_register_content_types' );

/** Add a compact product-details metabox. */
function rz_add_product_meta_box() {
	add_meta_box( 'rz-product-details', '商品情報', 'rz_product_meta_box', 'rz_product', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'rz_add_product_meta_box' );

/** Render product details fields. */
function rz_product_meta_box( $post ) {
	wp_nonce_field( 'rz_save_product', 'rz_product_nonce' );
	$fields = array(
		'_rz_price'         => array( 'label' => '価格（税込・円）', 'type' => 'number' ),
		'_rz_ec_url'        => array( 'label' => '公式EC URL', 'type' => 'url' ),
		'_rz_raw_materials' => array( 'label' => '原材料', 'type' => 'text' ),
		'_rz_allergens'     => array( 'label' => 'アレルゲン', 'type' => 'text' ),
		'_rz_nutrition'     => array( 'label' => '栄養成分', 'type' => 'text' ),
		'_rz_views30d'      => array( 'label' => '過去30日間の閲覧数', 'type' => 'number' ),
	);
	echo '<div style="display:grid;gap:14px">';
	foreach ( $fields as $key => $field ) {
		printf(
			'<label><strong style="display:block;margin-bottom:4px">%1$s</strong><input style="width:100%%" type="%2$s" name="%3$s" value="%4$s"></label>',
			esc_html( $field['label'] ),
			esc_attr( $field['type'] ),
			esc_attr( $key ),
			esc_attr( get_post_meta( $post->ID, $key, true ) )
		);
	}
	foreach ( array( '_rz_is_pr' => 'PR掲載', '_rz_is_sample' => 'サンプル／デモデータ' ) as $key => $label ) {
		printf( '<label><input type="checkbox" name="%1$s" value="1" %2$s> %3$s</label>', esc_attr( $key ), checked( get_post_meta( $post->ID, $key, true ), '1', false ), esc_html( $label ) );
	}
	echo '</div>';
}

/** Save product fields using WordPress capability and nonce checks. */
function rz_save_product_meta( $post_id ) {
	if ( ! isset( $_POST['rz_product_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rz_product_nonce'] ) ), 'rz_save_product' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$text_fields = array( '_rz_raw_materials', '_rz_allergens', '_rz_nutrition' );
	foreach ( $text_fields as $key ) {
		$value = isset( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
		update_post_meta( $post_id, $key, $value );
	}
	$url = isset( $_POST['_rz_ec_url'] ) ? esc_url_raw( wp_unslash( $_POST['_rz_ec_url'] ) ) : '';
	update_post_meta( $post_id, '_rz_ec_url', $url );
	foreach ( array( '_rz_price', '_rz_views30d' ) as $key ) {
		update_post_meta( $post_id, $key, isset( $_POST[ $key ] ) ? absint( $_POST[ $key ] ) : 0 );
	}
	foreach ( array( '_rz_is_pr', '_rz_is_sample' ) as $key ) {
		update_post_meta( $post_id, $key, isset( $_POST[ $key ] ) ? '1' : '0' );
	}
}
add_action( 'save_post_rz_product', 'rz_save_product_meta' );

/** Apply front-end product archive filters from safe query variables. */
function rz_filter_product_archive( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! is_post_type_archive( 'rz_product' ) ) {
		return;
	}
	$tax_map   = array( 'age' => 'rz_age', 'type' => 'rz_food_type', 'ingredient' => 'rz_ingredient', 'storage' => 'rz_storage', 'brand' => 'rz_brand' );
	$tax_query = array();
	foreach ( $tax_map as $param => $taxonomy ) {
		if ( isset( $_GET[ $param ] ) && '' !== $_GET[ $param ] ) {
			$tax_query[] = array(
				'taxonomy' => $taxonomy,
				'field'    => 'slug',
				'terms'    => sanitize_title( wp_unslash( $_GET[ $param ] ) ),
			);
		}
	}
	if ( $tax_query ) {
		$query->set( 'tax_query', $tax_query );
	}
	$price_min = isset( $_GET['price_min'] ) && '' !== $_GET['price_min'] ? absint( $_GET['price_min'] ) : null;
	$price_max = isset( $_GET['price_max'] ) && '' !== $_GET['price_max'] ? absint( $_GET['price_max'] ) : null;
	if ( null !== $price_min || null !== $price_max ) {
		$meta_query = array( 'relation' => 'AND' );
		if ( null !== $price_min ) {
			$meta_query[] = array( 'key' => '_rz_price', 'value' => $price_min, 'compare' => '>=', 'type' => 'NUMERIC' );
		}
		if ( null !== $price_max ) {
			$meta_query[] = array( 'key' => '_rz_price', 'value' => $price_max, 'compare' => '<=', 'type' => 'NUMERIC' );
		}
		$query->set( 'meta_query', $meta_query );
	}
	$sort = isset( $_GET['sort'] ) ? sanitize_key( wp_unslash( $_GET['sort'] ) ) : '';
	if ( 'popular' === $sort ) {
		$query->set( 'meta_key', '_rz_views30d' );
		$query->set( 'orderby', 'meta_value_num' );
		$query->set( 'order', 'DESC' );
	} elseif ( in_array( $sort, array( 'price_low', 'price_high' ), true ) ) {
		$query->set( 'meta_key', '_rz_price' );
		$query->set( 'orderby', 'meta_value_num' );
		$query->set( 'order', 'price_low' === $sort ? 'ASC' : 'DESC' );
	}
}
add_action( 'pre_get_posts', 'rz_filter_product_archive' );
