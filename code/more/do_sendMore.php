<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/override_vars.php');
	
	$features = $_POST['features'];
	
	$requirements = $_POST['requirements'];
	protect($requirements);
	
	$body = "Features:\n";
	foreach($features as $feature)
	{
		$body .= $feature."\n";
	}
	
	$body .= "\nRequirements:\n".$requirements."\n\n";
	
	$headers  = "From: ".$_SESSION['user_name']." <".$_SESSION['user_email'].">\r\n";
	$subject  = "New message from Find Out more form";
	$to       = $_SESSION['OVERRIDES']["hello_email"];
	
	$sendMail = mail($to, $subject, $body, $headers);
?>