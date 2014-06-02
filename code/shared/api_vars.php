<?php
	
	if(isset($_SERVER["PREO_API_BASE"]))
	{
		$apiURL=$_SERVER["PREO_API_BASE"];
	}
	else
	{
		$apiURL="localhost:8080/v1/";
		//$apiURL="https://api-demo.preoday.com/v1/"; // app-demo
		//$apiURL="https://api-dev.preoday.com/v1/"; // app-dev
	}

	$apiAuth="PreoDay Ix4L2vIvQrm/Vin1XSfZ2ofgMnu2uPVZwALaKCCvYonC0jb0JUknAYbVq5mnnXVL";

		
?>