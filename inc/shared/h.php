<div class="contain-to-grid">
	<nav class="top-bar">
		<ul class="title-area">
			<li class="name">
				<h1>
					<a href="<?echo $_SESSION['path']?>/"><img src="<?echo $_SESSION['path']?>/img/logo.png" alt="<? echo _("PreoDay");?>"/></a>
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
					<li><a href="<?echo $_SESSION['path']?>/signup.php"									><? echo _("Sign Up");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/signin.php"	class="activated"				><? echo _("Login");?></a></li>
				<?php else : 
						if(!isset($_SESSION['signupWizFlag']) || !$_SESSION['signupWizFlag']){ ?>					
					<li><a href="<?echo $_SESSION['path']?>/"											><? echo _("Home");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/"											><? echo _("Orders");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/"											><? echo _("Stats");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/eventSettings.php"							><? echo _("Events");?></a></li>
					<li><a href="<?echo $_SESSION['path']?>/menuSettings.php"							><? echo _("Menu");?></a></li>
					<li><a href="#" data-reveal-id="settingsM"											><? echo _("Settings");?></a></li>
						<?}?>
					<li><a href="<?echo $_SESSION['path']?>/code/shared/logout.php" class="activated"	><? echo _("Logout");?></a></li>
				<?php endif; ?>
			</ul>
		</section>
	</nav>
	<?php if(isset($_SESSION['logged'])) : ?>
		<div id="settingsM" class="reveal-modal">
			<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/settings/settings_content.php'); ?>
			<a class="close-reveal-modal">&#215;</a>
		</div>
	<?php endif; ?>
</div>