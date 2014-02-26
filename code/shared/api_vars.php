<?php
	
	if(isset($_SERVER["PREO_API_BASE"]))
	{
		$apiURL=$_SERVER["PREO_API_BASE"];
	}
	else
		$apiURL="localhost:8080/v1/";
	
	
	//$apiURL="https://preoday-dev.eu01.aws.af.cm/v1/";   //live
	//$apiURL="localhost:8080/v1/"; //dev 
	$apiURL="http://preo-api-dev.j.layershift.co.uk/v1/"; //demo-app
	
	$apiAuth="PreoDay Ix4L2vIvQrm/Vin1XSfZ2ofgMnu2uPVZwALaKCCvYonC0jb0JUknAYbVq5mnnXVL";
?>