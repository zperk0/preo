		<script src="/js/jquery-1.8.0.js"></script>
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
			<h2><i class="fi-page-filled large"> <?echo _('PreoDay Terms &amp; Conditions');?></i></h2>
			<p class="lead">Title 1</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat a augue a elementum. Nullam vitae posuere nisl. Nunc enim justo, sagittis sed dolor vitae, euismod blandit massa. Mauris sodales dignissim nunc sed dignissim. Nullam nec egestas leo. In sed magna sem. Phasellus eget aliquam tortor. Nunc sit amet ultricies odio, vel cursus ipsum. Etiam porta egestas mauris, dapibus bibendum elit feugiat non. Fusce quis venenatis lectus. Nunc tincidunt molestie imperdiet. Duis nec lorem a nibh auctor rutrum eget in urna. Integer neque risus, imperdiet sed blandit id, lacinia eu felis. Proin ante neque, luctus sed purus id, varius convallis dolor.<br/><br/>Sed consequat tincidunt lorem, quis gravida enim sodales eu. Maecenas dignissim venenatis eros, ac vestibulum leo rutrum vitae. Sed eros dui, fringilla at elit in, auctor tempus ligula. Suspendisse bibendum eros quis erat ornare, quis rutrum est pharetra. Integer dapibus lorem sed interdum condimentum. Curabitur luctus nisi sit amet lectus aliquet dictum. Cras at metus sit amet lectus pretium accumsan id eu justo. Donec massa neque, congue sed fringilla eget, lacinia non purus. Vivamus pretium velit at ligula scelerisque, id dictum orci mattis. Praesent aliquam nibh ac imperdiet bibendum. Ut pretium sollicitudin quam, non imperdiet arcu facilisis eget.<br/><br/>Nunc mauris orci, accumsan ut mauris at, malesuada interdum arcu. Suspendisse feugiat est et vehicula interdum. Vestibulum nec sollicitudin quam. Nulla lobortis suscipit lacus a tincidunt. Praesent sodales ultricies massa, sed elementum quam blandit vitae. Sed eu mauris dui. Fusce et hendrerit orci. Sed eu mauris at metus dictum tempor vel ut ipsum. Proin a viverra lacus. Suspendisse dictum ultricies consectetur. Sed est felis, sodales vitae iaculis in, interdum at est. Nullam in arcu ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed metus nisi, placerat vitae tortor nec, gravida ullamcorper lectus. Proin vestibulum imperdiet laoreet.<br/><br/>Pellentesque vel quam vehicula, varius dolor at, egestas risus. Cras hendrerit convallis augue vel gravida. Etiam ut tempus nunc. Nullam eget ligula suscipit, ornare justo et, auctor lectus. Pellentesque ac consequat quam. Phasellus fermentum tempus tristique. Duis consequat suscipit arcu. Cras nec neque eu urna vehicula mollis at vitae est.<br/><br/>Vivamus nisl velit, dictum nec odio nec, scelerisque iaculis urna. Suspendisse nec justo sit amet velit fermentum aliquam sed vitae tortor. Quisque vel imperdiet nibh. Donec bibendum ipsum mi, eu tempus est malesuada ac. Duis porttitor pretium arcu. Praesent at elementum ante. Mauris ut laoreet arcu. Mauris id adipiscing enim, ac vulputate dui. Morbi facilisis tortor quis felis fermentum adipiscing. Maecenas eu mauris vel lectus blandit tincidunt. Pellentesque ut orci at elit bibendum commodo.</p>
			<a class="close-reveal-modal">&#215;</a>
		</div>
		
		<div id="privM" class="reveal-modal">
			<h2><i class="fi-web large"> <?echo _('PreoDay Privacy Policy');?></i></h2>
			<p class="lead">Title 2</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat a augue a elementum. Nullam vitae posuere nisl. Nunc enim justo, sagittis sed dolor vitae, euismod blandit massa. Mauris sodales dignissim nunc sed dignissim. Nullam nec egestas leo. In sed magna sem. Phasellus eget aliquam tortor. Nunc sit amet ultricies odio, vel cursus ipsum. Etiam porta egestas mauris, dapibus bibendum elit feugiat non. Fusce quis venenatis lectus. Nunc tincidunt molestie imperdiet. Duis nec lorem a nibh auctor rutrum eget in urna. Integer neque risus, imperdiet sed blandit id, lacinia eu felis. Proin ante neque, luctus sed purus id, varius convallis dolor.<br/><br/>Sed consequat tincidunt lorem, quis gravida enim sodales eu. Maecenas dignissim venenatis eros, ac vestibulum leo rutrum vitae. Sed eros dui, fringilla at elit in, auctor tempus ligula. Suspendisse bibendum eros quis erat ornare, quis rutrum est pharetra. Integer dapibus lorem sed interdum condimentum. Curabitur luctus nisi sit amet lectus aliquet dictum. Cras at metus sit amet lectus pretium accumsan id eu justo. Donec massa neque, congue sed fringilla eget, lacinia non purus. Vivamus pretium velit at ligula scelerisque, id dictum orci mattis. Praesent aliquam nibh ac imperdiet bibendum. Ut pretium sollicitudin quam, non imperdiet arcu facilisis eget.<br/><br/>Nunc mauris orci, accumsan ut mauris at, malesuada interdum arcu. Suspendisse feugiat est et vehicula interdum. Vestibulum nec sollicitudin quam. Nulla lobortis suscipit lacus a tincidunt. Praesent sodales ultricies massa, sed elementum quam blandit vitae. Sed eu mauris dui. Fusce et hendrerit orci. Sed eu mauris at metus dictum tempor vel ut ipsum. Proin a viverra lacus. Suspendisse dictum ultricies consectetur. Sed est felis, sodales vitae iaculis in, interdum at est. Nullam in arcu ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed metus nisi, placerat vitae tortor nec, gravida ullamcorper lectus. Proin vestibulum imperdiet laoreet.<br/><br/>Pellentesque vel quam vehicula, varius dolor at, egestas risus. Cras hendrerit convallis augue vel gravida. Etiam ut tempus nunc. Nullam eget ligula suscipit, ornare justo et, auctor lectus. Pellentesque ac consequat quam. Phasellus fermentum tempus tristique. Duis consequat suscipit arcu. Cras nec neque eu urna vehicula mollis at vitae est.<br/><br/>Vivamus nisl velit, dictum nec odio nec, scelerisque iaculis urna. Suspendisse nec justo sit amet velit fermentum aliquam sed vitae tortor. Quisque vel imperdiet nibh. Donec bibendum ipsum mi, eu tempus est malesuada ac. Duis porttitor pretium arcu. Praesent at elementum ante. Mauris ut laoreet arcu. Mauris id adipiscing enim, ac vulputate dui. Morbi facilisis tortor quis felis fermentum adipiscing. Maecenas eu mauris vel lectus blandit tincidunt. Pellentesque ut orci at elit bibendum commodo.</p>
			<a class="close-reveal-modal">&#215;</a>
		</div>
		
	</body>
</html>