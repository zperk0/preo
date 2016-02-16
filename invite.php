<?php session_start();
	  require('getPath.php');
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');
	  $showCssBeforeLogin = true;
	  $inviteKey = isset($_GET['inviteKey']) ? explode('/',$_GET['inviteKey'])[1] : false;

	  if ($inviteKey){
	  	$inviteUser = getInviteUserByKey($inviteKey);
	  	if ($inviteUser->status == 404){
	  		echo 'invalid key;';
	  		die();
	  	}

	  	if(isset($_SESSION['logged'])) {
	  		if ($inviteUser->userId != $_SESSION['user_id']) {
	  			echo "this key is not for you";
	  			die();
	  		} else {
	  			$user = [];
	  			$user['id']= $_SESSION['user_id'];
	  			$user['email']= $_SESSION['user_email'];
	  			$user['password']= 'fakePass';
	  			$user['firstName']= $_SESSION['user_fName'];
	  			$newUser = doInvite($inviteUser->id,json_encode($user));
	  			if ($newUser['id']){
	  				echo 'success!';
	  			} else {
	  				echo "unexpected error";
	  			}
	  			die();
	  		}
	  	} else {
	  		if ($inviteUser->userId == null){
	  			header('location:'.$_SESSION['path']."/signup?inviteKey=$inviteKey"); exit;
	  		} else {
	  			header('location:'.$_SESSION['path']."/signin?inviteKey=$inviteKey"); exit;
	  		}
	  	}

	  } else {
	  	header('location:'.$_SESSION['path'].'/dashboard'); exit;
	  }