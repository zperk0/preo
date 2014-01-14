		<footer class="dashboardFooter">
			<div class="row">
				<div class="large-4 columns premiumDiv">
					<h3><i class="icon-plus-sign"></i> <?echo _("Premium Features");?></h3>
					<p><?echo _("Looking for ePOS integration, detailed reporting or the ability to configure multiple outlets?");?></p>
					<a href="<?echo $_SESSION['path']?>/findoutmore"><button type="button" class="success small premiumButton"><?echo _("FIND OUT MORE");?></button></a>
				</div>
				<div class="large-offset-1 large-2 columns">
					<p>
						<a class="TWFoot" target="_blank" href="https://twitter.com/preoday"><img src="<?echo $_SESSION['path']?>/img/twitter.png"/></a>
						<a class="FBFoot" target="_blank" href="https://www.facebook.com/Preoday"><img src="<?echo $_SESSION['path']?>/img/facebook.png"/></a>
						<a class="LIFoot" target="_blank" href="http://www.linkedin.com/company/2892744?trk=tyah"><img src="<?echo $_SESSION['path']?>/img/linkedin.png"/></a>
					</p>
					<p><a href="mailto:askme@preoday.com"><?echo _("askme@preoday.com");?></a></p>
					<p><a href="#" data-reveal-id="termsM"><? echo _("Legal Statement");?></a></p>
					<p><a href="#" data-reveal-id="privM"><? echo _("Privacy + Cookies");?></a></p>
					<p>&copy; <? echo _("Preoday")." ".date('Y');?></p>
				</div>
				<div class="large-offset-1 large-4 columns">
					<div class="twitterfeed"></div>
				</div>
			</div>
		</footer>