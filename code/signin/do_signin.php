<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');

	$email = $_POST['email'];
	protect($email);

	$password = $_POST['password'];
	protect($password);

	$inviteId = $_POST['inviteid'];
	protect($inviteId);


	$data['username']	= $email;
	$data['password']	= $password;

	$jsonData = json_encode($data);

	$curlResult = callAPI('POST', $apiURL."users/auth", $jsonData, $apiAuth);

	$dataJSON = json_decode($curlResult,true);
	if(isset($dataJSON['token'])) {
		$_SESSION['token']=$dataJSON['token']; //otherwise its an error!
		if ($inviteId) {
			$user = doInvite($inviteId,$curlResult);
			//TODO handle error
		}
	}

	echo $curlResult; //sending a JSON via ajax

?>