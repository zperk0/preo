<?php
require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/override_vars.php');
?>
<!DOCTYPE HTML>
	<!--[if IE 8]>         <html class="no-js lt-ie9" lang="en"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- <meta name="viewport" content="initial-scale=1.0" /> -->
		<title><? echo $_SESSION['OVERRIDES']["title"];?></title>
		<!-- Main CSS files -combined minified -->
		<!--<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/normalize_and_foundation_min.css" />-->
		<!-- Main CSS files -combined -->
		<!--<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/normalize_and_foundation.css" />-->
		<!-- Main CSS files -original -->
		<!--<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/normalize.css" />
		<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/foundation.css" />-->

		<!-- Bespoke CSS -combined (dependants minified) -->
		<!-- <link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/dependantsMIN_and_app.css" /> -->
		<!-- Bespoke CSS -combined-->
		<!--<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/dependants_and_app.css" /> -->
		<!-- Bespoke CSS -original-->
		<!--<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/app.css" /> -->

		<!-- Main CSS files -combined minified PLUS Bespoke CSS -combined (dependants minified) -->
		<?php
		if (isset($showCssBeforeLogin) && $showCssBeforeLogin) {
		?>
		<link rel='stylesheet' href='<? echo $_SESSION['path']?>/css/signup.css' type='text/css' media='all' />
		<?php } else { ?>
		<!--[if IE 9]>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/normalize.css" />
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/foundation.css"/>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/jquery.gridster.min.css"/>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/bower_components/select2/select2.css"/>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/chosen.min.css">
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/app.css"/>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/croppic.css"/>
		<![endif]-->
		<![if !IE]>
		<link type="text/css" rel="stylesheet" href="<? echo $_SESSION['path']?>/css/all_css.min.css" />
		<![endif]>



		<?php } ?>

		<?php
			//at this point meta has been imported so the main css is in, safe to add the overrides here!

			if (isset($_SESSION['OVERRIDES']["css"])){
				$cssFile = $_SERVER['DOCUMENT_ROOT'].$_SESSION['OVERRIDES']["css"];
				if (file_exists($cssFile)){
					echo '<link type="text/css" rel="stylesheet" href="'.$_SESSION['OVERRIDES']["css"].'" />';
				}
			}

		 ?>

		<!-- Pre-body Javascripts -->
		<!-- combined minified -->
		<script src="<? echo $_SESSION['path']?>/js/modernizr_and_jquery1.10.2_min.js"></script>

		<!-- combined -->
		<!--<script src="<?echo $_SESSION['path']?>/js/modernizr_and_jquery1.10.2.js"></script>-->
		<!-- original -->
		<!-- Mordernizr -->
		<!--<script src="<?echo $_SESSION['path']?>/js/vendor/custom.modernizr.js"></script>-->
		<!-- jQuery -->
		<!--<script src="<?echo $_SESSION['path']?>/js/jquery1.10.2.js"></script>-->

		<?if(isset($_SERVER["PREO_ANALYTICS_UA"])){?>
			<!-- Google Analytics -->
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
				{ (i[r].q=i[r].q||[]).push(arguments)}
				,i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				ga('create', '<?echo $_SERVER["PREO_ANALYTICS_UA"];?>', '<?php echo $_SESSION["OVERRIDES"]["ga_link"] ?>');
				ga('send', 'pageview');
			</script>
		<?}?>

		<!-- FONT -->
		<script type="text/javascript">
			var MTIProjectId='5cd06de2-378b-4913-a6e0-3b837629310d';
			(function() {
				var mtiTracking = document.createElement('script');
				mtiTracking.type='text/javascript';
				mtiTracking.async='true';
				mtiTracking.src=('https:'==document.location.protocol?'https:':'http:')+'//fast.fonts.net/t/trackingCode.js';
				(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
			})();
		</script>

		<!-- Favicons -->
		<link rel="apple-touch-icon" 	href="<?php echo $_SESSION['OVERRIDES']["apple-touch-icon"] ?>"	type="image/x-icon" >
		<link rel="shortcut icon" 		href="<?php echo $_SESSION['OVERRIDES']["favicon"] ?>">
	</head>
	<body>
	<div id="wrap">
