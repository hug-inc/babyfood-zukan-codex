<?php
/**
 * Reusable presentation helpers.
 *
 * @package Rinyushoku_Zukan
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Return an asset URL inside the theme. */
function rz_asset( $path ) {
	return trailingslashit( RZ_THEME_URI ) . 'assets/' . ltrim( $path, '/' );
}

/** Render the site logo, respecting a Custom Logo when one is configured. */
function rz_site_logo() {
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}
	?>
	<a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( '離乳食ずかん トップへ', 'rinyushoku-zukan' ); ?>">
		<span class="site-logo__mark" aria-hidden="true">
			<svg viewBox="0 0 32 32" width="24" height="24"><path d="M6 15h20a10 9 0 0 1-20 0z" fill="#fff"/><path d="M20 4c3 0 4 3 3 6l-2 5h-3l1-5c0-3-1-6 1-6z" fill="#C6E3B9"/><circle cx="12.5" cy="19" r="1.2" fill="#F27B1F"/><circle cx="19.5" cy="19" r="1.2" fill="#F27B1F"/></svg>
		</span>
		<span class="site-logo__text">
			<span class="site-logo__en">RINYUSHOKU ZUKAN</span>
			<span class="site-logo__ja">離乳食<span>ずかん</span></span>
		</span>
	</a>
	<?php
}

/** Return a compact inline icon from the theme-owned set. */
function rz_icon( $name, $class = '' ) {
	$paths = array(
		'search'    => '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
		'menu'      => '<path d="M4 6h16M4 12h16M4 18h16"/>',
		'close'     => '<path d="M6 6l12 12M18 6 6 18"/>',
		'chevron'   => '<path d="m9 18 6-6-6-6"/>',
		'arrow'     => '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'plus'      => '<path d="M12 5v14M5 12h14"/>',
		'check'     => '<path d="m5 12 4 4L19 6"/>',
		'info'      => '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
		'store'     => '<path d="M4 10v10h16V10M3 10l2-6h14l2 6M8 20v-6h8v6"/><path d="M3 10c1 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0"/>',
		'megaphone' => '<path d="m3 11 15-6v14L3 13zM7 14l2 6h3l-1.5-7"/><path d="M21 9v6"/>',
		'scale'     => '<path d="M12 3v18M5 6h14M7 6l-4 8h8L7 6zM17 6l-4 8h8l-4-8zM8 21h8"/>',
		'package'   => '<path d="m4 7 8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10"/>',
		'snow'      => '<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 4l3 2 3-2M9 20l3-2 3 2"/>',
		'hand'      => '<path d="M7 12V7a2 2 0 0 1 4 0v4-6a2 2 0 0 1 4 0v6-4a2 2 0 0 1 4 0v7c0 5-3 8-8 8-3 0-5-2-7-5l-2-3a2 2 0 0 1 3-2l2 2"/>',
		'droplet'   => '<path d="M12 2s7 7 7 13a7 7 0 0 1-14 0c0-6 7-13 7-13z"/>',
		'cookie'    => '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r=".7" fill="currentColor"/><circle cx="15" cy="8" r=".7" fill="currentColor"/><circle cx="14" cy="15" r=".7" fill="currentColor"/><circle cx="8" cy="16" r=".7" fill="currentColor"/>',
	);
	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}
	return sprintf(
		'<svg class="icon %1$s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">%2$s</svg>',
		esc_attr( $class ),
		$paths[ $name ]
	);
}

