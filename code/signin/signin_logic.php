<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');   //kint
	/* Requesting Facebook Fields */

	$inviteKey = $_GET["inviteKey"];
	$inviteUser = new stdClass();

	if ($inviteKey) {
		$inviteUser = getInviteUserByKey($inviteKey);
	}

	if(!(isset($_SESSION['fb_state']))) $_SESSION['fb_state'] = md5(uniqid(rand(), TRUE)); //NEED FOR CSRF PROTECTION VIA FACEBOOK CONNECT

	require_once($_SERVER['DOCUMENT_ROOT'].'/code/shared/facebook_vars.php');

?>