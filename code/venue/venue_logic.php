<?php 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/account_functions.php');   //kint

	$dataJSON = getVenues( $_SESSION['user_id'] );

	if(empty($dataJSON)) {
		$_SESSION['noVenueFlag']=1; 	
		header("location:".$_SESSION['path'].'/dashboard');
		exit;		
	} else if(count($dataJSON) === 1) {
		$result = json_decode(loggedVenue($dataJSON[0]['id']), true);
		if ( is_array($result) && count($result) == 1 && $result[0]['status'] == '200' ) {
			header("location:".$_SESSION['path'].'/dashboard');exit();
		} else {
			header("location:".$_SESSION['path'].'/404');exit();
		}
	}

	$venues = $dataJSON;
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
	require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path']."/inc/venue/selectVenue_content.php"); 	
?>