/** Render a friendly, theme-owned ingredient illustration. */
function rz_ingredient_icon( $name ) {
	$illustrations = array(
		'rice' => '<path d="M10 32h44a22 18 0 0 1-44 0z" fill="#F7B267"/><path d="M10 32h44" stroke="#D9640D" stroke-width="2.5" stroke-linecap="round"/><path d="M14 31c0-10 8-16 18-16s18 6 18 16z" fill="#fff" stroke="#E8DCC8" stroke-width="2"/><g fill="#F1E7D6"><ellipse cx="24" cy="24" rx="2.2" ry="1.4"/><ellipse cx="32" cy="20" rx="2.2" ry="1.4"/><ellipse cx="40" cy="25" rx="2.2" ry="1.4"/><ellipse cx="30" cy="27" rx="2.2" ry="1.4"/></g><circle cx="26" cy="41" r="1.6" fill="#7A4A1E"/><circle cx="38" cy="41" r="1.6" fill="#7A4A1E"/><path d="M29 45q3 2.5 6 0" stroke="#7A4A1E" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
		'vegetable' => '<path d="M33 18c-1-6 2-10 6-11-1 4-1 7 1 10 3-3 7-3 10-1-3 2-6 4-9 4" fill="#6BA65A"/><path d="M22 54c-4-2-4-8 0-14l12-20c3-3 9 0 9 5L33 50c-3 4-7 6-11 4z" fill="#F28A2E"/><path d="M28 33l5 2M25 40l5 2M31 26l4 2" stroke="#D9640D" stroke-width="2" stroke-linecap="round"/><circle cx="29" cy="45" r="1.4" fill="#7A4A1E"/><circle cx="35" cy="38" r="1.4" fill="#7A4A1E"/>',
		'fish' => '<path d="M8 32c8-12 26-14 38-4l10-8v24l-10-8C34 46 16 44 8 32z" fill="#7FB8E0"/><path d="M20 26c6-3 14-3 20 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".7"/><circle cx="18" cy="31" r="2.4" fill="#2D4A63"/><path d="M14 37q3 2 6 0" stroke="#2D4A63" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="24" cy="36" r="2" fill="#F6A6A6" opacity=".8"/>',
		'meat' => '<path d="M38 12c10 2 16 12 12 22s-14 14-22 10l-8 8a4 4 0 1 1-6-1 4 4 0 1 1-1-6l8-8c-4-8 0-18 8-22 3-2 6-3 9-3z" fill="#C97B4A"/><path d="M40 18c6 2 9 8 7 14" stroke="#E9A878" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M18 48l-3 3" stroke="#FFF3E0" stroke-width="5" stroke-linecap="round"/>',
		'beans' => '<ellipse cx="22" cy="36" rx="10" ry="12" transform="rotate(-25 22 36)" fill="#E8C76A"/><ellipse cx="40" cy="28" rx="10" ry="12" transform="rotate(20 40 28)" fill="#D9B24E"/><ellipse cx="38" cy="46" rx="8" ry="9" transform="rotate(-10 38 46)" fill="#9CC48A"/><path d="M19 33q2 4 6 4M37 25q2 4 6 4" stroke="#B48A2C" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
		'fruit' => '<path d="M32 18c-4-4-14-4-18 4s-2 22 6 28c4 3 8 2 12 0 4 2 8 3 12 0 8-6 10-20 6-28s-14-8-18-4z" fill="#EF5B5B"/><path d="M32 18c0-5 1-8 4-11" stroke="#7A4A1E" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M34 14c4-4 10-4 12-2-3 4-8 5-12 2z" fill="#6BA65A"/><ellipse cx="22" cy="28" rx="3" ry="5" fill="#fff" opacity=".45"/>',
	);
	if ( ! isset( $illustrations[ $name ] ) ) {
		return '';
	}
	return sprintf(
		'<svg class="ingredient-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">%s</svg>',
		$illustrations[ $name ]
	);
}

