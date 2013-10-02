<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function
	
	$aHeading = $_POST['aHeading'];
	protect($aHeading);
	
	if(empty($aHeading)) $aHeading = null;
	
	$aSubheading = $_POST['aSubheading'];
	protect($aSubheading);
	
	$textColour = $_POST['textColour'];
	protect($textColour);
	
	$buttonColour = $_POST['buttonColour'];
	protect($buttonColour);
	
	$buttonTextColour = $_POST['buttonTextColour'];
	protect($buttonTextColour);
	
	$wallPaperID = $_POST['wallPaperID'];
	protect($wallPaperID);
	
	$picFileName = $_POST['picFileName'];
	protect($picFileName);
	
	if(empty($picFileName)) $picFileName = null;
	
	$data['heading']			= $aHeading;
	$data['subHeading']			= $aSubheading;
	$data['textColour']			= $textColour;
	$data['buttonColour']		= $buttonColour;
	$data['buttonTextColour']	= $buttonTextColour;
	$data['wallpaperId']		= $wallPaperID;
	//$data['logofile']			= $picFileName;
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('POST', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);
	
	echo $curlResult; //sending a JSON via ajax
?>