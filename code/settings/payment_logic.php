<?php

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	
	$accountId = $_SESSION['account_id'];
	
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to send the user's token here
	
	$curlResult = callAPI('GET', $apiURL."stripe/connect/auth/link?accountId=$accountId", false, $apiAuth);
	$stripeLink = $curlResult; //this should have come as JSON!
	
	//this is for demo purposes only!
	if(preg_match('/demo/',$_SERVER['HTTP_HOST'])) $stripeLink .= "&redirect_uri=http://demo.preoday.com/code/shared/accept_stripe.php";
	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php');
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/paymentConfig.php');
?>