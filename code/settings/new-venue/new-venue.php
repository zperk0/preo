<?
	session_start();
	$_SESSION['newVenue'] = true;
  	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	//resetting global vars
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/global_vars.php'); 

	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support	
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/settings/venue_logic.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); 
	$_SESSION['venue_edit_on'] = 0;
?>