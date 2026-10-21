<?php
/** Standard article template. @package Rinyushoku_Zukan */
get_header();
?>
<main id="main-content" class="content-page"><div class="site-container site-container--narrow">
	<?php while ( have_posts() ) : the_post(); ?>
		<nav class="breadcrumbs" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a><span>/</span><a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ?: home_url( '/blog/' ) ); ?>">お役立ち記事</a></nav>
		<article <?php post_class( 'entry-card' ); ?>><p class="entry-meta"><?php echo esc_html( get_the_date() ); ?></p><h1><?php the_title(); ?></h1><?php if ( has_post_thumbnail() ) : ?><div class="entry-hero"><?php the_post_thumbnail( 'large' ); ?></div><?php endif; ?><div class="entry-content"><?php the_content(); ?></div></article>
	<?php endwhile; ?>
</div></main>
<?php get_footer(); ?>
