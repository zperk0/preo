<?php
	$httpHost =  $_SERVER["HTTP_HOST"];	

	/***** Default values *****/
	$overridePath = "/overrides/preoday";
	$_SESSION['OVERRIDES']["site"] = "https://www.preoday.com";
	$_SESSION['OVERRIDES']["logo"] = $overridePath."/logo.png";	
	$_SESSION['OVERRIDES']["logo_link"] = $_SESSION['OVERRIDES']["site"];
	$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
	$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";
	$_SESSION['OVERRIDES']["terms"] = $overridePath."/Preoday-privacy-policy-v1.0.pdf";
	$_SESSION['OVERRIDES']["privacy"] = $overridePath."/Preoday-terms-of-use-and-service-business-v2.0.pdf";
	$_SESSION['OVERRIDES']["sign_in_message"] = _("Sign in to your Preoday Dashboard");
	$_SESSION['OVERRIDES']["has_web_orders"] = true;
	$_SESSION['OVERRIDES']["link_orders"] = "//orders.preoday.com";
	$_SESSION['OVERRIDES']["link_faq"] = $_SESSION['OVERRIDES']["site"] . "/faq/";
	$_SESSION['OVERRIDES']["help_menu"] = true;
	$_SESSION['OVERRIDES']["favicon"] = $_SESSION['path'] . "/img/fav.png";
	$_SESSION['OVERRIDES']["title"] = _("Preoday");
	$_SESSION['OVERRIDES']["apple-touch-icon"] = $_SESSION['path'] . "/img/apple-touch-icon.png";
	$_SESSION['OVERRIDES']["ga_link"] = "preoday.com";
	$_SESSION['OVERRIDES']["support_email"] = "support@preoday.com";
	$_SESSION['OVERRIDES']["hello_email"] = "hello@preoday.com";
	$_SESSION['OVERRIDES']["claim_url"] = $_SESSION['OVERRIDES']["site"] . "/takeaway";
	$_SESSION['OVERRIDES']["title"] = "Preoday";
	$_SESSION['OVERRIDES']["billing"] = true;


	$testHost = "food4uapp.co.uk";
	if ( substr_compare($httpHost, $testHost, -strlen($testHost)) === 0 ) {
		$overridePath = "/overrides/food4u";
		$_SESSION['OVERRIDES']["site"] = "http://food4uapp.co.uk";
		$_SESSION['OVERRIDES']["css"] = $overridePath."/override.css";
		$_SESSION['OVERRIDES']["logo"] = false;
		$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
		$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";		
		$_SESSION['OVERRIDES']["sign_in_message"] = _("Sign in to your Dashboard");
		$_SESSION['OVERRIDES']["has_web_orders"] = false;
		$_SESSION['OVERRIDES']["terms"] = $_SESSION['OVERRIDES']["site"] . "/terms-conditions";
		$_SESSION['OVERRIDES']["privacy"] = $_SESSION['OVERRIDES']["site"] . "/privacy-policy";
		$_SESSION['OVERRIDES']["link_orders"] = "//orders.food4uapp.co.uk";
		$_SESSION['OVERRIDES']["help_menu"] = false;
		$_SESSION['OVERRIDES']["favicon"] = $_SESSION['path'] . "/img/fav-4u.png";
		$_SESSION['OVERRIDES']["title"] = _("Food 4u");
		$_SESSION['OVERRIDES']["apple-touch-icon"] = $_SESSION['path'] . "/img/fav-4u.png";
		$_SESSION['OVERRIDES']["ga_link"] = "food4uapp.co.uk";
		$_SESSION['OVERRIDES']["support_email"] = "info@food4uapp.co.uk";
		$_SESSION['OVERRIDES']["hello_email"] = "info@food4uapp.co.uk";
		$_SESSION['OVERRIDES']["claim_url"] = $_SESSION['OVERRIDES']["site"];
		$_SESSION['OVERRIDES']["billing"] = false;
	}

?>