<?php
/**
 * Default posts index.
 *
 * @package Rinyushoku_Zukan
 */
get_header();
?>
<main id="main-content" class="content-page">
	<div class="site-container site-container--narrow">
		<header class="page-heading"><p>JOURNAL</p><h1><?php echo is_home() ? 'お役立ち記事' : esc_html( get_the_archive_title() ); ?></h1></header>
		<?php if ( have_posts() ) : ?>
			<div class="post-list">
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'post-list__item' ); ?>><a href="<?php the_permalink(); ?>"><?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'medium_large' ); endif; ?><div><time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time><h2><?php the_title(); ?></h2><p><?php echo esc_html( get_the_excerpt() ); ?></p></div></a></article>
			<?php endwhile; ?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p class="empty-state">記事はまだありません。</p>
		<?php endif; ?>
	</div>
</main>
<?php get_footer(); ?>
