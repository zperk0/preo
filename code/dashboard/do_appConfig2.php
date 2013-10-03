<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$vTitle = $_POST['vTitle'];
	protect($vTitle);
	
	$button2Colour = $_POST['button2Colour'];
	protect($button2Colour);
	
	$button2TextColour = $_POST['button2TextColour'];
	protect($button2TextColour);
	
	$button3Colour = $_POST['button3Colour'];
	protect($button3Colour);
	
	$button3TextColour = $_POST['button3TextColour'];
	protect($button3TextColour);
	
	$data['title']				= $vTitle;
	$data['button2Colour']		= $button2Colour;
	$data['button2TextColour']	= $button2TextColour;
	$data['button3Colour']		= $button3Colour;
	$data['button3TextColour']	= $button3TextColour;
	
	//from app1 
	$data['heading']			= $_SESSION['app_heading'];
	$data['subHeading']			= $_SESSION['app_subHeading'];
	$data['textColour']			= $_SESSION['app_textColour'];
	$data['buttonColour']		= $_SESSION['app_buttonColour'];
	$data['buttonTextColour']	= $_SESSION['app_buttonTextColour'];
	$data['wallpaperId']		= $_SESSION['app_wallpaperId'];
	$data['logo']				= $_SESSION['app_logo'];
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('PUT', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);
	
	echo $curlResult; //sending a JSON via ajax
?>