<?php session_start();
	require('../../getPath.php'); //the only relative link we will have
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	$state = $_GET['state'];
	protect($state);
	
	$code = $_GET['code'];
	protect($code);
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('GET', $apiURL."stripe/connect/auth/?code=$code&state=$state", false, $apiAuth);
	$_SESSION['pmaReply'] = $curlResult; //again this is not JSON!
	
	$_SESSION['paymentMethodApproved'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
	
	if(isset($_SESSION['noLiveFlag']) && $_SESSION['noLiveFlag'])
	{
		$_SESSION['noLiveFlag']=0;
		$_SESSION['signupWizFlag']=1;
		header('location:'.$_SESSION['path'].'/finish.php'); //redirect to dash
		exit;
	}
	else
	{
		header('location:'.$_SESSION['path'].'/dashboard.php'); //redirect to dash
		exit;
	}
?>