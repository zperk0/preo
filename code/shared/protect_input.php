<?php
	function protect(&$value)
	{
		//$value = mysql_real_escape_string($value);
		$value = stripslashes($value);
		$value = strip_tags($value);
	}
?>