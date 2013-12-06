<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI_Header.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
		
	//lets get user id using token
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('GET', $apiURL."users/auth", false, $apiAuth); //event deleted
	$dataJSON = json_decode($curlResult, true);
	
	$userID = $dataJSON['id'];
	
	//update user
	$fName = $_POST['fName'];
	protect($fName);
	
	$lName = $_POST['lName'];
	protect($lName);
	
	$email = $_POST['email'];
	protect($email);
	
	$bName = $_POST['businessName'];
	protect($bName);
	
	$passFlag = $_POST['passFlag'];
	protect($passFlag);
	
	$data = array();
	$data['firstname'] = $fName;
	$data['lastname'] = $lName;
	$data['email'] = $email;
	$data['username'] = $email;
	
	$jsonData = json_encode($data);
	
	$curlResult = callAPI('PUT', $apiURL."users/$userID", $jsonData, $apiAuth); //user updated
	
	$_SESSION['user_email']	= $email;
	$_SESSION['user_fName']	= $fName;
	$_SESSION['user_lName']	= $lName;
	
	//update Business Name
	$accountID = $_SESSION['account_id'];
	
	$data = array();
	$data['name'] = $bName;
	
	$jsonData = json_encode($data);
	$curlResult = callAPI('PUT', $apiURL."accounts/$accountID", $jsonData, $apiAuth); //business name updated
	
	$_SESSION['account_name'] = $bName;
	
	if($passFlag)
	{
		$data = array();
		$data['username'] = $_SESSION['user_email'];
		$data['oldPassword'] = $_POST['opassword'];
		$data['password'] = $_POST['npassword'];
		
		$jsonData = json_encode($data);
		$curlResult = callAPI_Header('POST', $apiURL."users/auth/change", $jsonData, $apiAuth); //password updated
		
		if(preg_match('/^4.*$/',$curlResult))
		{  
			$curlResult = array();
			$curlResult['status'] = "404"; 
			$curlResult = json_encode($curlResult, true); 
		}
		else
		{  
			$curlResult = array();
			$curlResult['pass'] = "OK"; 
			$curlResult = json_encode($curlResult, true); 
		}
	}
	
	echo $curlResult;
?>