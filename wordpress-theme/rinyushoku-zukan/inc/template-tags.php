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

/** Default navigation mirrors the approved prototype when no WP menu exists. */
function rz_default_menu( $args = array() ) {
	$links = array(
		array( get_post_type_archive_link( 'rz_product' ) ?: home_url( '/products/' ), '商品をさがす' ),
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
			array( 'id' => 'tedemogu', 'name' => 'てでもぐ（TEDEMOGU）', 'brand' => 'てでもぐ', 'age' => '公式サイトでご確認ください', 'image' => 'images/tedemogu-product.webp', 'alt' => 'てでもぐの商品をお皿に盛り付けた様子', 'pr' => true, 'sample' => false, 'type' => 'vegetable' ),
			array( 'id' => 'sample-01', 'name' => 'やさしい10倍がゆ', 'brand' => 'ひだまりキッチン（サンプル）', 'age' => '5〜6か月', 'pr' => true, 'sample' => true, 'type' => 'rice' ),
			array( 'id' => 'sample-02', 'name' => 'にんじんとかぼちゃのペースト', 'brand' => 'こつぶ食堂（サンプル）', 'age' => '5〜8か月', 'pr' => true, 'sample' => true, 'type' => 'vegetable' ),
			array( 'id' => 'sample-03', 'name' => 'しらすと野菜のおやき', 'brand' => 'まめまる工房（サンプル）', 'age' => '9〜18か月', 'pr' => true, 'sample' => true, 'type' => 'fish' ),
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
function rz_product_card( $item, $rank = 0 ) {
	$url      = ! empty( $item['url'] ) ? $item['url'] : get_post_type_archive_link( 'rz_product' );
	$image    = ! empty( $item['image'] ) ? ( preg_match( '#^https?://#', $item['image'] ) ? $item['image'] : rz_asset( $item['image'] ) ) : '';
	$type     = ! empty( $item['type'] ) ? $item['type'] : 'vegetable';
	$is_pr    = ! empty( $item['pr'] );
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
		<button class="compare-button" type="button" data-compare-id="<?php echo esc_attr( $item['id'] ); ?>" data-compare-name="<?php echo esc_attr( $item['name'] ); ?>" aria-pressed="false">
			<?php echo rz_icon( 'plus' ); ?><span>比較に追加</span>
		</button>
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
