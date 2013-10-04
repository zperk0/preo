<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
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
	$data['logo']				= $picFileName;
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	if(isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on'])
	{
		//data for app2
		$data['title'] 				= $_SESSION['app_title'];				
		$data['button2Colour'] 		= $_SESSION['app_button2Colour'];
		$data['button2TextColour'] 	= $_SESSION['app_button3TextColour'];	
		$data['button3Colour'] 		= $_SESSION['app_button3Colour'];		
		$data['button3TextColour'] 	= $_SESSION['app_button3TextColour'];	
		
		//re-encode it as we have new fields 
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('PUT', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);
		$_SESSION['app1_edit_on'] = 0;
	}
	else
		$curlResult = callAPI('POST', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth);
	
	echo $curlResult; //sending a JSON via ajax
?>