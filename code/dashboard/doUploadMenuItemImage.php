<?php session_start(); //start the session so this file can access $_SESSION vars.

	$level = error_reporting();

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/uploadFileMenuItem.php'); //uploadFile functions; params = $fileUploadID, $fileLocation, $fileName, $fileEXT, $fileMIME, $fileMIME2, $maxFileSize, $debug
	

	error_reporting(0);
/*	print "<pre>"; print_r($_FILES);exit();
	exit();	*/
	
	/////Upload File///////////////////////////
	$picFile = $_FILES["img"];
	$picExt =  preg_match ("/^.*\/(.*)$/", $picFile["type"], $matches);
	$picExt = $matches[1];
	if($picExt == 'jpeg') $picExt = 'jpg';
	
	if(isset($_SERVER['PREO_UPLOAD_ROOT'])) {
		$docRoot = $_SERVER['PREO_UPLOAD_ROOT'];
		$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'].'menuitem/temp/';
		$folderMenu = '/menuitem/temp';
	}
	else {
		$docRoot = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'];
		$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload/menuitem/temp/';
		$folderMenu = '/tmp/upload/menuitem/temp/';	
	}

	if ( isset($_POST['cropW']) ) {
		$imgUrl = $_POST['imgUrl'];
		$fileEXT = strtolower(substr($_POST['imgUrl'], strrpos($_POST['imgUrl'], '.'))); //this gets .jpg,.png, etc
		$imgUrl = explode('/', $imgUrl);
		$imgUrl[ count($imgUrl) - 1 ] = 'item_' . strtoupper(uniqid('', false)) . $fileEXT;
		$imgUrl = implode("/", $imgUrl);
		$status = cropImage($docRoot . $_POST['imgUrl'], $docRoot . $imgUrl, $imgUrl, $_POST['cropW'], $_POST['cropH'], $_POST['imgX1'], $_POST['imgY1'], $_POST['imgW'], $_POST['imgH'], $_POST['imgInitW'], $_POST['imgInitH']);
		unlink( $docRoot . $_POST['imgUrl'] );
	} else {
		$status = uploadFile($picFile,$PREO_UPLOAD_ROOT, $folderMenu, ".$picExt", "image/jpeg", "image/png", 11000000, 0);
	}
	if(!$status)
	{
		echo "Error :(";
		exit;
	}
	else {
		header('Content-Type: application/json');
		echo json_encode( $status[0], JSON_FORCE_OBJECT ); exit();
	}
		
	error_reporting($level);
?>