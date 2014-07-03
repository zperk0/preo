		</div> <!-- #wrap ends here -->
		<?if(isset($_SESSION['dashboardFlag']) && $_SESSION['dashboardFlag'])
		{
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/dashboard_footer.php');
			$_SESSION['dashboardFlag']=0;
		}
		else
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/regular_footer.php');?>
	
		<div id="termsM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/terms.php');?>
		</div>
		
		<div id="privM" class="reveal-modal">
			<?require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/privacy.php');?>
		</div>

		<!-- JAVASCRIPTS -->
				
		<!-- Foundation JS Files -->
		<!-- combined file -->
		<!--<script src="<?echo $_SESSION['path']?>/js/foundation/foundation_and_req_plugins.js"></script> --> <!-- This contains zepto as well -->
		<!-- original files
		<script>
			document.write('<script src=' + ('__proto__' in {} ? '<?echo $_SESSION['path']?>/js/vendor/zepto' : '<?echo $_SESSION['path']?>/js/vendor/jquery') + '.js><\/script>')
		</script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.alerts.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.cookie.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.dropdown.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.forms.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.placeholder.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.reveal.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.section.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.tooltips.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.topbar.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.datepicker.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.abide.js"></script>
		-->
		<!--	NOT NEEDED FOUNDATION JS FILES -->
		<!--
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.orbit.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.clearing.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.joyride.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.magellan.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/foundation/foundation.interchange.js"></script> 
		-->
		
		<!-- Plugins -->
		<!-- combined file -->
		<!--<script src="<?echo $_SESSION['path']?>/js/all-plugins.js"></script>-->
		<!-- original files
		<script src="<?echo $_SESSION['path']?>/js/jquery.noty-full-min.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jsColor/jscolor.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/form.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/tweet.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/timepicker.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/multi-select.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/tableSlide.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/js-actual.js"></script>
		<script src="<?echo $_SESSION['path']?>/js/googleplus.js"></script>
		-->
		
		<!-- Foundation with required JS and Plugins minified -->
		<!--<script src="<?echo $_SESSION['path']?>/js/foundation_reqPlugins_allplugins_min.js"></script>-->
		
		<!-- Bespoke JS File -->
		<!--<script src="<?echo $_SESSION['path']?>/js/general.js"></script>-->

		<?if(isset($_SERVER["PREO_LE_TOKEN"])){?>
    	<script src="<?echo $_SESSION['path']?>/js/le.min.js"></script>
    	<script>
        LE.init({token: '<?echo $_SERVER["PREO_LE_TOKEN"];?>', catchall: true, print: true});
    	</script>
		<?}?>
		
		<!-- Foundation with required JS and Plugins minified COMBINED with Bespoke JS File Generated using 'grunt build' -->
    <script src="<?echo $_SESSION['path']?>/code/shared/js_strings.php?lang=<?echo $lang?>"></script>
		<script src="<?echo $_SESSION['path']?>/js/all_scripts.min.js"></script>		<!-- JS 1/1 : to be minified and updated with timestamp -->
		<!--	<script src="<?echo $_SESSION['path']?>/js/general.js"></script>		<!-- JS 1/1 : to be minified and updated with timestamp -->
	
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
	
		<!-- PHP Driven JS Files-->
		<?if(preg_match('/\/settings/',$_SERVER['REQUEST_URI']) || preg_match('/\/dashboard/',$_SERVER['REQUEST_URI'])){?>
			<!-- Google Maps Library (no need to load this on all pages) -->
			<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
		<?}?>
		
		<!-- Foundation (REQUIRED) -->
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
		
		<?if((isset($_SESSION['venue_edit_on']) && $_SESSION['venue_edit_on'])){?>
			<!-- Only on /setting during edit -->
			<script type="text/javascript">
				$(document).ready(function() {
					if($("#map").length > 0)
					{
						var myLatLng = new google.maps.LatLng(<?echo  htmlentities($_SESSION['venue_latitude'], ENT_QUOTES).", ".htmlentities($_SESSION['venue_longitude'], ENT_QUOTES);?>);
						var marker = new google.maps.Marker({
							position: myLatLng,
							map: map,
							animation: google.maps.Animation.DROP,
							icon: pinImage,
							title: '<?echo htmlentities($_SESSION['venue_name'], ENT_QUOTES).", ".htmlentities($_SESSION['venue_address'], ENT_QUOTES);?>'
						  });
						  map.setCenter(marker.position);
						  map.setZoom(15);
					}
				});
			</script>
		<?}?>
		
		<?if((isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on']) || (isset($procMem) && $procMem)){?>
			<!-- Only on /homescreen during edit -->
			<script type="text/javascript">
				$(document).ready(function() {
					var content = $("#aHeading").val();
					if(content != '') $("#appHeading").html(content);
					
					var content = $("#aSubheading").val();
					if(content != '') $("#subHeading").html(content);
					
					<?if(isset($_SESSION['app_textColour'])){?>updateTextColour('<?echo $_SESSION['app_textColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonColour'])){?>updateButtonColour('<?echo $_SESSION['app_buttonColour']?>');<?}?>
					<?if(isset($_SESSION['app_buttonTextColour'])){?>updateButtonTextColour('<?echo $_SESSION['app_buttonTextColour']?>');<?}?>
					
					<?if(isset($_SESSION['app_logo']) && !empty($_SESSION['app_logo'])){?>
						content="<img src='<?echo $lPath.$_SESSION['app_logo']."_thumb.png";?>'/>";
						$('#appHeading').html(content);
					<?}?>
				});
			</script>
		<?}?>
		
		<?if(isset($_SESSION['app2_edit_on']) && $_SESSION['app2_edit_on']){?>
			<!-- Only on /menuscreen during edit -->
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

		
			<script type="text/javascript">	
				<?if((isset($_SESSION['venue_currency']) && $_SESSION['venue_currency'])){?>
					var SESSION_VENUE_CURRENCY = <? echo json_encode($_SESSION['venue_currency']);?>
				<? } else {?>
					var SESSION_VENUE_CURRENCY = "GBP"; /*defaults to GBP*/
				<? } ?>	
			</script>		
	</body>
</html>