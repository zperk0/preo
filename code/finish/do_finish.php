<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	
	$_SESSION['appPublished'] = '08C56E86512EAA9F108042253982AB4B7DD4F87BE8D66095D3655BB71F82123B';
	
	header('location:'.$tempPath.'/dashboard.php'); //redirect to dash
?>