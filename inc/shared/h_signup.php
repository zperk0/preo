<?php 
	require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/override_vars.php');
	$url = substr($_SERVER['REDIRECT_URL'], 1);
?>


<nav class="navbar navbar-default navbar-fixed-top <?php echo $url == 'signup' ? 'signupHeader' : '' ?>" role="navigation">

	<div class="container" id="cblue">
			<?php if ($_SESSION['OVERRIDES']["logo"] != false) { ?>		
				<div class="navbar-header">			
					<a id="logo" class="logo" href="http://preoday.com/" rel="home">Preoday</a>			
				</div>
			<?php } ?>
			<div class="nav navbar-nav navbar-text navbar-right">
				<a href="#" class="btn btn-default menu" id="trigger-overlay"></a>
			</div>		
	</div>	
</nav>


<!-- Foundation with required JS and Plugins minified COMBINED with Bespoke JS File Generated using 'grunt build' -->
<script src="<?echo $_SESSION['path']?>/code/shared/js_strings.php?lang=<?echo $lang?>"></script>	

<div class="nav-spacer"></div>