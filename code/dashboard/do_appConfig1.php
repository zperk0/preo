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
	
	
	$data['heading']			= $aHeading;
	$data['subHeading']			= $aSubheading;
	$data['textColour']			= $textColour;
	$data['buttonColour']		= $buttonColour;
	$data['buttonTextColour']	= $buttonTextColour;
	$data['wallpaperId']		= $wallPaperID;
	if(isset($_SERVER['PREO_UPLOAD_PATH']))
	{
		$data['wallpaper']		= $_SERVER['PREO_UPLOAD_PATH'].'wallpaper/wall'.$wallPaperID.'.jpg';
	}
	else
	{
		$data['wallpaper']		= '/tmp/upload/'.'wallpaper/wall'.$wallPaperID.'.jpg';
	}
	
	if(preg_match('/^\d$/',$wallPaperID)) $data['wallpaper']=null;
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth); 
	
	if(isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on']) $_SESSION['app1_edit_on'] = 0;

	$_SESSION['noAppFlag-1'] = 0;
	
	echo $curlResult; //sending a JSON via ajax
?>