<?php

if(!$_SESSION['logged'] || !isset($_SESSION['token']))
{
	header('location:/logout');
	exit();
}
?>