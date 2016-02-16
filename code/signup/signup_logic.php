<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signup/signup_functions.php');

	$User = null;
	$Account = null;

if ( isset($_GET['inviteKey']) ) {
				$inviteKey = $_GET['inviteKey'];
				protect($inviteKey);

				$data = [];

				$jsonData = json_encode($data);

				$User = getInviteUserByKey($inviteKey);
				if(empty($User) || is_array($User)){
					redirectPage('login');
				}
	}

?>