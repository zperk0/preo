<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');

	$email = $_POST['email'];
	protect($email);

	$id = $_POST['id'];
	protect($id);

	$fName = $_POST['fName'];
	protect($fName);

	$lName = $_POST['lName'];
	protect($lName);

	$venueID = isset($_POST['venueId']) ? $_POST['venueId'] : 0;
	protect($venueID);

	$_SESSION['user_id']	= $id;
	$_SESSION['user_email']	= $email;
	$_SESSION['user_fName']	= $fName;
	$_SESSION['user_lName']	= $lName;
	$_SESSION['logged']		= 1;

	if ( $venueID ) {
		$curlResult = loggedVenue( $venueID );
	}

?>