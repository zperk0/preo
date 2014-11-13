<?php
	
	$httpHost =  $_SERVER[HTTP_HOST];	
	$overridePath = "/overrides/";
	$override = "preoday";
	switch ($httpHost) {
		case "local.preoday.com":			
			$override = "preoday";			
			$_SESSION['OVERRIDES']['hasShop'] = true;
			break;		
		case "local.food4u.com":						
			$override = "food4u";
			$_SESSION['OVERRIDES']['hasShop'] = false;
			break;				
	}
	$overridePath.=$override;

		
	$_SESSION['OVERRIDES']["logo"] = $overridePath."/logo.png";
	$_SESSION['OVERRIDES']["css"] = $overridePath."/override.css";
	$_SESSION['OVERRIDES']["regular_footer"] = $overridePath."/regular_footer.php";
	$_SESSION['OVERRIDES']["dashboard_footer"] = $overridePath."/dashboard_footer.php";
	$_SESSION['OVERRIDES']["terms"] = $overridePath."/terms.php";
	$_SESSION['OVERRIDES']["privacy"] = $overridePath."/privacy.php";	
	
	//at this point meta has been imported so the main css is in, safe to add the overrides here!
	$cssFile = $_SERVER['DOCUMENT_ROOT'].$_SESSION['OVERRIDES']["css"];
	if (file_exists($cssFile)){
		echo '<link type="text/css" rel="stylesheet" href="'.$_SESSION['OVERRIDES']["css"].'" />';
	}	

?>

<script> 
var HAS_SHOP=<?echo ($_SESSION['OVERRIDES']['hasShop'] ? 'true' : 'false' )?>;
if (!HAS_SHOP){
	$(document).ready(function(){
		$("html").addClass('noShop');	
	})
}

</script>