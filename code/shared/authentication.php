<?php
if(!isset($_SESSION['logged']) || !$_SESSION['logged'] || !isset($_SESSION['token']))
{
	$_SESSION['REDIRECT_AFTER_LOGIN'] = $_SERVER['REQUEST_URI'];
	header('location:/login');
	exit();
}
?>