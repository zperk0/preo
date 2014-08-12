<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	$imageID = $_POST['imageID'];
	protect($imageID);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	$curlResult = callAPI('GET', $apiURL."imageitem/$imageID", false, $apiAuth);
	$Image = json_decode($curlResult,true);

	if ( $Image ) {
		if(isset($_SERVER['PREO_UPLOAD_ROOT']))
			$PREO_UPLOAD_ROOT = $_SERVER['PREO_UPLOAD_ROOT'].'menuitem/';
		else
			$PREO_UPLOAD_ROOT = $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/tmp/upload/menuitem/';

			//kill menu
		$curlResult = callAPI('DELETE', $apiURL."imageitem/$imageID", false, $apiAuth); //menu deleted
		if ( $Image['image_thumb'] ) {
			unlink( $PREO_UPLOAD_ROOT . $Image['image_thumb'] );	
		}
		unlink( $PREO_UPLOAD_ROOT .  $Image['image'] );
	}
?>