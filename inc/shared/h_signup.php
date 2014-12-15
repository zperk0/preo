<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container" id="cblue">
		<div class="navbar-header">
			<a id="logo" class="logo" href="http://preoday.com/" rel="home">Preoday</a>
		</div>
		<div class="nav navbar-nav navbar-text navbar-right">
			<nav class="takeaway">
				<li id="menu-item-75" class=" menu-item-75">
					<a href="http://preoday.com/takeaways/how-it-works/"><?php echo _("How It Works"); ?></a>
				</li>
				<li id="menu-item-76" class=" menu-item-76">
					<a href="http://preoday.com/takeaways/pricing/"><?php echo _("Pricing"); ?></a>
				</li>
			</nav>
			<?php
			$arrUrl = explode('/', $_SERVER['REDIRECT_URL']);
			$url = '';
			if (is_array($arrUrl)) {
				$url = end($arrUrl);
			}
			if ($url === 'login') {
			?>
			<a href="<?echo $_SESSION['path'];?>/signup" class="btn btn-default signin"><?php echo _("Sign up"); ?></a>
			<?php } else { ?>
			<a href="<?echo $_SESSION['path'];?>/login" class="btn btn-default signin"><?php echo _("Sign in"); ?></a>
			<?php } ?>
			<a href="#" class="btn btn-default menu" id="trigger-overlay"></a>
		</div>
	</div>
	<div class="menu-overlay overlay-hugeinc">
		<div class="container">
			<nav>
				<ul class="col col-xs-12 col-sm-6 col-md-3 col-1"><a href="#"><?php echo _("Venues"); ?></a>
					<div>
						<li class=""><a href="http://preoday.com/takeaways/"><?php echo _("Takeaways"); ?></a></li>
						<li class=""><a href="http://preoday.com/theatres/"><?php echo _("Theatres"); ?></a></li>
						<li class=""><a href="http://preoday.com/stadiums/"><?php echo _("Stadiums"); ?></a></li>
					</div>
				</ul>
				<ul class="col col-xs-12 col-sm-6 col-md-3 col-2"><a href="#"><?php echo _("About Preoday"); ?></a>
					<div>
						<li class=""><a href="http://preoday.com/about/"><?php echo _("About"); ?></a></li>
						<li class=""><a href="http://preoday.com/faq/"><?php echo _("FAQ"); ?></a></li>
						<li class=""><a href="http://preoday.com/contact/"><?php echo _("Contact"); ?></a></li>
						<li class=""><a href="http://preoday.com/press/"><?php echo _("Press"); ?></a></li>
						<li class=""><a href="http://preoday.com/blog/"><?php echo _("Blog"); ?></a></li>
					</div>
				</ul>
				<ul class="col col-xs-12 col-sm-6 col-md-3 col-3"><a href="#"><?php echo _("Work with us"); ?></a>
					<div>
						<li class=""><a href="http://preoday.com/partners/"><?php echo _("Partners"); ?></a></li>
						<li class=""><a href="http://preoday.com/portals/"><?php echo _("Portals"); ?></a></li>
					</div>
				</ul>
				<ul class="col col-xs-12 col-sm-6 col-md-3 col-4"><a href="#"><?php echo _("Legal stuff"); ?></a>
					<div>
						<li class=""><a href="http://preoday.com/privacy-policy/"><?php echo _("Privacy Policy"); ?></a></li>
						<li class=""><a href="http://preoday.com/terms-use/"><?php echo _("Terms of use"); ?></a></li>
					</div>
				</ul>
			</nav>			
		</div>
	</div>
</nav>

<!-- Foundation with required JS and Plugins minified COMBINED with Bespoke JS File Generated using 'grunt build' -->
<script src="<?echo $_SESSION['path']?>/code/shared/js_strings.php?lang=<?echo $lang?>"></script>	

<div class="nav-spacer"></div>