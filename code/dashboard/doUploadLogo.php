<?php session_start(); //start the session so this file can access $_SESSION vars.

	$level = error_reporting();
	
	error_reporting(0);

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/uploadFile.php'); //uploadFile functions; params = $fileUploadID, $fileLocation, $fileName, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug
	
	$picID = strtoupper(uniqid('LOGO', false)); //generate unique ID for an event
	
	/////Upload File///////////////////////////
	$picFile = $_FILES["picFile"];
	$picExt =  preg_match ("/^.*\/(.*)$/", $picFile["type"], $matches);
	$picExt = $matches[1];
	if($picExt == 'jpeg') $picExt = 'jpg';
	
	$status = uploadFile($picFile,$_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/img/logoUploads/',$picID, ".$picExt", "image/png", "image/jpeg", 11000000, 0);
	if(!$status) 
	{
		echo "Error :(";
		exit;
	}
	else
		echo $picID."_thumb.".$picExt;
		
	error_reporting($level);
?>