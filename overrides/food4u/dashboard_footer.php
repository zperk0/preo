		<footer class="dashboardFooter">
			<div class="row">				
				<div class="large-offset-1 large-2 small-offset-1 small-5 columns centerInfoDiv">
<!-- 					<p>
	<a class="TWFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/twitter.png"/></a>
	<a class="FBFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/facebook.png"/></a>
	<a class="LIFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/linkedin.png"/></a>
</p> -->
					<p><a href="mailto:<?php echo $_SESSION['OVERRIDES']["support_email"] ?>"><?echo $_SESSION['OVERRIDES']["support_email"];?></a></p>
					<p><a href="<?php echo $_SESSION['OVERRIDES']["terms"] ?>" target="_blank"><? echo _("Legal Statement");?></a></p>
					<p><a href="<?php echo $_SESSION['OVERRIDES']["privacy"] ?>" target="_blank"><? echo _("Privacy + Cookies");?></a></p>				
				</div>				
			</div>
		</footer>