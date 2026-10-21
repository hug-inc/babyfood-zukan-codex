<?php
/** Product search and archive. @package Rinyushoku_Zukan */
get_header();
$tax_filters = array(
	'age'        => array( 'label' => '月齢', 'taxonomy' => 'rz_age' ),
	'type'       => array( 'label' => '種類', 'taxonomy' => 'rz_food_type' ),
	'ingredient' => array( 'label' => '食材', 'taxonomy' => 'rz_ingredient' ),
	'brand'      => array( 'label' => 'ブランド', 'taxonomy' => 'rz_brand' ),
	'storage'    => array( 'label' => '保存方法', 'taxonomy' => 'rz_storage' ),
);
?>
<main id="main-content" class="content-page product-archive"><div class="site-container">
	<header class="page-heading"><p>SEARCH</p><h1>ベビーフードを探す</h1><span>月齢や食材などの条件から比較できます。</span></header>
	<div class="archive-layout">
		<aside class="filter-panel">
			<button class="filter-toggle" type="button" aria-expanded="false" aria-controls="product-filters">検索条件を開く</button>
			<form id="product-filters" method="get" action="<?php echo esc_url( get_post_type_archive_link( 'rz_product' ) ); ?>">
				<?php foreach ( $tax_filters as $param => $config ) : $terms = get_terms( array( 'taxonomy' => $config['taxonomy'], 'hide_empty' => false ) ); ?>
					<label><span><?php echo esc_html( $config['label'] ); ?></span><select name="<?php echo esc_attr( $param ); ?>"><option value="">指定なし</option><?php if ( ! is_wp_error( $terms ) ) : foreach ( $terms as $term ) : ?><option value="<?php echo esc_attr( $term->slug ); ?>" <?php selected( isset( $_GET[ $param ] ) ? sanitize_title( wp_unslash( $_GET[ $param ] ) ) : '', $term->slug ); ?>><?php echo esc_html( $term->name ); ?></option><?php endforeach; endif; ?></select></label>
				<?php endforeach; ?>
				<fieldset class="price-fields"><legend>価格</legend><label><span>最低価格</span><input type="number" name="price_min" min="0" step="1" inputmode="numeric" value="<?php echo esc_attr( isset( $_GET['price_min'] ) ? absint( $_GET['price_min'] ) : '' ); ?>" placeholder="0"></label><span aria-hidden="true">〜</span><label><span>最高価格</span><input type="number" name="price_max" min="0" step="1" inputmode="numeric" value="<?php echo esc_attr( isset( $_GET['price_max'] ) ? absint( $_GET['price_max'] ) : '' ); ?>" placeholder="上限なし"></label></fieldset>
				<label><span>並び順</span><select name="sort"><option value="new">新着順</option><option value="popular" <?php selected( isset( $_GET['sort'] ) ? sanitize_key( wp_unslash( $_GET['sort'] ) ) : '', 'popular' ); ?>>人気順</option><option value="price_low" <?php selected( isset( $_GET['sort'] ) ? sanitize_key( wp_unslash( $_GET['sort'] ) ) : '', 'price_low' ); ?>>価格が安い順</option><option value="price_high" <?php selected( isset( $_GET['sort'] ) ? sanitize_key( wp_unslash( $_GET['sort'] ) ) : '', 'price_high' ); ?>>価格が高い順</option></select></label>
				<button class="button button--primary" type="submit">この条件で絞り込む</button>
			</form>
		</aside>
		<section class="archive-results" aria-labelledby="results-title">
			<div class="archive-results__heading"><h2 id="results-title"><?php echo esc_html( $GLOBALS['wp_query']->found_posts ); ?>件の商品</h2></div>
			<?php if ( have_posts() ) : ?><ul class="product-grid"><?php while ( have_posts() ) : the_post(); $brands = get_the_terms( get_the_ID(), 'rz_brand' ); $ages = get_the_terms( get_the_ID(), 'rz_age' ); $item = array( 'id' => (string) get_the_ID(), 'name' => get_the_title(), 'brand' => $brands && ! is_wp_error( $brands ) ? $brands[0]->name : '', 'age' => $ages && ! is_wp_error( $ages ) ? implode( '・', wp_list_pluck( $ages, 'name' ) ) : '公式サイトでご確認ください', 'url' => get_permalink(), 'image' => get_the_post_thumbnail_url( get_the_ID(), 'medium_large' ), 'pr' => '1' === get_post_meta( get_the_ID(), '_rz_is_pr', true ), 'sample' => '1' === get_post_meta( get_the_ID(), '_rz_is_sample', true ) ); ?><li><?php rz_product_card( $item ); ?></li><?php endwhile; ?></ul><?php the_posts_pagination(); ?><?php else : ?><div class="empty-state"><h2>条件に合う商品がありません</h2><p>条件を減らして、もう一度お試しください。</p></div><?php endif; ?>
		</section>
	</div>
</div></main>
<?php get_footer(); ?>
