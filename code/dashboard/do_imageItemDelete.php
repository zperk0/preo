<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/SystemStatic.php');
		
	$idItem = $_POST['idItem'];
	protect($idItem);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	$curlResult = callAPI('GET', $apiURL."itemimages/$idItem", false, $apiAuth);
	$Image = json_decode($curlResult,true);

	if ( $Image && isset($Image['image']) ) {
		$PREO_UPLOAD_ROOT = SystemStatic::getUploadRoot( "" );

			//kill menu
		$curlResult = callAPI('DELETE', $apiURL."itemimages/$idItem", false, $apiAuth); //menu deleted
		if ( isset($Image['imageThumb']) ) {
			unlink( $PREO_UPLOAD_ROOT . $Image['imageThumb'] );	
		}

		$image = explode('/', $Image['image']);
		$image = $image[count($image) - 1];
		unlink( $PREO_UPLOAD_ROOT . '/menuitem/fix/' . $image  );
	}
?>