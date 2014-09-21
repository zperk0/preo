<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$email = $_POST['email'];
	protect($email);
	
	$password = $_POST['password'];
	protect($password);
	
	$businessName = $_POST['businessName'];
	$_SESSION['venue_name'] = $businessName; //save it to be used later in the venue_settings page
	protect($businessName);
	
	$phone = $_POST['phone'];
	protect($phone);
		
	$fbid = $_POST['fbid'];
	protect($fbid);
	
	$gpid = $_POST['gpid'];
	protect($gpid);	

	$inviteKey = isset($_POST['inviteKey']) ? $_POST['inviteKey'] : null;
	protect($inviteKey);
	
	//$notificationFlag = $_POST['notification-switch']; //0=off, 1=on
	//protect($notificationFlag);  //currently we dont store this!
	
	$data['name']				= $businessName;
	$data['owner']['firstName']	= $fName;
	$data['owner']['lastName']	= $lName;
	$data['owner']['username']	= $email;
	$data['owner']['email']		= $email;
	$data['owner']['phone']		= $phone;
	$data['owner']['password'] 	= $password;
	$data['owner']['fbid'] 		= $fbid;
	$data['owner']['gpid'] 		= $gpid;

	$jsonData = json_encode($data);
	$userID = null;
	
	if ( $inviteKey ) {
		$curlResult = callAPI('GET', $apiURL."invite/key/" . $inviteKey, $jsonData, $apiAuth);		
		$dataJSON 	= json_decode($curlResult,true);
		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)){
			$curlResult = '[{"status" : 400, "message": ' . _tr("Error on activate your account") . '}]';
		} else {
			$user = $dataJSON;
			$data['owner']['inviteUserId'] = $user['inviteId'];
			$data = $data['owner'];
			$jsonData = json_encode($data);

			$curlResult = callAPI('POST', $apiURL."users", $jsonData, $apiAuth); //user created
			$dataJSON = json_decode($curlResult,true);

			if(isset($dataJSON['id'])) //if no duplicate user
			{
				$userID = $dataJSON['id'];
				//now we update this user with correct owner - this needs a fix via Scott
				$role		= strtoupper($user['role']);
				$accountId	= $user['accountId'];
				
				$curlResult = callAPI('POST', $apiURL."users/$userID/role?accountId=$accountId&role=$role&inviteUserId=" . $user['inviteId'], false, $apiAuth); //user role created
			}
			else //if duplicate user
			{
				//POST to accounts/{id}/users and it will create a new role automatically (needs user object)
				$data = array();
				$username 	= $user['email'];
				$role 		= strtoupper($user['role']);

				$curlResult = callAPI('GET', $apiURL."users/username/" . $username, $jsonData, $apiAuth);		
				$userModel = json_decode($curlResult,true);

				$userID = $userModel['id'];				
				$accountId	= $user['accountId'];

				$curlResult = callAPI('POST', $apiURL."users/$userID/role?accountId=$accountId&role=$role&inviteUserId=" . $user['inviteId'], false, $apiAuth); //user role created
				$dataJSON = json_decode($curlResult,true);
			}			
		}
	}  else {
		$curlResult = callAPI('POST', $apiURL."accounts", $jsonData, $apiAuth);		
	}	
	
	$dataJSON = json_decode($curlResult,true);

	if ( $inviteKey ) {
		$dataInvite['userId'] = $userID;
		$jsonInviteData = json_encode($dataInvite);
		$curlResult = callAPI('PATCH', $apiURL."invite/" . $user['id'], $jsonInviteData, $apiAuth);

		$newJSON = array();
		$newJSON['name'] = $businessName;
		$newJSON['id'] = $accountId;
		$newJSON['owner']['firstName']	= $fName;
		$newJSON['owner']['lastName']	= $lName;
		$newJSON['owner']['username']	= $email;
		$newJSON['owner']['email']		= $email;
		$newJSON['owner']['phone']		= $phone;
		$newJSON['owner']['password'] 	= $password;
		$newJSON['owner']['fbid'] 		= $fbid;
		$newJSON['owner']['gpid'] 		= $gpid;
		$newJSON['owner']['id'] 		= $userID;
		$curlResult = json_encode($newJSON);		

		$dataJSON['owner']['token'] = $userModel['token'];
	}
	
	if(isset($dataJSON['owner']['token'])) $_SESSION['token']=$dataJSON['owner']['token']; //otherwise its an error! 
	
	echo $curlResult; //sending a JSON via ajax
	
	//DEBUG
	//$decodedCurl = json_decode($curlResult,true);
	//if($curlResult) echo "Success!"; 
	//else echo "Fail :(";
	//echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	//echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
?>