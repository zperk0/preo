<?php session_start();
	require('getPath.php'); //the only relative link we will have
	//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php'); 

	$_SESSION['secondaryMenuFlag']= 1;
	
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/dashboard/menuConfig.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>