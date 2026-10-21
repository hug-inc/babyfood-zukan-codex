<?php
/** 404 page. @package Rinyushoku_Zukan */
get_header();
?>
<main id="main-content" class="content-page"><div class="site-container site-container--narrow"><div class="empty-state"><p class="empty-state__code">404</p><h1>ページが見つかりません</h1><p>URLをご確認いただくか、トップページからお探しください。</p><a class="button button--primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">トップページへ戻る</a></div></div></main>
<?php get_footer(); ?>
