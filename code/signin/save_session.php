<?php session_start(); //start the session so this file can access $_SESSION vars.

	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/protect_input.php'); //input protection functions to keep malicious input at bay
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].'/code/shared/callAPI.php');   //API calling function

	$email = $_POST['email'];
	protect($email);
	
	$id = $_POST['id'];
	protect($id);
	
	$name = $_POST['name'];
	protect($name);
	
	//we use the user's token
	$apiAuth = "PreoDay ".$_SESSION['token']; //we need to add "PreoDay ". to user tokens
	
	$curlResult = callAPI('GET', $apiURL."accounts", false, $apiAuth); 
	
	try
	{
		$dataArray = json_decode($curlResult, true); //parsing JSON
	
	}
	catch(Exception $e)
	{
		echo "Could not process json payload";
		header('HTTP', true, 400); // 400 bad request
		exit(1);
	}
	
	if(!empty($dataArray['status'])) //error
	{
		echo $dataArray['message'];
		header('HTTP', true, 400); // 400 bad request
		exit(1);
	
	}
	else
	{	
		$_SESSION['bName']	= $dataArray[0]['name'];
		$_SESSION['bID']	= $dataArray[0]['id'];
	}
	
	$_SESSION['id']=$id;
	$_SESSION['email']=$email;
	$_SESSION['name']=$name;
	$_SESSION['lName']=substr($name, strrpos($name, ' ')+1);
	$_SESSION['fName']=str_replace(" ".$_SESSION['lName'],"",$name);
	$_SESSION['logged']=1;
?>