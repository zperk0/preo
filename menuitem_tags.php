<?php
	session_start();
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/tags.php'); 

	echo json_encode($tags);