/** Default navigation mirrors the approved prototype when no WP menu exists. */
function rz_default_menu( $args = array() ) {
	$links = array(
		array( get_post_type_archive_link( 'rz_product' ) ?: home_url( '/products/' ), 'ショップをさがす' ),
		array( home_url( '/#age' ), '月齢から探す' ),
		array( home_url( '/#type' ), '種類から探す' ),
		array( home_url( '/#ingredient' ), '食材から探す' ),
		array( home_url( '/#articles' ), 'お役立ち記事' ),
		array( home_url( '/compare/' ), '比較リスト' ),
	);
	echo '<ul class="nav-list">';
	foreach ( $links as $link ) {
		printf( '<li><a href="%1$s">%2$s</a></li>', esc_url( $link[0] ), esc_html( $link[1] ) );
	}
	echo '</ul>';
}

/** Site-owned fallback items shown before editors add real content. */
function rz_demo_products( $section ) {
	$sets = array(
		'featured' => array(
			array( 'id' => 'tedemogu', 'name' => 'てでもぐ（TEDEMOGU）', 'brand' => 'てでもぐ', 'age' => '公式サイトでご確認ください', 'image' => 'images/tedemogu-product.webp', 'alt' => 'てでもぐの商品をお皿に盛り付けた様子', 'pr' => false, 'sample' => false, 'type' => 'vegetable' ),
		),
		'new' => array(
			array( 'id' => 'sample-10', 'name' => 'きなこと米粉のスティック', 'brand' => 'まめまる工房（サンプル）', 'age' => '9〜18か月', 'sample' => true, 'type' => 'beans' ),
			array( 'id' => 'sample-12', 'name' => 'さけと野菜の和風リゾット', 'brand' => 'こつぶ食堂（サンプル）', 'age' => '9〜18か月', 'sample' => true, 'type' => 'fish' ),
			array( 'id' => 'sample-08', 'name' => 'ミニ牛そぼろごはん', 'brand' => 'そよかぜファーム（サンプル）', 'age' => '12か月〜', 'sample' => true, 'type' => 'meat' ),
			array( 'id' => 'sample-04', 'name' => 'とりささみと根菜の煮もの', 'brand' => 'ひだまりキッチン（サンプル）', 'age' => '9〜11か月', 'sample' => true, 'type' => 'vegetable' ),
		),
		'popular' => array(
			array( 'id' => 'sample-06', 'name' => 'りんごとさつまいものボーロ', 'brand' => 'こつぶ食堂（サンプル）', 'age' => '9〜18か月', 'sample' => true, 'type' => 'fruit' ),
			array( 'id' => 'sample-03', 'name' => 'しらすと野菜のおやき', 'brand' => 'まめまる工房（サンプル）', 'age' => '9〜18か月', 'sample' => true, 'pr' => true, 'type' => 'fish' ),
			array( 'id' => 'sample-01', 'name' => 'やさしい10倍がゆ', 'brand' => 'ひだまりキッチン（サンプル）', 'age' => '5〜6か月', 'sample' => true, 'pr' => true, 'type' => 'rice' ),
			array( 'id' => 'sample-09', 'name' => 'バナナとりんごのピューレ', 'brand' => 'ひだまりキッチン（サンプル）', 'age' => '5〜8か月', 'sample' => true, 'type' => 'fruit' ),
		),
	);
	return isset( $sets[ $section ] ) ? $sets[ $section ] : array();
}

/** Return labeled sample products for the two launch age landing pages. */
function rz_demo_products_by_age( $age ) {
	$age_product_ids = array(
		'9-11'  => array( 'sample-04', 'sample-03', 'sample-10', 'sample-12' ),
		'12-18' => array( 'sample-08', 'sample-03', 'sample-10', 'sample-06' ),
	);
	if ( ! isset( $age_product_ids[ $age ] ) ) {
		return array();
	}

	$products_by_id = array();
	foreach ( array( 'featured', 'new', 'popular' ) as $section ) {
		foreach ( rz_demo_products( $section ) as $product ) {
			$products_by_id[ $product['id'] ] = $product;
		}
	}

	$products = array();
	foreach ( $age_product_ids[ $age ] as $product_id ) {
		if ( isset( $products_by_id[ $product_id ] ) ) {
			$products[] = $products_by_id[ $product_id ];
		}
	}
	return $products;
}

