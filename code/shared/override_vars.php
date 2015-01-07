<?php
	$httpHost =  $_SERVER["HTTP_HOST"];	

	/***** Default values *****/
	$overridePath = "/overrides/preoday";
	$_SESSION['OVERRIDES']["logo"] = $overridePath."/logo.png";	
	$_SESSION['OVERRIDES']["logo_link"] = "http://www.preoday.com";
	$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
	$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";
	$_SESSION['OVERRIDES']["terms"] = $overridePath."/Preoday-privacy-policy-v1.0.pdf";
	$_SESSION['OVERRIDES']["privacy"] = $overridePath."/Preoday-terms-of-use-and-service-business-v2.0.pdf";
	$_SESSION['OVERRIDES']["sign_in_message"] = _("Sign in to your Preoday Dashboard");
	$_SESSION['OVERRIDES']["has_web_orders"] = true;
	$_SESSION['OVERRIDES']["link_orders"] = "//orders.preoday.com";
	$_SESSION['OVERRIDES']["link_faq"] = "http://www.preoday.com/faq/";


	$testHost = "food4uapp.co.uk";

	switch ($httpHost) {
		case $testHost:
			$overridePath = "/overrides/food4u";
			$_SESSION['OVERRIDES']["css"] = $overridePath."/override.css";
			$_SESSION['OVERRIDES']["logo"] = false;
			$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
			$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";		
			$_SESSION['OVERRIDES']["sign_in_message"] = _("Sign in to your Dashboard");
			$_SESSION['OVERRIDES']["has_web_orders"] = false;
			break;
	}	
	//at this point meta has been imported so the main css is in, safe to add the overrides here!
	
	if (isset($_SESSION['OVERRIDES']["css"])){
		$cssFile = $_SERVER['DOCUMENT_ROOT'].$_SESSION['OVERRIDES']["css"];
		if (file_exists($cssFile)){
			echo '<link type="text/css" rel="stylesheet" href="'.$_SESSION['OVERRIDES']["css"].'" />';
		}	
	}

?>