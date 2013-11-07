<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	/* Requesting Facebook Fields */

	if(!(isset($_SESSION['fb_state']))) $_SESSION['fb_state'] = md5(uniqid(rand(), TRUE)); //NEED FOR CSRF PROTECTION VIA FACEBOOK CONNECT
	
	require_once($_SERVER['DOCUMENT_ROOT'].'/code/shared/facebook_vars.php'); 

?>