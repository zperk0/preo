<?php 
session_start();
	  require('getPath.php'); //the only relative link we will have
	  
	  header('location:'.$_SESSION['path'].'/login');  //always redirect to login
	  
	  exit;