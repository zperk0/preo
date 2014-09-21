<?php 


/**
* $UserAccount Object
*   {
*		account{	
*   		name 		- String
*		   	id			- Int
*		},
*   	user{
*			id	 		- Int
*   		firstName	- String
*   		lastName	- String
*   		email 		- String
*   		role 		- String
*		}
*	}
**/
function setUserLogger( $User ) {
	$_SESSION['account_name'] = $User['account']['name'];
	$_SESSION['account_id'] = $User['account']['id'];
	
	$_SESSION['user_id']	= $User['user']['id'];
	$_SESSION['user_email']	= $User['user']['email'];
	$_SESSION['user_fName']	= $User['user']['firstName'];
	$_SESSION['user_lName']	= $User['user']['lastName'];
	$_SESSION['user_role']	= $User['user']['role']; //default role upon signup
	$_SESSION['logged']		= 1;	
}