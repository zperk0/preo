<?php
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	/* Requesting Facebook Fields */


	$User = null;
	if ( isset($_GET['inviteKey']) ) {
		$inviteKey = $_GET['inviteKey'];

		$inviteKey = explode('/', $inviteKey);

		if (is_array($inviteKey) && count($inviteKey) === 2) {
			$inviteKey = $inviteKey[1];
		} else {
			header("location: " . $_SESSION['path']); exit();
		}
		protect($inviteKey);

		$data = [];
		
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('GET', $apiURL."users/invite/" . $inviteKey, $jsonData, $apiAuth);		
		$dataJSON 	= json_decode($curlResult,true);

		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)){
			header("location: /"); exit();
		}

		$User = $dataJSON;
	}

	if(!(isset($_SESSION['fb_state']))) $_SESSION['fb_state'] = md5(uniqid(rand(), TRUE)); //NEED FOR CSRF PROTECTION VIA FACEBOOK CONNECT
	
	require_once($_SERVER['DOCUMENT_ROOT'].'/code/shared/facebook_vars.php'); 

	$fb_field_flag = 0;
	
	if(isset($_SESSION['fb_flag']) && $_SESSION['fb_flag']) {
		$fName    = $_SESSION['fb_fName'];
		$lName    = $_SESSION['fb_lName'];
		$email    = $_SESSION['fb_email'];
		$fbId     = $_SESSION['fb_uId'];
		$fbToken  = $_SESSION['fb_accessToken'];
	 
		//Setting flags for FB-Connect TRUE
		$fb_field_flag = 1; 	
	}
	
	//////////////////////////////////////
	
	function randomPassword() {
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}
	


?>