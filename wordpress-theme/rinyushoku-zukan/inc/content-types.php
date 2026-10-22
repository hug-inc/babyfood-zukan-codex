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

/** Register the future-facing product and shop databases. */
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

	register_post_type(
		'rz_shop',
		array(
			'labels' => array(
				'name'          => 'ショップ',
				'singular_name' => 'ショップ',
				'add_new_item'  => 'ショップを追加',
				'edit_item'     => 'ショップを編集',
				'view_item'     => 'ショップを表示',
				'search_items'  => 'ショップを検索',
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-store',
			'has_archive'  => false,
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
		)
	);

	$taxonomies = array(
		'rz_age'        => array( 'name' => '対象月齢', 'slug' => 'age', 'objects' => array( 'rz_product', 'rz_shop' ), 'hierarchical' => true ),
		'rz_food_type'  => array( 'name' => '種類', 'slug' => 'food-type', 'objects' => array( 'rz_product', 'rz_shop' ), 'hierarchical' => true ),
		'rz_ingredient' => array( 'name' => '食材', 'slug' => 'ingredient', 'objects' => array( 'rz_product', 'rz_shop' ), 'hierarchical' => true ),
		'rz_storage'    => array( 'name' => '保存方法', 'slug' => 'storage', 'objects' => array( 'rz_product' ), 'hierarchical' => false ),
		'rz_brand'      => array( 'name' => 'ブランド', 'slug' => 'brand', 'objects' => array( 'rz_product' ), 'hierarchical' => false ),
	);
	foreach ( $taxonomies as $taxonomy => $config ) {
		register_taxonomy(
			$taxonomy,
			$config['objects'],
			array(
				'label'             => $config['name'],
				'public'            => true,
				'hierarchical'      => $config['hierarchical'],
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

	$shop_meta_fields = array(
		'_rz_shop_url'       => 'string',
		'_rz_shop_is_featured' => 'boolean',
		'_rz_shop_is_pr'     => 'boolean',
		'_rz_shop_is_sample' => 'boolean',
		'_rz_shop_clicks'    => 'integer',
	);
	foreach ( $shop_meta_fields as $key => $type ) {
		register_post_meta(
			'rz_shop',
			$key,
			array(
				'type'              => $type,
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'integer' === $type ? 'absint' : ( 'boolean' === $type ? 'rest_sanitize_boolean' : 'esc_url_raw' ),
				'auth_callback'     => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'rz_register_content_types' );

/** Ensure the category checklists have the standard choices from day one. */
function rz_ensure_default_shop_terms() {
	$term_sets = array(
		'rz_age' => array(
			'5-6' => '5〜6か月', '7-8' => '7〜8か月', '9-11' => '9〜11か月', '12-18' => '12〜18か月', '18plus' => '1歳半〜',
		),
		'rz_food_type' => array(
			'retort' => 'レトルト・パウチ', 'frozen' => '冷凍離乳食', 'tezukami' => '手づかみ食べ', 'freezedry' => 'フリーズドライ', 'snack' => 'おやつ',
		),
		'rz_ingredient' => array(
			'rice' => '米', 'vegetable' => '野菜', 'fish' => '魚', 'meat' => '肉', 'beans' => '豆類', 'fruit' => '果物',
		),
	);
	foreach ( $term_sets as $taxonomy => $terms ) {
		foreach ( $terms as $slug => $name ) {
			if ( ! term_exists( $slug, $taxonomy ) ) {
				wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
			}
		}
	}
}
add_action( 'init', 'rz_ensure_default_shop_terms', 20 );

/** Add the small shop settings box; categories use WordPress checklists. */
function rz_add_shop_meta_box() {
	add_meta_box( 'rz-shop-details', 'ショップ情報', 'rz_shop_meta_box', 'rz_shop', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'rz_add_shop_meta_box' );

/** Render shop fields. */
function rz_shop_meta_box( $post ) {
	wp_nonce_field( 'rz_save_shop', 'rz_shop_nonce' );
	?>
	<div style="display:grid;gap:14px">
		<label><strong style="display:block;margin-bottom:4px">ショップURL</strong><input style="width:100%" type="url" name="_rz_shop_url" value="<?php echo esc_attr( get_post_meta( $post->ID, '_rz_shop_url', true ) ); ?>" placeholder="https://example.com/"></label>
		<label><input type="checkbox" name="_rz_shop_is_featured" value="1" <?php checked( get_post_meta( $post->ID, '_rz_shop_is_featured', true ), '1' ); ?>> 「注目のベビーフードブランド」に表示</label>
		<label><input type="checkbox" name="_rz_shop_is_pr" value="1" <?php checked( get_post_meta( $post->ID, '_rz_shop_is_pr', true ), '1' ); ?>> PR掲載</label>
		<label><input type="checkbox" name="_rz_shop_is_sample" value="1" <?php checked( get_post_meta( $post->ID, '_rz_shop_is_sample', true ), '1' ); ?>> サンプル／デモデータ</label>
		<p style="margin:0"><strong>公式ショップへのクリック数：</strong><?php echo esc_html( number_format_i18n( (int) get_post_meta( $post->ID, '_rz_shop_clicks', true ) ) ); ?>回</p>
		<p style="margin:0;color:#646970">「新着」は公開日の新しい順、「人気」は公式ショップへのクリック数が多い順に自動表示されます。</p>
		<p style="margin:0;color:#646970">右側の「対象月齢」「種類」「食材」で、このショップを表示するカテゴリーにチェックを入れてください。複数選択できます。</p>
	</div>
	<?php
}

/** Save shop fields. */
function rz_save_shop_meta( $post_id ) {
	if ( ! isset( $_POST['rz_shop_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rz_shop_nonce'] ) ), 'rz_save_shop' ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$url = isset( $_POST['_rz_shop_url'] ) ? esc_url_raw( wp_unslash( $_POST['_rz_shop_url'] ) ) : '';
	update_post_meta( $post_id, '_rz_shop_url', $url );
	foreach ( array( '_rz_shop_is_featured', '_rz_shop_is_pr', '_rz_shop_is_sample' ) as $key ) {
		update_post_meta( $post_id, $key, isset( $_POST[ $key ] ) ? '1' : '0' );
	}
	if ( '' === get_post_meta( $post_id, '_rz_shop_clicks', true ) ) {
		update_post_meta( $post_id, '_rz_shop_clicks', 0 );
	}
}
add_action( 'save_post_rz_shop', 'rz_save_shop_meta' );

/** Count an outbound shop visit once per browser and shop each day, then redirect. */
function rz_track_shop_click() {
	if ( ! isset( $_GET['rz_shop_out'] ) ) {
		return;
	}
	$shop_id = absint( wp_unslash( $_GET['rz_shop_out'] ) );
	if ( ! $shop_id || 'rz_shop' !== get_post_type( $shop_id ) || 'publish' !== get_post_status( $shop_id ) ) {
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}
	$target = esc_url_raw( get_post_meta( $shop_id, '_rz_shop_url', true ) );
	if ( ! $target ) {
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}

	$cookie_name = 'rz_shop_clicks_today';
	$today       = gmdate( 'Ymd' );
	$cookie      = isset( $_COOKIE[ $cookie_name ] ) ? sanitize_text_field( wp_unslash( $_COOKIE[ $cookie_name ] ) ) : '';
	$parts       = explode( ':', $cookie, 2 );
	$clicked     = isset( $parts[0], $parts[1] ) && $today === $parts[0] ? array_filter( array_map( 'absint', explode( ',', $parts[1] ) ) ) : array();
	if ( ! in_array( $shop_id, $clicked, true ) ) {
		update_post_meta( $shop_id, '_rz_shop_clicks', (int) get_post_meta( $shop_id, '_rz_shop_clicks', true ) + 1 );
		$clicked[] = $shop_id;
		setcookie(
			$cookie_name,
			$today . ':' . implode( ',', array_slice( array_unique( $clicked ), -50 ) ),
			array(
				'expires'  => time() + DAY_IN_SECONDS,
				'path'     => COOKIEPATH ? COOKIEPATH : '/',
				'domain'   => COOKIE_DOMAIN,
				'secure'   => is_ssl(),
				'httponly' => true,
				'samesite' => 'Lax',
			)
		);
	}

	$target_host = wp_parse_url( $target, PHP_URL_HOST );
	add_filter(
		'allowed_redirect_hosts',
		function( $hosts ) use ( $target_host ) {
			if ( $target_host ) {
				$hosts[] = $target_host;
			}
			return array_unique( $hosts );
		}
	);
	wp_safe_redirect( $target, 302, 'Rinyushoku Zukan' );
	exit;
}
add_action( 'template_redirect', 'rz_track_shop_click', 1 );

/** Show click totals in the shop list for quick editorial checks. */
function rz_shop_admin_columns( $columns ) {
	$columns['rz_shop_clicks'] = 'ショップクリック数';
	return $columns;
}
add_filter( 'manage_rz_shop_posts_columns', 'rz_shop_admin_columns' );

/** Render the shop click total column. */
function rz_shop_admin_column_value( $column, $post_id ) {
	if ( 'rz_shop_clicks' === $column ) {
		echo esc_html( number_format_i18n( (int) get_post_meta( $post_id, '_rz_shop_clicks', true ) ) );
	}
}
add_action( 'manage_rz_shop_posts_custom_column', 'rz_shop_admin_column_value', 10, 2 );

/** Make the click total sortable in the shop list. */
function rz_shop_sortable_columns( $columns ) {
	$columns['rz_shop_clicks'] = 'rz_shop_clicks';
	return $columns;
}
add_filter( 'manage_edit-rz_shop_sortable_columns', 'rz_shop_sortable_columns' );

/** Apply numeric sorting when editors select the click column. */
function rz_sort_shop_admin_by_clicks( $query ) {
	if ( is_admin() && $query->is_main_query() && 'rz_shop' === $query->get( 'post_type' ) && 'rz_shop_clicks' === $query->get( 'orderby' ) ) {
		$query->set( 'meta_key', '_rz_shop_clicks' );
		$query->set( 'orderby', 'meta_value_num' );
	}
}
add_action( 'pre_get_posts', 'rz_sort_shop_admin_by_clicks' );

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
