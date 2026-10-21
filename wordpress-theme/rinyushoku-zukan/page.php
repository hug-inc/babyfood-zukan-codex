<?php
/** Standard page template. @package Rinyushoku_Zukan */
get_header();
?>
<main id="main-content" class="content-page"><div class="site-container site-container--narrow">
	<?php while ( have_posts() ) : the_post(); ?>
		<nav class="breadcrumbs" aria-label="パンくずリスト"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">トップ</a><span>/</span><?php the_title(); ?></nav>
		<article <?php post_class( 'entry-card' ); ?>><h1><?php the_title(); ?></h1><div class="entry-content"><?php the_content(); ?></div></article>
	<?php endwhile; ?>
</div></main>
<?php get_footer(); ?>
