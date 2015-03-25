<?php
	
	if(isset($_SERVER["PREO_API_BASE"]))
	{
		$apiURL=$_SERVER["PREO_API_BASE"];
	}
	else
	{
		//$apiURL="http://localhost:8080/v1/";
		$apiURL="https://api-demo.preoday.com/v1/"; // app-demo
		// $apiURL="https://api-dev.preoday.com/v1/"; // app-dev
	}

	if(isset($_SERVER["PREO_PUSHER_KEY"]))
	{
		$pusherKey=$_SERVER["PREO_PUSHER_KEY"];
	}
	else
	{
		$pusherKey="63aabf4f8531a582c3e6";
	}

	

	$apiAuth="PreoDay Ix4L2vIvQrm/Vin1XSfZ2ofgMnu2uPVZwALaKCCvYonC0jb0JUknAYbVq5mnnXVL";

		
?>