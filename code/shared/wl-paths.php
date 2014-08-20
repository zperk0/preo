<?php 
	//PATHS
	if(isset($_SERVER['PREO_UPLOAD_PATH']))
	{
		$wPath = $_SERVER['PREO_UPLOAD_PATH'].'wallpaper/';
		$lPath = $_SERVER['PREO_UPLOAD_PATH'].'logo/';
		$mPath = $_SERVER['PREO_UPLOAD_PATH'];
	}
	else
	{
		$wPath = '/tmp/upload/'.'wallpaper/';
		$lPath = '/tmp/upload/'.'logo/';
		$mPath = '/tmp/upload/';
	}

	$jsMPath = $mPath . "menuitem/";
	?>
	<script type="text/javascript">
		globalWPath = "<?echo $wPath;?>";
		globalLPath = "<?echo $lPath;?>";
		globalMPath = "<?echo $jsMPath;?>";
	</script>
	<?


?>