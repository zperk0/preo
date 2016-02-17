<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signup/signup_functions.php');
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');

	$inviteId = $_POST['inviteId'];

	$jsonData = json_encode($_POST['user']);

	$user = doInvite($inviteId,$jsonData);

	if(isset($user)) $_SESSION['token']=$user['token']; //otherwise its an error!

  $account = [];
  $account['id'] = $user['accountId'];

	setUserLogger([
		'account' => $account,
		'user' => $user
	]);

	echo json_encode($user);
	//DEBUG
	//$decodedCurl = json_decode($curlResult,true);
	//if($curlResult) echo "Success!";
	//else echo "Fail :(";
	//echo "<br/><br/><pre>".json_encode(json_decode($curlResult), JSON_PRETTY_PRINT)."</pre><br/>";
	//echo "<br/>Need to check if data is being recorded by PreoDay systems and then proceed to dashboard<br/>";
?>