<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	
	$features = $_POST['features'];
	
	$requirements = $_POST['requirements'];
	protect($requirements);
	
	$body = "Features:\n";
	foreach($features as $feature)
	{
		$body .= $feature."\n";
	}
	
	$body .= "\nRequirements:\n".$requirements;
	$body .= "\n\nFrom:\n".$_SESSION['user_name']." <".$_SESSION['user_email'].">\n\n";
	
	$headers  = "From: PreoDay <no-reply@preoday.com>\r\n";
	$subject  = "New message from Find Out more form";
	$to       = 'hello@preoday.com';
	
	$sendMail = mail($to, $subject, $body, $headers);
?>