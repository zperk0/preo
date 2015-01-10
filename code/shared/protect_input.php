<?php
	function protect(&$value)
	{
		$value = stripslashes($value);
		$value = strip_tags($value);
	}
	function protectArray(&$arr)
	{
		foreach ($arr as $key => $value) {
			$arr[$key] = strip_tags(stripslashes($value));
		}
	}
?>