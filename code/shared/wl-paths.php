<?php 

	//PATHS
	if(isset($_SERVER['PREO_UPLOAD_PATH']))
	{
		$wPath = $_SERVER['PREO_UPLOAD_PATH'].'wallpaper/';
		$lPath = $_SERVER['PREO_UPLOAD_PATH'].'logo/';
	}
	else
	{
		$wPath = '/tmp/upload/'.'wallpaper/';
		$lPath = '/tmp/upload/'.'logo/';
	}
	?>
	<script type="text/javascript">
		globalWPath = "<?echo $wPath;?>";
		globalLPath = "<?echo $lPath;?>";
	</script>
	<?


?>