/** Initial featured shop used until editors publish shop entries. */
function rz_featured_shops_for_filters( $filters ) {
	$allowed_filters = array(
		'age'        => array( '9-11', '12-18' ),
		'type'       => array( 'frozen', 'tezukami' ),
		'ingredient' => array( 'rice', 'vegetable', 'fish', 'meat' ),
	);
	$has_filter = false;
	foreach ( $allowed_filters as $param => $allowed_values ) {
		$value = isset( $filters[ $param ] ) ? $filters[ $param ] : '';
		if ( '' === $value ) {
			continue;
		}
		$has_filter = true;
		if ( ! in_array( $value, $allowed_values, true ) ) {
			return array();
		}
	}
	if ( ! $has_filter ) {
		return array();
	}

	return array(
		array(
			'id'          => 'shop-tedemogu',
			'name'        => 'TEDEMOGU（てでもぐ）',
			'description' => '手づかみ食べの冷凍離乳食・BLWの公式通販ショップ',
			'categories'  => '9〜11か月・12〜18か月・冷凍離乳食・手づかみ食べ・米・野菜・魚・肉',
			'url'         => 'https://shop.eatbyhand.co.jp/',
			'image'       => 'https://shop.eatbyhand.co.jp/cdn/shop/t/55/assets/mv.png?v=38514592127995164781792120120',
			'alt'         => '手づかみ離乳食を食べる赤ちゃんとTEDEMOGUのファーストビュー',
			'sample'      => false,
			'pr'          => false,
		),
	);
}

/** Fetch published shops assigned to the selected WordPress categories. */
function rz_get_shop_cards( $filters = array() ) {
	$tax_map   = array( 'age' => 'rz_age', 'type' => 'rz_food_type', 'ingredient' => 'rz_ingredient' );
	$tax_query = array( 'relation' => 'AND' );
	foreach ( $tax_map as $param => $taxonomy ) {
		if ( ! empty( $filters[ $param ] ) ) {
			$tax_query[] = array(
				'taxonomy' => $taxonomy,
				'field'    => 'slug',
				'terms'    => sanitize_title( $filters[ $param ] ),
			);
		}
	}
	$args = array(
		'post_type'      => 'rz_shop',
		'post_status'    => 'publish',
		'posts_per_page' => 24,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
		'no_found_rows'  => true,
	);
	if ( count( $tax_query ) > 1 ) {
		$args['tax_query'] = $tax_query;
	}
	$query = new WP_Query( $args );
	$items = array();
	foreach ( $query->posts as $post ) {
		$category_names = array();
		foreach ( array( 'rz_age', 'rz_food_type', 'rz_ingredient' ) as $taxonomy ) {
			$terms = get_the_terms( $post, $taxonomy );
			if ( $terms && ! is_wp_error( $terms ) ) {
				$category_names = array_merge( $category_names, wp_list_pluck( $terms, 'name' ) );
			}
		}
		$items[] = array(
			'id'          => (string) $post->ID,
			'name'        => get_the_title( $post ),
			'description' => get_the_excerpt( $post ),
			'categories'  => implode( '・', array_unique( $category_names ) ),
			'url'         => get_post_meta( $post->ID, '_rz_shop_url', true ),
			'image'       => get_the_post_thumbnail_url( $post, 'medium_large' ),
			'alt'         => get_post_meta( get_post_thumbnail_id( $post ), '_wp_attachment_image_alt', true ),
			'pr'          => '1' === get_post_meta( $post->ID, '_rz_shop_is_pr', true ),
			'sample'      => '1' === get_post_meta( $post->ID, '_rz_shop_is_sample', true ),
		);
	}
	wp_reset_postdata();
	return $items;
}

/** Whether editors have published at least one real shop entry. */
function rz_has_published_shops() {
	$counts = wp_count_posts( 'rz_shop' );
	return $counts && ! empty( $counts->publish );
}

