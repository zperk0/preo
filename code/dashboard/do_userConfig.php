<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
			
	$userCount = $_POST['userCount']; //linear count -user
	protect($userCount);
	
	$userCountAct = $_POST['userCountAct']; //actual count -user
	protect($userCountAct);
	
	$users = array(); //initialising user 
	
	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $userCountAct && $j <= $userCount) //$i should break it faster unless linear == actual  -- creating new user here
	{
		if(isset($_POST['uName'][$j]) && $_POST['uName'][$j])
		{
			try { 
				$users[$i]['id']	= /*protect(*/$_POST['uID'][$j];/*);*/ 
				$users[$i]['password'] 	= /*protect(*/$_POST['uPassword'][$j];//);
			} 
			catch(Exception $e){ /*nothing*/ } 
			
			$users[$i]['name'] 		= /*protect(*/$_POST['uName'][$j];//);
			$users[$i]['email'] 	= /*protect(*/$_POST['uEmail'][$j];//);
			$users[$i]['role'] 		= /*protect(*/strtolower($_POST['uRole'][$j]);//);
			
			$i++;
		}
		$j++;
	}
	
	
	
	foreach($users as $user)
	{
		//create user
		$data 					= array();
		
		if(isset($user['id']) && $user['id']) //edit old
		{
			//first we update user
			$userID = $user['id'];
			
			$data['name']		= $user['name'];
			$data['username']	= $user['email'];
			$data['email']		= $user['email'];
			//$data['password'] 	= $user['password']; //implement change password later
		
			$jsonData = json_encode($data);
		
			$userApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
			
			$curlResult = callAPI('PUT', $apiURL."users/$userID", $jsonData, $userApiAuth); //user created
			
			//now the role
			$role		= strtoupper($user['role']);
			$accountId	= $_SESSION['account_id'];
			
			$curlResult = callAPI('PUT', $apiURL."users/$userID/role?accountId=$accountId&role=$role", false, $userApiAuth); //user role updated
		}
		else //create new
		{
			$data 				= array();
			$data['name']		= $user['name'];
			$data['username']	= $user['email'];
			$data['email']		= $user['email'];
			$data['password'] 	= $user['password'];
			
			$jsonData = json_encode($data);

			//appToken here is the web-apps token and not the user's
		
			$curlResult = callAPI('POST', $apiURL."users", $jsonData, $apiAuth); //user created
			
			$dataJSON = json_decode($curlResult,true);
			$userID = $dataJSON['id'];
			
			//now we update this user with correct owner - this needs a fix via Scott
			$role		= strtoupper($user['role']);
			$accountId	= $_SESSION['account_id'];
			
			$userApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
			
			$curlResult = callAPI('POST', $apiURL."users/$userID/role?accountId=$accountId&role=$role", false, $userApiAuth); //user role created
		}
	}
	
	echo $curlResult; //sending a JSON via ajax 
?>