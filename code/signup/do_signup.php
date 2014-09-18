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
	
	$businessName = isset($_POST['businessName']) ? $_POST['businessName'] : null;
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
	
	if ( !$inviteKey ) {
		$data['name']				= $businessName;
		$data['owner']['firstName']	= $fName;
		$data['owner']['lastName']	= $lName;
		$data['owner']['username']	= $email;
		$data['owner']['email']		= $email;
		$data['owner']['phone']		= $phone;
		$data['owner']['password'] 	= $password;
		$data['owner']['fbid'] 		= $fbid;
		$data['owner']['gpid'] 		= $gpid;
	} else {
		$data['firstName']	= $fName;
		$data['lastName']	= $lName;
		$data['username']	= $email;
		$data['email']		= $email;
		$data['phone']		= $phone;
		$data['password'] 	= $password;
		$data['fbid'] 		= $fbid;
		$data['gpid'] 		= $gpid;		
	}
	
	$jsonData = json_encode($data);
	
	if ( $inviteKey ) {
		$curlResult = callAPI('GET', $apiURL."users/invite/" . $inviteKey, $jsonData, $apiAuth);		
		$dataJSON 	= json_decode($curlResult,true);
		if(empty($dataJSON) || (isset($dataJSON['status']) && $dataJSON['status']=404)){
			$curlResult = '[{"status" : 400, "message": ' . _tr("Error on activate your account") . '}]';
		} else {
			$data['active'] = 1;
			$data['inviteUserId'] = $dataJSON['inviteUserId'];
			$data['inviteKey'] = $dataJSON['inviteKey'];
			$jsonData = json_encode($data);
			$curlResult = callAPI('PUT', $apiURL."users/" . $dataJSON['id'], $jsonData, $apiAuth);	
		}
	} else {
		$curlResult = callAPI('POST', $apiURL."accounts", $jsonData, $apiAuth);
	}
	
	$dataJSON = json_decode($curlResult,true);
	
	if(isset($dataJSON['owner']['token'])) $_SESSION['token']=$dataJSON['owner']['token']; //otherwise its an error! 
	
	echo $curlResult; //sending a JSON via ajax
	
	//DEBUG
	//$decodedCurl = json_decode($curlResult,true);
	//if($curlResult) echo "Success!"; 
	//else echo "Fail :(";
	//echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	//echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
?>