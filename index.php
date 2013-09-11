<?php session_start();
	  if(isset($_SESSION['logged'])) { header('location:/dashboard'); exit; } //redirect to dashboard if logged in
	  
	  require_once($_SERVER['DOCUMENT_ROOT'].'/code/shared/lang.php'); //need this for multi-language support
	  require($_SERVER['DOCUMENT_ROOT'].'/inc/shared/meta.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].'/inc/shared/h.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].'/inc/homepage/homepage_content.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].'/inc/shared/f.php'); ?>