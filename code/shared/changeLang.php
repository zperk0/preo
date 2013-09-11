<?php session_start();

$_SESSION['lang'] = isset($_POST['lang']) ? $_POST['lang'] : 'en';

?>