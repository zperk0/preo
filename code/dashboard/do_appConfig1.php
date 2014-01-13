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
	$data['logoId']				= $picFileName;
	if(isset($_SERVER['PREO_UPLOAD_PATH']))
	{
		if(preg_match('/http/',$_SERVER['PREO_UPLOAD_PATH']))
		{	
			$data['wallpaper']		= $_SERVER['PREO_UPLOAD_PATH'].'wallpaper/wall'.$wallPaperID.'.jpg';
			$data['logo']			= $_SERVER['PREO_UPLOAD_PATH'].'logo/'.$picFileName.'_thumb.png';
		}
		else
		{
			$data['wallpaper']		= '//'.$_SERVER['HTTP_HOST'].$_SERVER['PREO_UPLOAD_PATH'].'wallpaper/wall'.$wallPaperID.'.jpg';
			$data['logo']			= '//'.$_SERVER['HTTP_HOST'].$_SERVER['PREO_UPLOAD_PATH'].'logo/'.$picFileName.'_thumb.png';
		}
	}
	
	$jsonData = json_encode($data);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('PATCH', $apiURL."venues/".$_SESSION['venue_id']."/settings", $jsonData, $apiAuth); 
	
	if(isset($_SESSION['app1_edit_on']) && $_SESSION['app1_edit_on']) $_SESSION['app1_edit_on'] = 0;
	
	echo $curlResult; //sending a JSON via ajax
?>