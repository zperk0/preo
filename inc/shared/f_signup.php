	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="container">
			<div class="row">
				<div class="col col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<a class="logo-grey" href="http://preoday.madebyck.com/" rel="home">Preoday</a>
					<p>© Preoday 2014</p>
				</div>
				<div class="col col-xs-12 col-sm-2 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-68" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-68"><a href="#">About Preoday</a></li>
						<li id="menu-item-53" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-53"><a href="http://preoday.madebyck.com/about/">About</a></li>
						<li id="menu-item-52" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-52"><a href="http://preoday.madebyck.com/faq/">FAQ</a></li>
						<li id="menu-item-51" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-51"><a href="http://preoday.madebyck.com/contact/">Contact</a></li>
						<li id="menu-item-50" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-50"><a href="http://preoday.madebyck.com/press/">Press</a></li>
						<li id="menu-item-49" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-49"><a href="http://preoday.madebyck.com/blog/">Blog</a></li>
					</nav>
				</div>
				<div class="col col-xs-12 col-sm-2 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-67" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-67"><a href="#">Work with us</a></li>
						<li id="menu-item-55" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-55"><a href="http://preoday.madebyck.com/partners/">Partners</a></li>
						<li id="menu-item-54" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-54"><a href="http://preoday.madebyck.com/portals/">Portals</a></li>
					</nav>
				</div>
				<div class="col col-xs-12 col-sm-2 col-md-2 col-lg-2">
					<nav>
						<li id="menu-item-66" class="menu-header menu-item menu-item-type-custom menu-item-object-custom menu-item-66"><a href="#">Legal stuff</a></li>
						<li id="menu-item-57" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-57"><a href="http://preoday.madebyck.com/privacy-policy/">Privacy Policy</a></li>
						<li id="menu-item-56" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-56"><a href="http://preoday.madebyck.com/terms-use/">Terms of use</a></li>
					</nav>
				</div>
				<div class="col col-sm-3 col-md-3 col-lg-3">
					<a href="#" class="social-icon twitter"></a>
					<a href="#" class="social-icon facebook"></a>
					<a href="#" class="social-icon google-plus"></a>
					<a href="#" class="social-icon youtube"></a>
					<a href="#" class="social-icon linkedin"></a>
				</div>
			</div>
		</div><!-- .site-info -->
	</footer>

	<!-- Google+ External JS -->
	<script type="text/javascript">
		window.___gcfg = {
		  lang: 'en-US',
		  parsetags: 'onload'
		};
		(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/client:plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		  })();
	</script>
	
	<script type="text/javascript" src="https://js.stripe.com/v2/"></script> 
	<script type='text/javascript' src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/signup/modernizr.custom.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/signup/classie.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/signup/menu.js'></script>
	<script type='text/javascript' src='<?echo $_SESSION['path']?>/js/signup/form.js'></script>

	<?if( isset($adwordsConversionVars) ){?>
		<!-- Google Code for Register Conversion Page -->
		<script type="text/javascript">
		/* <![CDATA[ */
		<?echo($adwordsConversionVars)?>
		/* ]]> */
		</script>
		<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
		</script>
	<?}?>	

	</body>
</html>