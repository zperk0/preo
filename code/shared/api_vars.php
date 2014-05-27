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


	//regardless of what we had before, pre set the initial values of the messages as the placeholders
	//FIXME this has to be duplicated in code/settings/venue_logic
	//dont forget to change in both places if these strings change

	$deliveryMessages = array(
		"PUSH_NOTIFY" => array (			
			0 => array (
				"content" =>  _("Your order is running 15 mins late"),
				"name" => _("Late Order"),
				"active" => 0
			), 
			1 => array (
				"content" => _("Your order is on its way"),
				"name" => _("En-route"),
				"active" => 0
			),
			2 => array (
				"content" => _("There is a problem with your order. Please call us"),
				"name" => _("Call us"),
				"active" => 0
			)
							
		), 
		"PUSH_REJECT" => array(
			0 => array (
				"content" => _("Your address is out of our delivery zone"),
				"name" => _("Out of zone"),
				"active" => 0
			), 
			1 => array (
				"content" => _("Sorry, that item is out of stock"),
				"name" => _("Out of stock"),
				"active" => 0
			),
			2 => array (
				"content" => _("Sorry, Your order has been rejected. Please call us"),
				"name" => _("Call us"),
				"active" => 0
			)								
		)
	);
		
?>