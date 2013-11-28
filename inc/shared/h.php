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
					<li><a href="<?echo $_SESSION['path']?>/"											><? echo _("Dashboard");?></a></li>
					<li class="has-dropdown"><a href="#" class="activated"><? echo $_SESSION['user_fName']." ".$_SESSION['user_lName'];?></a>
						<ul class="dropdown">
							<li><a href="<?echo $_SESSION['path']?>/settings.php"><?echo _("Profile");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/code/shared/logout.php"><? echo _("Logout");?></a></li>
						</ul>
					</li>	
					<li class="has-dropdown lessLeft"><a href="#"><? echo _("Help");?></a>
						<ul class="dropdown makeULWider">
							<li><a href="http://preoday.com/docs/gettingstarted.pdf"><?echo _("Getting started");?></a></li>
							<li><a href="<?echo $_SESSION['path']?>/more.php"><? echo _("Find out more");?></a></li>
						</ul>
					</li>
					<?}else{?>
					<li><a class="activated" href="<?echo $_SESSION['path']?>/code/shared/logout.php"><? echo _("Logout");?></a></li>
					<?}?>
				<?php endif; ?>
			</ul>
		</section>
	</nav>
</div>