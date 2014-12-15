<?php session_start();
	  require('getPath.php'); //the only relative link we will have
	  
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support

	  $showCssBeforeLogin = true;
	  
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h_signup.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/forgot/forgot_content.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f_signup.php'); ?>