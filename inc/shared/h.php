<div class="contain-to-grid">
	<nav class="top-bar">
		<ul class="title-area">
			<li class="name">
				<h1>
					<a href="/"><img src="/img/logo.png" alt="<? echo _("PreoDay");?>"/></a>
				</h1>
				<div class="progressIndicator has-tip tip-right" data-tooltip></div>
			</li>
			<li class="toggle-topbar">
				<a href="#"><i class="fi-list large"></i> <? echo _("Menu");?></a>
			</li>
		</ul>

		<section class="top-bar-section">
			<!-- Right Nav Section -->
			<ul class="right">
				<?php if(!isset($_SESSION['logged'])) : ?>
					<li class=""><a href="/signup"><? echo _("Sign Up");?></a></li>
					<li class=""><a href="/signin"><? echo _("Sign In");?></a></li>
				<?php else : ?>
					<li class=""><a href="#" data-reveal-id="settingsM"><i class="fi-wrench large"></i> <? echo _("Settings");?></a></li>
					<li class=""><a href="/signout"><i class="fi-arrow-right large"></i> <? echo _("Sign Out");?></a></li>
				<?php endif; ?>
			</ul>
		</section>
	</nav>
	<?php if(isset($_SESSION['logged'])) : ?>
		<div id="settingsM" class="reveal-modal">
			<? require($_SERVER['DOCUMENT_ROOT'].'/inc/settings/settings_content.php'); ?>
			<a class="close-reveal-modal">&#215;</a>
		</div>
	<?php endif; ?>
</div>