<?php session_start();
	  require('getPath.php');
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/invite/invite_shared.php');
	  $inviteKey = isset($_GET['inviteKey']) ? explode('/',$_GET['inviteKey'])[1] : false;

	  if ($inviteKey){
	  	$inviteUser = getInviteUserByKey($inviteKey);
	  	if ($inviteUser->status == 404){
	  		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	  		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	  		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/invite/invalid.php');
	  		require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');
	  		die();
	  	} else if (new DateTime() > new DateTime($inviteUser->expiryDate) ) {
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
					require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/invite/expired.php');
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');
	  			die();
	  	}

	  	if(isset($_SESSION['logged'])) {
	  		if ($inviteUser->userId != $_SESSION['user_id']) {
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php');
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/invite/invalid.php');
	  			require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php');
	  			die();
	  		}  else {
	  			$user = [];
	  			$user['id']= $_SESSION['user_id'];
	  			$user['email']= $_SESSION['user_email'];
	  			$user['password']= 'fakePass';
	  			$user['firstName']= $_SESSION['user_fName'];
	  			$newUser = doInvite($inviteUser->id,json_encode($user));
	  			if ($newUser['id']){
	  				header('location:'.$_SESSION['path'].'/selectVenue'); exit;
	  			} else {
	  				header('location:'.$_SESSION['path'].'/404'); exit;
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

