<?php
/** Shop search shown at the existing /products/ discovery URL. @package Rinyushoku_Zukan */
get_header();
$tax_filters = array(
	'age'        => array( 'label' => '月齢', 'taxonomy' => 'rz_age' ),
	'type'       => array( 'label' => '種類', 'taxonomy' => 'rz_food_type' ),
	'ingredient' => array( 'label' => '食材', 'taxonomy' => 'rz_ingredient' ),
);
$filters = array();
foreach ( array_keys( $tax_filters ) as $param ) {
	$filters[ $param ] = isset( $_GET[ $param ] ) ? sanitize_title( wp_unslash( $_GET[ $param ] ) ) : '';
}
$shops          = rz_get_shop_cards( $filters );
$featured_shops = ( ! $shops && ! rz_has_published_shops() ) ? rz_featured_shops_for_filters( $filters ) : array();
$shown_shops    = $shops ? $shops : $featured_shops;
?>
<main id="main-content" class="content-page product-archive"><div class="site-container">
	<header class="page-heading"><p>SHOP SEARCH</p><h1>離乳食ショップを探す</h1><span>月齢・種類・食材に合うショップを見つけられます。</span></header>
	<div class="archive-layout">
		<aside class="filter-panel">
			<button class="filter-toggle" type="button" aria-expanded="false" aria-controls="product-filters">検索条件を開く</button>
			<form id="product-filters" method="get" action="<?php echo esc_url( get_post_type_archive_link( 'rz_product' ) ); ?>">
				<?php foreach ( $tax_filters as $param => $config ) : $terms = get_terms( array( 'taxonomy' => $config['taxonomy'], 'hide_empty' => false ) ); ?>
					<label><span><?php echo esc_html( $config['label'] ); ?></span><select name="<?php echo esc_attr( $param ); ?>"><option value="">指定なし</option><?php if ( ! is_wp_error( $terms ) ) : foreach ( $terms as $term ) : ?><option value="<?php echo esc_attr( $term->slug ); ?>" <?php selected( $filters[ $param ], $term->slug ); ?>><?php echo esc_html( $term->name ); ?></option><?php endforeach; endif; ?></select></label>
				<?php endforeach; ?>
				<button class="button button--primary" type="submit">この条件でショップを探す</button>
			</form>
		</aside>
		<section class="archive-results" aria-labelledby="results-title">
			<div class="archive-results__heading"><h2 id="results-title"><?php echo esc_html( count( $shown_shops ) ); ?>件のショップ</h2></div>
			<?php if ( $shown_shops ) : ?>
				<ul class="product-grid shop-grid"><?php foreach ( $shown_shops as $shop ) : ?><li><?php rz_shop_card( $shop ); ?></li><?php endforeach; ?></ul>
			<?php else : ?>
				<div class="empty-state"><h2>条件に合うショップがありません</h2><p>条件を減らして、もう一度お試しください。</p></div>
			<?php endif; ?>
		</section>
	</div>
</div></main>
<?php get_footer(); ?>
