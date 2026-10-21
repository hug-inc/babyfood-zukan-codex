<?php
/** Product details. @package Rinyushoku_Zukan */
get_header();
?>
<main id="main-content" class="content-page"><div class="site-container site-container--narrow">
	<?php while ( have_posts() ) : the_post(); $brands = get_the_terms( get_the_ID(), 'rz_brand' ); $ages = get_the_terms( get_the_ID(), 'rz_age' ); $types = get_the_terms( get_the_ID(), 'rz_food_type' ); $ingredients = get_the_terms( get_the_ID(), 'rz_ingredient' ); ?>
		<nav class="breadcrumbs" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a><span>/</span><a href="<?php echo esc_url( get_post_type_archive_link( 'rz_product' ) ); ?>">商品検索</a></nav>
		<article <?php post_class( 'product-detail' ); ?>><div class="product-detail__image"><?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'large' ); else : ?><div class="product-placeholder"><span>商品画像</span></div><?php endif; ?></div><div class="product-detail__main">
			<?php if ( '1' === get_post_meta( get_the_ID(), '_rz_is_pr', true ) ) : ?><span class="badge badge--pr">PR</span><?php endif; ?>
			<?php if ( '1' === get_post_meta( get_the_ID(), '_rz_is_sample', true ) ) : ?><span class="badge badge--sample">サンプル／デモデータ</span><?php endif; ?>
			<p class="product-detail__brand"><?php echo esc_html( $brands && ! is_wp_error( $brands ) ? $brands[0]->name : '' ); ?></p><h1><?php the_title(); ?></h1><div class="entry-content"><?php the_content(); ?></div>
			<dl class="product-specs"><div><dt>対象月齢</dt><dd><?php echo esc_html( $ages && ! is_wp_error( $ages ) ? implode( '・', wp_list_pluck( $ages, 'name' ) ) : '公式サイトでご確認ください' ); ?></dd></div><div><dt>商品タイプ</dt><dd><?php echo esc_html( $types && ! is_wp_error( $types ) ? implode( '・', wp_list_pluck( $types, 'name' ) ) : '公式サイトでご確認ください' ); ?></dd></div><div><dt>食材</dt><dd><?php echo esc_html( $ingredients && ! is_wp_error( $ingredients ) ? implode( '・', wp_list_pluck( $ingredients, 'name' ) ) : '公式サイトでご確認ください' ); ?></dd></div><div><dt>価格</dt><dd><?php $price = absint( get_post_meta( get_the_ID(), '_rz_price', true ) ); echo $price ? esc_html( number_format_i18n( $price ) . '円（税込）' ) : '公式サイトでご確認ください'; ?></dd></div><div><dt>原材料</dt><dd><?php echo esc_html( get_post_meta( get_the_ID(), '_rz_raw_materials', true ) ?: '公式サイトでご確認ください' ); ?></dd></div><div><dt>アレルゲン</dt><dd><?php echo esc_html( get_post_meta( get_the_ID(), '_rz_allergens', true ) ?: '公式サイトでご確認ください' ); ?></dd></div><div><dt>栄養成分</dt><dd><?php echo esc_html( get_post_meta( get_the_ID(), '_rz_nutrition', true ) ?: '公式サイトでご確認ください' ); ?></dd></div></dl>
			<?php $ec_url = get_post_meta( get_the_ID(), '_rz_ec_url', true ); if ( $ec_url ) : ?><a class="button button--primary product-detail__ec" href="<?php echo esc_url( $ec_url ); ?>" target="_blank" rel="noopener sponsored">公式ECサイトで購入する<span class="screen-reader-text">（外部サイト）</span></a><?php endif; ?>
			<button class="compare-button compare-button--large" type="button" data-compare-id="<?php echo esc_attr( get_the_ID() ); ?>" data-compare-name="<?php echo esc_attr( get_the_title() ); ?>" aria-pressed="false"><?php echo rz_icon( 'plus' ); ?><span>比較に追加</span></button>
		</div></article>
	<?php endwhile; ?>
</div></main>
<?php get_footer(); ?>
