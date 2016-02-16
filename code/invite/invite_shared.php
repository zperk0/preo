<?php session_start(); //start the session so this file can access $_SESSION vars.

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function


	function doInvite($inviteId, $jsonData) {
		global $apiURL;
		global $apiAuth;
		$curlResult = callAPI('POST', $apiURL."invite/$inviteId", $jsonData, $apiAuth); //user created
		$user = json_decode($curlResult,true);
		if ($user) {
			return $user;
		}
		return null;
	}

	function getInviteUserByKey($key) {
		global $apiURL;
		global $apiAuth;
		$curlResult = callAPI('GET', $apiURL."invite/key/" . $key, false, $apiAuth);
		return json_decode($curlResult);
	}

?>