<?php session_start();

	//resetting global vars
	$_SESSION['venue_edit_on']= 0;
	$_SESSION['app1_edit_on'] = 0;
	$_SESSION['app2_edit_on'] = 0;
	$_SESSION['menu_edit_on'] = 0;


	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/settings/app1_logic.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?>