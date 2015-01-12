<?php 
	if (session_status() == PHP_SESSION_NONE) {
	    session_start();
	}
	require('../../getPath.php'); //the only relative link we will have	  
 	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions o keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //kint

	$venueId = $_POST['venueId'];
	protect($venueId);

	if (!$venueId) {
		$curlResult = '[{"status" : 400, "message": "venueId required"}]';
	} else {
		$curlResult = loggedVenue( $venueId );
	}

	echo $curlResult;