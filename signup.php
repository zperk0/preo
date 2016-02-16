<?php session_start();
	  require('getPath.php'); //the only relative link we will have
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');
	  $showCssBeforeLogin = true;

	  if(isset($_SESSION['logged'])) { header('location:'.$_SESSION['path'].'/dashboard'); exit; } //redirect to dashboard if logged in

	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h_signup.php');
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signup/signup_logic.php');

	  if (isset($_GET['inviteKey']) && count(explode('/',$_GET['inviteKey']))){
	  	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/signup/invite_signup_content.php');
	  } else {
	  	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/signup/signup_content.php');
	  }


		// if(isset($_SERVER["PREO_ANALYTICS_UA"])){
		// 	$adwordsConversionVars = '
		// 		var google_conversion_id = 980771540;
		// 		var google_conversion_language = "en";
		// 		var google_conversion_format = "2";
		// 		var google_conversion_color = "ffffff";
		// 		var google_conversion_label = "YQ0eCLyrwQgQ1MXV0wM";
		// 		var google_conversion_value = 0;
		// 		var google_remarketing_only = false;
		// 	';
		// }

	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f_signup.php'); ?>