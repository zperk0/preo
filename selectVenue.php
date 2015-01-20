<?php
 	session_start();
	  require('getPath.php'); //the only relative link we will have	  
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  
		if(!$_SESSION['logged'] || !isset($_SESSION['token']))
		{
			header('location:/logout');
			exit();
		}

	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/venue/venue_logic.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); 
	  ?>