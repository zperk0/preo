<?php
	function protect(&$value)
	{
		$value = stripslashes($value);
		$value = strip_tags($value);
	}
?>