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
				$users[$i]['id']	= $_POST['uID'][$j];
				if(isset($_POST['uPassword'][$j])) //new user
					$users[$i]['password'] 	= $_POST['uPassword'][$j];
				else //edit user
					$users[$i]['password'] = '';
			} 
			catch(Exception $e){ /*nothing*/ } 
			
			$users[$i]['name'] 		= $_POST['uName'][$j];
			$users[$i]['email'] 	= $_POST['uEmail'][$j];
			$users[$i]['role'] 		= strtolower($_POST['uRole'][$j]);
			
			//protect
			protect($users[$i]['name']);
			protect($users[$i]['email']);
			
			$i++;
		}
		$j++;
	}
	
	$newUsers = array();
	$userApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	foreach($users as $user)
	{
		//create/edit user
		$data 					= array();
		
		if(isset($user['id']) && !preg_match('/^u.*$/',$user['id'])) //edit old
		{
			//first we update user
			$userID = $user['id'];
			
			$data['name']		= $user['name'];
			$data['username']	= $user['email'];
			$data['email']		= $user['email'];
			//$data['password'] 	= $user['password']; //implement change password later
		
			$jsonData = json_encode($data);
		
			$curlResult = callAPI('PUT', $apiURL."users/$userID", $jsonData, $userApiAuth); //user created
			
			//now the role
			$role		= strtoupper($user['role']);
			$accountId	= $_SESSION['account_id'];

			$roleData = array();
			$roleData['role'] = $role;
			$roleData['accountId'] = $accountId;
			$jsonRoleData = json_encode($roleData);
			
			$curlResult = callAPI('PUT', $apiURL."users/$userID/role?accountId=$accountId&role=$role", $jsonRoleData, $userApiAuth); //user role updated
		}
		else //create new user/role relation
		{
			$data 				= array();
			$data['name']		= $user['name'];
			$data['username']	= $user['email'];
			$data['email']		= $user['email'];
			$data['password'] 	= $user['password'];
			
			$jsonData = json_encode($data);

			//appToken here is the web-apps token and not the user's
		
			$curlResult = callAPI('POST', $apiURL."users", $jsonData, $userApiAuth); //user created
			
			$dataJSON = json_decode($curlResult,true);
			if(isset($dataJSON['id'])) //if no duplicate user
			{
				$userID = $dataJSON['id'];
				$newUsers[$user['id']] = $dataJSON['id'];
			
				//now we update this user with correct owner - this needs a fix via Scott
				$role		= strtoupper($user['role']);
				$accountId	= $_SESSION['account_id'];
				
				$curlResult = callAPI('POST', $apiURL."users/$userID/role?accountId=$accountId&role=$role", false, $userApiAuth); //user role created
			}
			else //if duplicate user
			{
				//POST to accounts/{id}/users and it will create a new role automatically (needs user object)
				$data = array();
				$data['email'] 		= $user['email'];
				$data['username'] 	= $user['email'];
				$data['role'] 		= strtoupper($user['role']);
				
				$jsonData = json_encode($data);
				
				$accountId	= $_SESSION['account_id'];
				
				$curlResult = callAPI('POST', $apiURL."accounts/$accountId/users", $jsonData, $userApiAuth); //user role created
				$dataJSON = json_decode($curlResult,true);
				
				if(isset($dataJSON['userId'])) $newUsers[$user['id']] = $dataJSON['userId'];
			}
		}
	}
	
	//we need to send back an array along with curlResult
	$newJSON = array();
	$newJSON['result'] = json_decode($curlResult,true); //make it an array
	$newJSON['update']= $newUsers; //add array of new values
	
	$newJSON = json_encode($newJSON); //back to JSON
	
	echo $newJSON; //sending a JSON via ajax 
?>