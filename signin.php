<?php session_start();
	  require('getPath.php'); //the only relative link we will have
	  
	  if(isset($_SESSION['logged'])) { header('location:'.$_SESSION['path'].'/dashboard'); exit; } //redirect to dashboard if logged in
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/js_strings.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/signin/signin_logic.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/signin/signin_content.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>