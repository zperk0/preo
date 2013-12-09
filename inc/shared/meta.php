<!DOCTYPE html>
	<!--[if IE 8]>         <html class="no-js lt-ie9" lang="en"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title><? echo _("PreoDay");?></title>

		<!-- Main CSS files. -->
		<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/normalize.css" />
		<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/foundation.css" />
		<!-- you may add app.css to use for your overrides if you like -->
		<link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/cc2cde80-6121-4c1b-bebb-f133e0013559.css"/>
		<link type="text/css" rel="stylesheet" href="<?echo $_SESSION['path']?>/css/app.css" /> 
		
		<!-- Favicons -->
		<link rel="apple-touch-icon" 	href="<?echo $_SESSION['path']?>/img/apple-touch-icon.png"	type="image/x-icon" >
		<link rel="shortcut icon" 		href="<?echo $_SESSION['path']?>/img/fav.png">
		
		<!-- Mordernizr -->
		<script src="<?echo $_SESSION['path']?>/js/vendor/custom.modernizr.js"></script>
		
		<!-- jQuery -->
		<script src="<?echo $_SESSION['path']?>/js/jquery1.10.2.js"></script>
		
		<?if(isset($_SERVER["PREO_ANALYTICS_UA"])){?>
			<!-- Google Analytics -->
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
				{ (i[r].q=i[r].q||[]).push(arguments)}
				,i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				ga('create', '<?echo $_SERVER["PREO_ANALYTICS_UA"];?>', 'preoday.com');
				ga('send', 'pageview');
			</script>
		<?}?>
	</head>
	<body>
	<div id="wrap">
