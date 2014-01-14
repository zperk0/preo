<?php session_start(); //start the session so this file can access $_SESSION vars.

	$level = error_reporting();
	
	error_reporting(0);

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/uploadFileBG.php'); //uploadFile functions; params = $fileUploadID, $fileLocation, $fileName, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug
	
	$picID = strtoupper(uniqid('', false)); //generate unique ID for an event
	
	/////Upload File///////////////////////////
	$picFile = $_FILES["bgFile"];
	$picExt =  preg_match ("/^.*\/(.*)$/", $picFile["type"], $matches);
	$picExt = $matches[1];
	if($picExt == 'jpeg') $picExt = 'jpg';
	
	if(isset($_SERVER['PREO_UPLOAD_ROOT']))
		$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'].'wallpaper/';
	else
		$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload/wallpaper/';
	
	$status = uploadFile($picFile,$PREO_UPLOAD_ROOT,$picID, ".$picExt", "image/jpeg", "image/jpeg", 11000000, 0);
	if(!$status) 
	{
		echo "Error :(";
		exit;
	}
	else
		echo $picID;
		
	error_reporting($level);
?>