/** Output a shop card for the category result pages. */
function rz_shop_card( $shop ) {
	$image   = ! empty( $shop['image'] ) ? $shop['image'] : '';
	$url     = ! empty( $shop['url'] ) ? $shop['url'] : '';
	$is_pr   = ! empty( $shop['pr'] );
	$is_demo = ! empty( $shop['sample'] );
	$tag     = $url ? 'a' : 'div';
	?>
	<article class="product-card shop-card<?php echo $is_pr ? ' product-card--pr' : ''; ?>" aria-label="<?php echo esc_attr( $is_pr ? 'PRショップ：' . $shop['name'] : $shop['name'] ); ?>">
		<<?php echo esc_html( $tag ); ?> class="product-card__link"<?php if ( $url ) : ?> href="<?php echo esc_url( $url ); ?>" target="_blank" rel="<?php echo $is_pr ? 'sponsored noopener' : 'noopener'; ?>"<?php endif; ?>>
			<div class="product-card__visual product-card__visual--vegetable">
				<?php if ( $image ) : ?><img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( ! empty( $shop['alt'] ) ? $shop['alt'] : $shop['name'] . 'のショップ画像' ); ?>" loading="lazy" width="640" height="512"><?php else : ?><span class="shop-illustration" aria-hidden="true"><?php echo rz_icon( 'store' ); ?></span><?php endif; ?>
				<div class="product-card__badges"><?php if ( $is_pr ) : ?><span class="badge badge--pr" aria-label="広告（PR）">PR</span><?php endif; ?><?php if ( $is_demo ) : ?><span class="badge badge--sample">サンプル</span><?php endif; ?></div>
			</div>
			<div class="product-card__body">
				<p class="product-card__brand">オンラインショップ</p>
				<h3><?php echo esc_html( $shop['name'] ); ?></h3>
				<?php if ( ! empty( $shop['description'] ) ) : ?><p class="shop-card__description"><?php echo esc_html( $shop['description'] ); ?></p><?php endif; ?>
				<?php if ( ! empty( $shop['categories'] ) ) : ?><p class="product-card__age"><span>掲載カテゴリー</span><?php echo esc_html( $shop['categories'] ); ?></p><?php endif; ?>
				<strong class="shop-card__cta"><?php echo $url ? 'ショップを見る（外部サイト）' : '公開準備中'; ?><?php if ( $url ) : ?><?php echo rz_icon( 'arrow' ); ?><?php endif; ?></strong>
			</div>
		</<?php echo esc_html( $tag ); ?>>
	</article>
	<?php
}

/** Fetch product cards from WordPress and use labeled demo data while empty. */
function rz_get_product_cards( $section, $limit = 4 ) {
	$args = array(
		'post_type'      => 'rz_product',
		'post_status'    => 'publish',
		'posts_per_page' => $limit,
		'no_found_rows'  => true,
	);
	if ( 'featured' === $section ) {
		$args['meta_key']   = '_rz_is_pr';
		$args['meta_value'] = '1';
	} elseif ( 'popular' === $section ) {
		$args['meta_key'] = '_rz_views30d';
		$args['orderby']  = 'meta_value_num';
		$args['order']    = 'DESC';
	} else {
		$args['orderby'] = 'date';
		$args['order']   = 'DESC';
	}
	$query = new WP_Query( $args );
	if ( ! $query->have_posts() ) {
		return rz_demo_products( $section );
	}
	$items = array();
	foreach ( $query->posts as $post ) {
		$brands = get_the_terms( $post, 'rz_brand' );
		$ages   = get_the_terms( $post, 'rz_age' );
		$items[] = array(
			'id'        => (string) $post->ID,
			'name'      => get_the_title( $post ),
			'brand'     => ( $brands && ! is_wp_error( $brands ) ) ? $brands[0]->name : '',
			'age'       => ( $ages && ! is_wp_error( $ages ) ) ? implode( '・', wp_list_pluck( $ages, 'name' ) ) : '公式サイトでご確認ください',
			'url'       => get_permalink( $post ),
			'image'     => get_the_post_thumbnail_url( $post, 'medium_large' ),
			'alt'       => get_post_meta( get_post_thumbnail_id( $post ), '_wp_attachment_image_alt', true ),
			'pr'        => '1' === get_post_meta( $post->ID, '_rz_is_pr', true ),
			'sample'    => '1' === get_post_meta( $post->ID, '_rz_is_sample', true ),
			'type'      => 'vegetable',
		);
	}
	wp_reset_postdata();
	return $items;
}

