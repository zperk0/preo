<?php
	
	if(isset($_SERVER["PREO_API_BASE"]))
	{
		$apiURL=$_SERVER["PREO_API_BASE"];
	}
	else
	{
		$apiURL="localhost:8080/v1/";
		//$apiURL="http://preo-api-dev.j.layershift.co.uk/v1/", // app-dev
	}

	$apiAuth="PreoDay Ix4L2vIvQrm/Vin1XSfZ2ofgMnu2uPVZwALaKCCvYonC0jb0JUknAYbVq5mnnXVL";


	//regardless of what we had before, pre set the initial values of the messages as the placeholders
	//FIXME this has to be duplicated in code/settings/venue_logic
	//dont forget to change in both places if these strings change

	$deliveryMessages = array(
		"notifications" => array (
			"content1" =>  _("Your order is running 15 mins late"),
			"name1" => _("Late Order"),
			"content2" => _("Your order is on its way"),
			"name2" => _("En-route"),
			"content3" => _("There is a problem with your order. Please call us"),
			"name3" => _("Call us")
		), "reject" => array(
			"content4" => _("Your address is out of our delivery zone"),
			"name4" => _("Out of zone"),
			"content5" => _("Sorry, that item is out of stock"),
			"name5" => _("Out of stock"),
			"content6" => _("Sorry, Your order has been rejected. Please call us"),
			"name6" => _("Call us")
		)
	);
		
?>