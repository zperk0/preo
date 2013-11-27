<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
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
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);
	
	if(isset($_SESSION['app2_edit_on']) && $_SESSION['app2_edit_on']) $_SESSION['app2_edit_on']=0;
	
	echo $curlResult; //sending a JSON via ajax
?>