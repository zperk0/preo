<?php
	
	$httpHost =  $_SERVER["HTTP_HOST"];	

	/***** Default values *****/
	$overridePath = "/overrides/preoday";	
	$_SESSION['OVERRIDES']["logo"] = $overridePath."/logo.png";
	
	$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
	$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";
	$_SESSION['OVERRIDES']["terms"] = $overridePath."/Preoday-privacy-policy-v1.0.pdf";
	$_SESSION['OVERRIDES']["privacy"] = $overridePath."/Preoday-terms-of-use-and-service-business-v2.0.pdf";		

	switch ($httpHost) {		
		case "local.food4u.com":									
			$overridePath = "/overrides/food4u";			
			$_SESSION['OVERRIDES']["css"] = $overridePath."/override.css";
			$_SESSION['OVERRIDES']["logo"] = $overridePath."/logo.png";
			$_SESSION['OVERRIDES']["css"] = $overridePath."/override.css";
			$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
			$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";
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