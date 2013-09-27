		<script>
			document.write('<script src=' + ('__proto__' in {} ? '/js/vendor/zepto' : '/js/vendor/jquery') + '.js><\/script>')
		</script>
		<script src="/js/foundation/foundation.js"></script>
		<script src="/js/foundation/foundation.alerts.js"></script>
		<script src="/js/foundation/foundation.clearing.js"></script>
		<script src="/js/foundation/foundation.cookie.js"></script>
		<script src="/js/foundation/foundation.dropdown.js"></script>
		<script src="/js/foundation/foundation.forms.js"></script>
		<script src="/js/foundation/foundation.joyride.js"></script>
		<script src="/js/foundation/foundation.magellan.js"></script>
		<script src="/js/foundation/foundation.orbit.js"></script>
		<script src="/js/foundation/foundation.placeholder.js"></script>
		<script src="/js/foundation/foundation.reveal.js"></script>
		<script src="/js/foundation/foundation.section.js"></script>
		<script src="/js/foundation/foundation.tooltips.js"></script>
		<script src="/js/foundation/foundation.topbar.js"></script>
		<script src="/js/foundation/foundation.interchange.js"></script>
		<script src="/js/foundation/foundation.abide.js"></script>
		<script src="/js/jquery.noty-full-min.js"></script>
		<script src="/js/jsColor/jscolor.js"></script>
		<script src="/js/form.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
		<script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
		<script src="/js/general.js"></script>
		<script>
			$(document).foundation();
			$('.preloader').hide();
		</script>
		
		<div class="row">
			<div class="large-10 columns small-centered large-centered text-center">
				<footer>
					<hr/>
					<a href="#" data-dropdown="langDrop" class="button dropdown tiny"><? echo _("Change Language");?></a>
					<ul id="langDrop" class="f-dropdown">
						<li><a href="#" class="changeLang" data-new-lang="en"><? echo _("English");?></a></li>
						<li><a href="#" class="changeLang" data-new-lang="de"><? echo _("German");?></a></li>
					</ul>
					<div class="custom-inline-list-centered">
						<ul class="custom-inline-list">
							<li><a href="///facebook.com/PreoDay" 	target="_blank" title="<?echo _('Like us on Facebook');?> - facebook.com/PreoDay"><?echo _("Facebook");?></a></li>
							<li><a href="//twitter.com/PreoDayUK" 	target="_blank" title="<?echo _('Follow us on Twitter');?> - @PreoDayUK"><?echo _("Twitter");?></a></li>
							<li><a href="mailto:hello@preoday.com" 	target="_blank" title="<?echo _('Click here to contact us');?>"><?echo _("Contact");?></a></li>
							<li><a href="#" data-reveal-id="termsM"					title="<?echo _('Click here for our Terms &amp; Conditions');?>"><?echo _("Terms");?></a></li>
							<li><a href="#" data-reveal-id="privM" 					title="<?echo _('Click here for our Privacy Policy');?>"><?echo _("Privacy");?></a></li>
						</ul>
					</div>
					<?echo _("PreoDay &copy; 2013. All Rights Reserved.");?> 
				</footer>
			</div>
		</div>
	
		<div id="termsM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].'/inc/shared/terms.php');?>
		</div>
		
		<div id="privM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].'/inc/shared/privacy.php');?>
		</div>
		
	</body>
</html>