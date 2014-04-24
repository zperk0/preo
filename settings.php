<?php session_start();
	  require('getPath.php'); //the only relative link we will have
	  
	  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/js_strings.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/settings/settings_content.php'); 
	  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>