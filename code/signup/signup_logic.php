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

		if (is_array($inviteKey) && count($inviteKey) === 2) {
			$inviteKey = $inviteKey[1];
		} else {
			redirectPage($_SESSION['path']);
		}
		protect($inviteKey);

		$data = [];
		
		$jsonData = json_encode($data);
		
		$curlResult = callAPI('GET', $apiURL."invite/key/" . $inviteKey . "/account", $jsonData, $apiAuth);		
		$dataJSON 	= json_decode($curlResult,true);

		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)){
			redirectPage('');
		}

		$User = $dataJSON;

		if ( isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && $_SESSION['user_email'] != $User['email'] ) {
			$content = _('This invite key is not for your user.');
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/404/404_content.php');
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');  exit();
		}


		$diff = strtotime("now") - strtotime($User['created']);
		$hours = floor($diff / (60 * 60));

		if ( $hours >= 24 ) {
			$content = _('Sorry, the time to activate your account expired.');
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/404/404_content.php');
			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');  exit();
		}

		$curlResult = callAPI('GET', $apiURL."users/username/" . $User['email'], $jsonData, $apiAuth);		
		$userModel = json_decode($curlResult,true);		

		if ( is_array($userModel) && isset($userModel['id']) ) {
			$userID = $userModel['id'];				
			$accountId	= $User['accountId'];
			$role	= $User['role'];

			$curlResult = callAPI('POST', $apiURL."users/$userID/role?accountId=$accountId&role=$role", false, $apiAuth); //user role created
			$dataJSON = json_decode($curlResult,true);			

			if ( isset($_SESSION['logged']) && $_SESSION['logged'] == 1 ) {
				setUserLogger([
					'account' => [
						'name' 		=> $User['account']['name'],
						'id'   		=> $User['account']['id']
					],
					'user' => [
						'id'		=> $User['id'],
						'email' 	=> $User['email'],
						'firstName' => $User['name'],
						'lastName'	=> '',
						'role' 		=> 'OWNER'
					]
				]);

				redirectPage('dashboard');
			} else {
				redirectPage('login');
			}
		}
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