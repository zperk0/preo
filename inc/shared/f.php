		<script>
			document.write('<script src=' + ('__proto__' in {} ? '<?echo $_SESSION['path']?>/js/vendor/zepto' : '<?echo $_SESSION['path']?>/js/vendor/jquery') + '.js><\/script>')
		</script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.alerts.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.clearing.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.cookie.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.dropdown.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.forms.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.joyride.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.magellan.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.orbit.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.placeholder.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.reveal.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.section.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.tooltips.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.topbar.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.interchange.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.abide.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jquery.noty-full-min.js"></script>
		<!--<script src="/js/jsMiniColors/jsminicolors.js"></script>-->
		<script src="<?echo $_SESSION['path']?>/js/jsColor/jscolor.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/form.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
		<script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/general.js"></script>
		<script>
			$(document).foundation();
			$('.preloader').hide();
		</script>
		
		<?if(isset($_SESSION['venue_edit_on']) && $_SESSION['venue_edit_on']){?>
			<script type="text/javascript">
				$(document).ready(function() {
					var myLatLng = new google.maps.LatLng(<?echo $_SESSION['venue_latitude'].", ".$_SESSION['venue_longitude'];?>);
					var marker = new google.maps.Marker({
						position: myLatLng,
						map: map,
						animation: google.maps.Animation.DROP,
						icon: pinImage,
						title: '<?echo $_SESSION['venue_name'].", ".$_SESSION['venue_address'];?>'
					  });
					  map.setCenter(marker.position);
					  map.setZoom(15);
				});
			</script>
		<?}?>
		
		<?if(isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on']){?>
			<script type="text/javascript">
				$(document).ready(function() {
					var content = $("#aHeading").val();
					$("#appHeading").html(content);
					
					var content = $("#aSubheading").val();
					$("#subHeading").html(content);
					
					<?if(isset($_SESSION['app_textColour'])){?>updateTextColour('<?echo $_SESSION['app_textColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonColour'])){?>updateButtonColour('<?echo $_SESSION['app_buttonColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonTextColour'])){?>updateButtonTextColour('<?echo $_SESSION['app_buttonTextColour']?>');<?}?>
					
					<?if(isset($_SESSION['app_logo']) && !empty($_SESSION['app_logo'])){?>
						content="<img src='<?echo $_SESSION['path']?>/img/logoUploads/<?echo $_SESSION['app_logo']?>'/>";
						$('#appHeading').html(content);
					<?}?>
				});
			</script>
		<?}?>
		
		<?if(isset($_SESSION['app2_edit_on']) && $_SESSION['app2_edit_on']){?>
			<script type="text/javascript">
				$(document).ready(function() {
					var content = $("#vTitle").val();
					$("#venTitle").html(content);
					
					<?if(isset($_SESSION['app_button2Colour'])){?>updateButton2Colour('<?echo $_SESSION['app_button2Colour']?>');<?}?>
					<?if(isset($_SESSION['app_button2TextColour'])){?>updateButton2TextColour('<?echo $_SESSION['app_button2TextColour']?>');<?}?>
					
					<?if(isset($_SESSION['app_button3Colour'])){?>updateButton3Colour('<?echo $_SESSION['app_button3Colour']?>');<?}?>
					<?if(isset($_SESSION['app_button3TextColour'])){?>updateButton3TextColour('<?echo $_SESSION['app_button3TextColour']?>');<?}?>
				});
			</script>
		<?}?>
		
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
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/terms.php');?>
		</div>
		
		<div id="privM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/privacy.php');?>
		</div>
		
	</body>
</html>