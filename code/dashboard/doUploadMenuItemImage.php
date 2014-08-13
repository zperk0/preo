<?php session_start(); //start the session so this file can access $_SESSION vars.

	$level = error_reporting();

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/uploadFileMenuItem.php'); //uploadFile functions; params = $fileUploadID, $fileLocation, $fileName, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug
	

	error_reporting(0);
/*	print "<pre>"; print_r($_FILES);exit();
	exit();	*/
	
	/////Upload File///////////////////////////
	$picFile = $_FILES["picFile"];
	$picExt =  preg_match ("/^.*\/(.*)$/", $picFile["type"], $matches);
	$picExt = $matches[1];
	if($picExt == 'jpeg') $picExt = 'jpg';
	
	if(isset($_SERVER['PREO_UPLOAD_ROOT']))
		$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'].'menuitem/temp/';
	else
		$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload/menuitem/temp/';
	
	$status = uploadFile($picFile,$PREO_UPLOAD_ROOT,".$picExt", "image/jpeg", "image/png", 11000000, 0);
	if(!$status)
	{
		echo "Error :(";
		exit;
	}
	else {
		echo json_encode( $status ); exit();
	}
		
	error_reporting($level);
?>