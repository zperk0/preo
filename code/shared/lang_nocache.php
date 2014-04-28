<?php //works on Linux and Windows!	

//Import this file on lang.php before bindtextdomain
//require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang_nocache.php');
//make sure to have created locale/nocache (MAC: cd locale && ln -s . nocache , WIN: cd locale ; mklink /D . nocache )
	bindtextdomain($domain, $_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/nocache');
?>