/** Output a product card shared by the home and archive templates. */
function rz_product_card( $item, $rank = 0, $show_compare = true, $show_pr = true ) {
	$url      = ! empty( $item['url'] ) ? $item['url'] : get_post_type_archive_link( 'rz_product' );
	$image    = ! empty( $item['image'] ) ? ( preg_match( '#^https?://#', $item['image'] ) ? $item['image'] : rz_asset( $item['image'] ) ) : '';
	$type     = ! empty( $item['type'] ) ? $item['type'] : 'vegetable';
	$is_pr    = $show_pr && ! empty( $item['pr'] );
	$is_demo  = ! empty( $item['sample'] );
	?>
	<article class="product-card<?php echo $is_pr ? ' product-card--pr' : ''; ?>" aria-label="<?php echo esc_attr( $is_pr ? 'PR商品：' . $item['name'] : $item['name'] ); ?>">
		<a class="product-card__link" href="<?php echo esc_url( $url ?: '#' ); ?>">
			<div class="product-card__visual product-card__visual--<?php echo esc_attr( $type ); ?>">
				<?php if ( $image ) : ?>
					<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( ! empty( $item['alt'] ) ? $item['alt'] : $item['name'] ); ?>" loading="lazy" width="640" height="512">
				<?php else : ?>
					<span class="food-illustration" role="img" aria-label="<?php echo esc_attr( $item['name'] . 'のイメージイラスト（サンプル）' ); ?>"><i></i><b></b><em></em></span>
				<?php endif; ?>
				<div class="product-card__badges">
					<?php if ( $is_pr ) : ?><span class="badge badge--pr" aria-label="広告（PR）">PR</span><?php endif; ?>
					<?php if ( $is_demo ) : ?><span class="badge badge--sample">サンプル</span><?php endif; ?>
				</div>
				<?php if ( $rank ) : ?><span class="rank rank--<?php echo esc_attr( min( 4, $rank ) ); ?>"><?php echo esc_html( $rank ); ?><span class="screen-reader-text">位</span></span><?php endif; ?>
			</div>
			<div class="product-card__body">
				<p class="product-card__brand"><?php echo esc_html( $item['brand'] ); ?></p>
				<h3><?php echo esc_html( $item['name'] ); ?></h3>
				<p class="product-card__age"><span>対象月齢</span><?php echo esc_html( $item['age'] ); ?></p>
			</div>
		</a>
		<?php if ( $show_compare ) : ?>
			<button class="compare-button" type="button" data-compare-id="<?php echo esc_attr( $item['id'] ); ?>" data-compare-name="<?php echo esc_attr( $item['name'] ); ?>" aria-pressed="false">
				<?php echo rz_icon( 'plus' ); ?><span>比較に追加</span>
			</button>
		<?php endif; ?>
	</article>
	<?php
}

/** Section heading component. */
function rz_section_heading( $english, $title, $lead = '' ) {
	?>
	<header class="section-heading">
		<p><?php echo esc_html( $english ); ?></p>
		<h2><?php echo esc_html( $title ); ?></h2>
		<?php if ( $lead ) : ?><div><?php echo esc_html( $lead ); ?></div><?php endif; ?>
	</header>
	<?php
}
