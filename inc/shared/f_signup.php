	<footer>
		<div class="container">
			<div class="row">
				<div class="col col-xs-12 col-sm-12 col-md-3 col-lg-3 logo-col">
					<p><a class="logo-grey" href="http://preoday.com/" rel="home">Preoday</a></p>
					<p>&#169; Preoday <?php echo date("Y") ?></p>
				</div>
				<div class="col col-xs-12 col-sm-6 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-68" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-68"><a href="#"><?php echo _("About Preoday"); ?></a></li>
						<li id="menu-item-53" class=" menu-item-53"><a href="http://preoday.com/about/"><?php echo _("About"); ?></a></li>
						<li id="menu-item-52" class=" menu-item-52"><a href="http://preoday.com/faq/"><?php echo _("FAQ"); ?></a></li>
						<li id="menu-item-51" class=" menu-item-51"><a href="http://preoday.com/contact/"><?php echo _("Contact"); ?></a></li>
						<li id="menu-item-50" class=" menu-item-50"><a href="http://preoday.com/press/"><?php echo _("Press"); ?></a></li>
						<li id="menu-item-49" class=" menu-item-49"><a href="http://preoday.com/blog/"><?php echo _("Blog"); ?></a></li>
					</nav>				
				</div>
				<div class="col col-xs-12 col-sm-6 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-67" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-67"><a href="#"><?php echo _("Work with us"); ?></a></li>
						<li id="menu-item-55" class=" menu-item-55"><a href="http://preoday.com/partners/"><?php echo _("Partners"); ?></a></li>
						<li id="menu-item-54" class=" menu-item-54"><a href="http://preoday.com/portals/"><?php echo _("Portals"); ?></a></li>
					</nav>			
				</div>
				<div class="col col-xs-12 col-sm-6 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-66" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-66"><a href="#"><?php echo _("Legal stuff"); ?></a></li>
						<li id="menu-item-57" class=" menu-item-57"><a href="http://preoday.com/privacy-policy/"><?php echo _("Privacy Policy"); ?></a></li>
						<li id="menu-item-56" class=" menu-item-56"><a href="http://preoday.com/terms-use/"><?php echo _("Terms of use"); ?></a></li>
					</nav>			
				</div>
				<div class="col col-xs-12 col-sm-6 col-md-3 col-lg-3 social-col">
					<a href="https://twitter.com/preoday" class="social-icon twitter"></a>
					<a href="https://www.facebook.com/Preoday" class="social-icon facebook"></a>
					<a href="#" class="social-icon google-plus"></a>
					<a href="#" class="social-icon youtube"></a>
					<a href="http://www.linkedin.com/company/2892744?trk=tyah" class="social-icon linkedin"></a>
				</div>
			</div>
		</div>
	</footer>
	
	<script src="<?echo $_SESSION['path']?>/js/all_scripts.min.js"></script>

	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/modernizr.custom.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/classie.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/beforeLogin/menu.js'></script>	
	

	<script type="text/javascript">
	  $(document)
		.foundation()
		.foundation('abide', {
		  <?if(preg_match('/\/login$/',$_SERVER['REQUEST_URI']) || preg_match('/\/profile$/',$_SERVER['REQUEST_URI'])  || preg_match('/\/users$/',$_SERVER['REQUEST_URI']) ){?>
		  live_validate: false,
		  <?}?>
		  patterns: {
			password: /^.+$/
		  }
		});
	</script>

	<?php 
	if ($url == 'signup') {
	?>
		<script type="text/javascript" src="https://js.stripe.com/v2/"></script> 
	<?php
	}
	?>

    <div class="loading" id="loading">
      <div class="background-loading"></div>
      <div class="loading-content">
        <div class="spinner">
          <div class="b1 se"></div>
          <div class="b2 se"></div>
          <div class="b3 se"></div>
          <div class="b4 se"></div>
          <div class="b5 se"></div>
          <div class="b6 se"></div>
          <div class="b7 se"></div>
          <div class="b8 se"></div>
          <div class="b9 se"></div>
          <div class="b10 se"></div>
          <div class="b11 se"></div>
          <div class="b12 se"></div>
        </div>
      </div>
    </div>  
</body>
</html>