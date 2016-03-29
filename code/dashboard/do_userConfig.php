<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint

	$userCount = $_POST['userCount']; //linear count -user
	protect($userCount);

	$userCountAct = $_POST['userCountAct']; //actual count -user
	protect($userCountAct);

	$inviteUserCount = $_POST['inviteUserCount']; //linear count -user
	protect($userCount);

	$inviteUserCountAct = $_POST['inviteUserCountAct']; //actual count -user
	protect($inviteUserCountAct);

	$users = array(); //initialising user

	$curlResult = true;


	//remember everything is 1-indexed. 0 is dummy data
	$i = $j = 1;
	while($i <= $userCountAct && $j <= $userCount) //$i should break it faster unless linear == actual  -- creating new user here
	{

		if(isset($_POST['uName'][$j]) && $_POST['uName'][$j] && isset($_POST['uAlter'][$j]) && $_POST['uAlter'][$j]==1)
		{

			$users[$i]['id']	= $_POST['uID'][$j];
			$users[$i]['name'] 		= $_POST['uName'][$j];
			$users[$i]['email'] 	= $_POST['uEmail'][$j];
			$users[$i]['role'] 		= strtoupper($_POST['uRole'][$j]);

			//protect
			protect($users[$i]['name']);
			protect($users[$i]['email']);

			$i++;
		}
		$j++;
	}

	$inviteUsers = array(); //initialising user
	//remember everything is 1-indexed. 0 is dummy data
	$i = $inviteUserCountAct;
	while($i <= $inviteUserCount) //$i should break it faster unless linear == actual  -- creating new user here
	{
		if(isset($_POST['iuName'][$i]) && $_POST['iuName'][$i])
		{
			try {
				$inviteUsers[$i]['id']	= $_POST['iuID'][$i];
			}
			catch(Exception $e){ /*nothing*/ }

			$inviteUsers[$i]['name'] 		= $_POST['iuName'][$i];
			$inviteUsers[$i]['email'] 	= $_POST['iuEmail'][$i];
			$inviteUsers[$i]['role'] 		= strtoupper($_POST['iuRole'][$i]);

			//protect
			protect($inviteUsers[$i]['name']);
			protect($inviteUsers[$i]['email']);

		}
		$i++;
	}

	$newUsers = array();
	$userApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	foreach($users as $user)
	{
		//create/edit user
		$data 					= array();


		if(isset($user['id']) && !preg_match('/^u.*$/',$user['id'])) //edit old
		{
			$userID = $user['id'];
			//now the role
			$role		= strtoupper($user['role']);
			$accountId	= $_SESSION['account_id'];
			$roleData = array();
			$roleData['role'] = $role;
			$roleData['accountId'] = $accountId;
			$jsonRoleData = json_encode($roleData);
			$curlResult = callAPI('PUT', $apiURL."users/$userID/role?accountId=$accountId&role=$role", $jsonRoleData, $userApiAuth); //user role updated
		}
	}

	$newInviteUsers = array();
	$userApiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here

	foreach($inviteUsers as $user)
	{
		//create/edit user
		$data 				= array();
		$data['name']		= $user['name'];
		$data['createdBy']		= $_SESSION['user_id'];
		$data['accountId']		= $_SESSION['account_id'];
		$data['email']		= $user['email'];
		$data['role']		= $user['role'];

		$jsonData = json_encode($data);

		//appToken here is the web-apps token and not the user's

		$curlResult = callAPI('POST', $apiURL."invite", $jsonData, $userApiAuth); //user created

		$dataJSON = json_decode($curlResult,true);

		if(isset($dataJSON['id'])) //if no duplicate user
		{
			$newInviteUsers[$user['id']] = $dataJSON['id'];
		}

	}

	//we need to send back an array along with curlResult
	$newJSON = array();
	$newJSON['result'] = json_decode($curlResult,true); //make it an array
	$newJSON['update']= $newUsers; //add array of new values
	$newJSON['update_invite']= $newInviteUsers; //add array of new values

	$newJSON = json_encode($newJSON); //back to JSON

	echo $newJSON; //sending a JSON via ajax
?>