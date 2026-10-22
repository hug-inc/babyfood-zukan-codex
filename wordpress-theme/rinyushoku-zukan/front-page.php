<?php
/**
 * Front page — top-priority recreation of the approved prototype.
 *
 * @package Rinyushoku_Zukan
 */

get_header();

$archive_url = get_post_type_archive_link( 'rz_product' ) ?: home_url( '/products/' );
$ages = array(
	array( 'slug' => '5-6', 'label' => '5〜6か月', 'stage' => 'ゴックン期', 'image' => 'age-5-6.webp', 'alt' => 'テーブルの前に座ってほほえむ赤ちゃん' ),
	array( 'slug' => '7-8', 'label' => '7〜8か月', 'stage' => 'モグモグ期', 'image' => 'age-7-8.webp', 'alt' => '手に持った野菜スティックを食べる赤ちゃん' ),
	array( 'slug' => '9-11', 'label' => '9〜11か月', 'stage' => 'カミカミ期', 'image' => 'age-9-11.webp', 'alt' => 'おやきを両手で持って食べる赤ちゃん' ),
	array( 'slug' => '12-18', 'label' => '12〜18か月', 'stage' => 'パクパク期', 'image' => 'age-12-18.webp', 'alt' => 'ママと一緒に食卓で笑顔を見せる子ども' ),
	array( 'slug' => '18plus', 'label' => '1歳半〜', 'stage' => '幼児食へ', 'image' => 'age-18plus.webp', 'alt' => 'ママに抱き上げられて笑う子ども' ),
);
$types = array(
	array( 'slug' => 'retort', 'label' => 'レトルト・パウチ', 'description' => '常温で持ち運びやすい', 'icon' => 'package' ),
	array( 'slug' => 'frozen', 'label' => '冷凍離乳食', 'description' => 'まとめて買ってストック', 'icon' => 'snow' ),
	array( 'slug' => 'tezukami', 'label' => '手づかみ食べ', 'description' => '自分で食べる練習に', 'icon' => 'hand' ),
	array( 'slug' => 'freezedry', 'label' => 'フリーズドライ', 'description' => 'お湯で戻してすぐ使える', 'icon' => 'droplet' ),
	array( 'slug' => 'snack', 'label' => 'おやつ', 'description' => '補食やごほうびに', 'icon' => 'cookie' ),
);
$ingredients = array(
	array( 'slug' => 'rice', 'label' => '米' ),
	array( 'slug' => 'vegetable', 'label' => '野菜' ),
	array( 'slug' => 'fish', 'label' => '魚' ),
	array( 'slug' => 'meat', 'label' => '肉' ),
	array( 'slug' => 'beans', 'label' => '豆類' ),
	array( 'slug' => 'fruit', 'label' => '果物' ),
);
?>
<main id="main-content">
	<section class="hero" aria-labelledby="hero-title">
		<div class="site-container hero__grid">
			<div class="hero__photo">
				<img src="<?php echo esc_url( rz_asset( 'images/hero-baby.webp' ) ); ?>" alt="ハイチェアに座り、笑顔で野菜を食べる赤ちゃん" width="900" height="1125" fetchpriority="high">
				<span class="hero__bubble" aria-hidden="true">かんたん比較！</span>
			</div>
			<div class="hero__content">
				<p class="hero__eyebrow">ベビーフードの検索・比較メディア</p>
				<h1 id="hero-title">うちの子に<span>ぴったり</span>の<br>ベビーフードが見つかる。</h1>
				<p class="hero__lead">全国のベビーフードを、月齢や食材から<br class="mobile-only">かんたんに検索・比較できます。</p>
				<form class="finder" method="get" action="<?php echo esc_url( $archive_url ); ?>">
					<p class="finder__title"><?php echo rz_icon( 'search' ); ?>条件からさがす</p>
					<div class="finder__fields">
						<label><span>月齢</span><select name="age"><option value="">指定なし</option><?php foreach ( $ages as $age ) : ?><option value="<?php echo esc_attr( $age['slug'] ); ?>"><?php echo esc_html( $age['label'] ); ?></option><?php endforeach; ?></select></label>
						<label><span>種類</span><select name="type"><option value="">指定なし</option><?php foreach ( $types as $type ) : ?><option value="<?php echo esc_attr( $type['slug'] ); ?>"><?php echo esc_html( $type['label'] ); ?></option><?php endforeach; ?></select></label>
						<label><span>食材</span><select name="ingredient"><option value="">指定なし</option><?php foreach ( $ingredients as $ingredient ) : ?><option value="<?php echo esc_attr( $ingredient['slug'] ); ?>"><?php echo esc_html( $ingredient['label'] ); ?></option><?php endforeach; ?></select></label>
					</div>
					<button class="button button--primary finder__submit" type="submit"><?php echo rz_icon( 'search' ); ?>この条件でショップを探す</button>
				</form>
			</div>
		</div>
	</section>

	<section id="age" class="home-section" aria-labelledby="age-title">
		<div class="site-container">
			<?php rz_section_heading( 'BY AGE', '月齢から探す', 'お子さまの月齢に合うショップをチェック' ); ?>
			<ul class="age-grid">
				<?php foreach ( $ages as $index => $age ) : ?>
					<li<?php echo 4 === $index ? ' class="age-grid__last"' : ''; ?>><a class="age-card" href="<?php echo esc_url( add_query_arg( 'age', $age['slug'], $archive_url ) ); ?>">
						<img src="<?php echo esc_url( rz_asset( 'images/' . $age['image'] ) ); ?>" alt="<?php echo esc_attr( $age['alt'] ); ?>" loading="lazy" width="600" height="600">
						<span class="age-card__body"><span><small><?php echo esc_html( $age['stage'] ); ?></small><strong><?php echo esc_html( $age['label'] ); ?></strong></span><?php echo rz_icon( 'chevron' ); ?></span>
					</a></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>

	<section id="type" class="home-section home-section--white" aria-labelledby="type-title">
		<div class="site-container">
			<?php rz_section_heading( 'BY TYPE', '種類から探す' ); ?>
			<ul class="type-grid">
				<?php foreach ( $types as $index => $type ) : ?>
					<li<?php echo 4 === $index ? ' class="type-grid__last"' : ''; ?>><a class="type-card" href="<?php echo esc_url( add_query_arg( 'type', $type['slug'], $archive_url ) ); ?>"><span class="type-card__icon"><?php echo rz_icon( $type['icon'] ); ?></span><span><strong><?php echo esc_html( $type['label'] ); ?></strong><small><?php echo esc_html( $type['description'] ); ?></small></span></a></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>

	<section id="ingredient" class="home-section" aria-labelledby="ingredient-title">
		<div class="site-container">
			<?php rz_section_heading( 'BY INGREDIENT', '食材から探す' ); ?>
			<ul class="ingredient-grid">
				<?php foreach ( $ingredients as $ingredient ) : ?>
					<li><a class="ingredient-card ingredient-card--<?php echo esc_attr( $ingredient['slug'] ); ?>" href="<?php echo esc_url( add_query_arg( 'ingredient', $ingredient['slug'], $archive_url ) ); ?>"><span class="ingredient-card__icon"><?php echo rz_ingredient_icon( $ingredient['slug'] ); ?></span><strong><?php echo esc_html( $ingredient['label'] ); ?></strong></a></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>

	<?php
	$sections = array(
		array( 'id' => 'featured', 'en' => 'PICK UP', 'title' => '注目のベビーフードブランド', 'class' => 'product-section--featured', 'rank' => false ),
		array( 'id' => 'new', 'en' => 'NEW ARRIVALS', 'title' => '新着のベビーフードブランド', 'class' => '', 'rank' => false ),
		array( 'id' => 'popular', 'en' => 'RANKING', 'title' => '人気のベビーフードブランド', 'class' => 'product-section--white', 'rank' => true ),
	);
	foreach ( $sections as $section ) :
		$products = rz_get_product_cards( $section['id'], 4 );
		?>
		<section id="<?php echo esc_attr( $section['id'] ); ?>" class="home-section product-section <?php echo esc_attr( $section['class'] ); ?>" aria-labelledby="<?php echo esc_attr( $section['id'] ); ?>-title">
			<div class="site-container">
				<?php rz_section_heading( $section['en'], $section['title'] ); ?>
				<?php if ( $section['rank'] ) : ?><p class="ranking-note"><?php echo rz_icon( 'info' ); ?>過去30日間の商品詳細ページ閲覧数をもとに集計（毎日更新）</p><?php endif; ?>
				<ul class="product-grid<?php echo 'featured' === $section['id'] ? ' product-grid--featured-brand' : ''; ?>">
					<?php foreach ( $products as $index => $product ) : ?><li><?php rz_product_card( $product, $section['rank'] ? $index + 1 : 0, 'featured' !== $section['id'], 'featured' !== $section['id'] ); ?></li><?php endforeach; ?>
				</ul>
				<?php if ( 'popular' === $section['id'] ) : ?><p class="pr-note"><span class="badge badge--pr">PR</span>「PR」表示のある商品は、メーカーから広告掲載料をいただいて掲載しています。</p><?php endif; ?>
			</div>
		</section>
	<?php endforeach; ?>

	<section id="articles" class="home-section home-section--white" aria-labelledby="articles-title">
		<div class="site-container">
			<?php rz_section_heading( 'COLUMN', 'お役立ち記事' ); ?>
			<div class="article-grid">
			<?php
			$article_query = new WP_Query( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'no_found_rows' => true ) );
			if ( $article_query->have_posts() ) :
				while ( $article_query->have_posts() ) : $article_query->the_post();
					$article_categories = get_the_category();
					$article_category   = $article_categories ? $article_categories[0]->name : __( 'お役立ち記事', 'rinyushoku-zukan' );
					?>
					<article class="article-card"><a href="<?php the_permalink(); ?>"><?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); endif; ?><div><span class="chip"><?php echo esc_html( $article_category ); ?></span><h3><?php the_title(); ?></h3><strong>記事を読む <?php echo rz_icon( 'arrow' ); ?></strong></div></a></article>
					<?php
				endwhile;
				wp_reset_postdata();
			else :
				$demo_articles = array(
					array( 'category' => '離乳食の進め方', 'title' => '離乳食はいつから？月齢ごとの進め方とベビーフードの上手な取り入れ方', 'image' => 'article-start.webp', 'alt' => 'トレーに並んだ離乳食の前に座る赤ちゃん' ),
					array( 'category' => '手づかみ食べ', 'title' => '手づかみ食べはいつから？はじめどきのサインと食べやすい形のポイント', 'image' => 'article-tezukami.webp', 'alt' => '小さな手で手づかみ食べ用のおやきを持つ赤ちゃん' ),
					array( 'category' => '冷凍離乳食の選び方', 'title' => '冷凍離乳食の選び方｜保存・解凍のコツと比較するときのチェックポイント', 'image' => 'article-frozen.webp', 'alt' => '冷凍庫から小分けの離乳食を取り出すママと赤ちゃん' ),
				);
				foreach ( $demo_articles as $article ) :
					?>
					<article class="article-card"><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><img src="<?php echo esc_url( rz_asset( 'images/' . $article['image'] ) ); ?>" alt="<?php echo esc_attr( $article['alt'] ); ?>" loading="lazy" width="640" height="400"><div><span class="chip"><?php echo esc_html( $article['category'] ); ?></span><h3><?php echo esc_html( $article['title'] ); ?></h3><strong>記事を読む <?php echo rz_icon( 'arrow' ); ?></strong></div></a></article>
				<?php endforeach; ?>
			<?php endif; ?>
			</div>
		</div>
	</section>

	<section class="maker-cta" aria-labelledby="for-makers-title">
		<div class="site-container">
			<div class="maker-cta__inner">
				<img src="<?php echo esc_url( rz_asset( 'images/veggies-row.png' ) ); ?>" alt="" aria-hidden="true" loading="lazy">
				<div><p>FOR MAKERS</p><h2 id="for-makers-title">ベビーフードメーカーの方へ</h2><span>商品掲載は無料です。月齢や食材で探しているご家庭に、<br>貴社の商品を届けませんか。</span></div>
				<div class="maker-cta__buttons"><a class="button button--primary" href="<?php echo esc_url( home_url( '/for-makers/#free' ) ); ?>"><?php echo rz_icon( 'store' ); ?>商品を無料掲載する</a><a class="button button--outline" href="<?php echo esc_url( home_url( '/for-makers/#ads' ) ); ?>"><?php echo rz_icon( 'megaphone' ); ?>広告掲載について</a></div>
			</div>
		</div>
	</section>
</main>
<?php get_footer(); ?>
