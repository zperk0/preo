<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signup/signup_functions.php');

	/* Requesting Facebook Fields */


	$User = null;
	$Account = null;




if ( isset($_GET['inviteKey']) ) {
		$inviteKey = $_GET['inviteKey'];

		$inviteKey = explode('/', $inviteKey);

		if (is_array($inviteKey)){
		  if (count($inviteKey) === 2) {
				$inviteKey = $inviteKey[1];
				protect($inviteKey);

				$data = [];

				$jsonData = json_encode($data);

				$curlResult = callAPI('GET', $apiURL."invite/key/" . $inviteKey, false, $apiAuth);
				$User 	= json_decode($curlResult,true);

				if(empty($User) || (isset($User['status']) && $User['status']=404)){
					redirectPage('login');
				}
			}
		} else {
			redirectPage($_SESSION['path']);
		}
	}

?>