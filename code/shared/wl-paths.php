<?php 

	//PATHS
	if(isset($_SERVER['PREO_UPLOAD_PATH']))
	{
		if(preg_match('/http/',$_SERVER['PREO_UPLOAD_PATH']))
		{	
			$wPath = $_SERVER['PREO_UPLOAD_PATH'].'wallpaper/';
			$lPath = $_SERVER['PREO_UPLOAD_PATH'].'logo/';
		}
		else
		{
			$wPath = '//'.$_SERVER['HTTP_HOST'].$_SERVER['PREO_UPLOAD_PATH'].'wallpaper/';
			$lPath = '//'.$_SERVER['HTTP_HOST'].$_SERVER['PREO_UPLOAD_PATH'].'logo/';
		}
	}
	else
	{
		$wPath = '//'.$_SERVER['HTTP_HOST'].'/tmp/upload/'.'wallpaper/';
		$lPath = '//'.$_SERVER['HTTP_HOST'].'/tmp/upload/'.'logo/';
	}
	?>
	<script type="text/javascript">
		globalWPath = "<?echo $wPath;?>";
		globalLPath = "<?echo $lPath;?>";
	</script>
	<?


?>