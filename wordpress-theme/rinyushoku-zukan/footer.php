<?php
/**
 * Site footer.
 *
 * @package Rinyushoku_Zukan
 */
?>
<footer class="site-footer">
	<div class="site-container">
		<div class="site-footer__top">
			<div>
				<?php rz_site_logo(); ?>
				<p class="site-footer__tagline">うちの子にぴったりのベビーフードが見つかる。</p>
			</div>
			<nav aria-label="<?php esc_attr_e( 'フッターナビゲーション', 'rinyushoku-zukan' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'footer',
						'container'      => false,
						'menu_class'     => 'footer-nav',
						'fallback_cb'    => false,
					)
				);
				if ( ! has_nav_menu( 'footer' ) ) :
					?>
					<ul class="footer-nav">
						<li><a href="<?php echo esc_url( home_url( '/company/' ) ); ?>">運営会社</a></li>
						<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">お問い合わせ</a></li>
						<li><a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>">利用規約</a></li>
						<li><a href="<?php echo esc_url( home_url( '/privacy/' ) ); ?>">プライバシーポリシー</a></li>
						<li><a href="<?php echo esc_url( home_url( '/for-makers/' ) ); ?>">メーカーの方へ</a></li>
					</ul>
				<?php endif; ?>
			</nav>
		</div>
		<p class="site-footer__notice">本サイトに掲載している商品情報は、てでもぐを除きすべて架空のサンプル（デモデータ）です。実在するメーカー名は検索条件のメーカー一覧にのみ使用しており、各社の商品情報は掲載していません。</p>
		<p class="site-footer__copyright">運営：株式会社HUG<br>&copy; <?php echo esc_html( wp_date( 'Y' ) ); ?> HUG Inc.</p>
	</div>
</footer>
<aside class="compare-bar" aria-label="比較リスト" hidden>
	<div class="site-container compare-bar__inner">
		<div class="compare-bar__label"><?php echo rz_icon( 'scale' ); ?><span>比較 <b data-compare-count>0</b>/3</span></div>
		<div class="compare-bar__items" data-compare-items></div>
		<a class="button button--primary compare-bar__link" href="<?php echo esc_url( home_url( '/compare/' ) ); ?>">比較する</a>
	</div>
	<p class="compare-toast" role="status" aria-live="polite" hidden></p>
</aside>
<?php wp_footer(); ?>
</body>
</html>
