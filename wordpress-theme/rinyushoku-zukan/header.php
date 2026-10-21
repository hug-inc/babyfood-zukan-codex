<?php
/**
 * Site header.
 *
 * @package Rinyushoku_Zukan
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e( '本文へスキップ', 'rinyushoku-zukan' ); ?></a>
<header class="site-header">
	<div class="site-header__inner site-container">
		<?php rz_site_logo(); ?>
		<nav id="site-navigation" class="primary-nav" aria-label="<?php esc_attr_e( 'メインナビゲーション', 'rinyushoku-zukan' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'nav-list',
					'fallback_cb'    => 'rz_default_menu',
				)
			);
			?>
			<div class="mobile-menu__actions">
				<a class="button button--outline" href="<?php echo esc_url( home_url( '/for-makers/' ) ); ?>">メーカーの方へ</a>
			</div>
		</nav>
		<div class="site-header__actions">
			<a class="header-search" href="<?php echo esc_url( get_post_type_archive_link( 'rz_product' ) ?: home_url( '/products/' ) ); ?>">
				<?php echo rz_icon( 'search' ); ?><span>検索</span>
			</a>
			<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
				<span class="menu-toggle__open"><?php echo rz_icon( 'menu' ); ?></span>
				<span class="menu-toggle__close"><?php echo rz_icon( 'close' ); ?></span>
				<span class="menu-toggle__label">メニュー</span>
			</button>
		</div>
	</div>
</header>
