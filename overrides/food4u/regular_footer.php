		<footer class="regular">
			<div class="row">
				<?php
					$arrPages = ['/kyc', '/shop', '/accountSettings'];
					if ( !in_array($_SERVER['REDIRECT_URL'], $arrPages) ) {
				?>
				<div class="large-3 small-2 columns premiumDiv">
					<a href="#" data-dropdown="langDrop" class="button dropdown small"><? echo _("CHANGE LANGUAGE");?></a>
					<ul id="langDrop" class="f-dropdown">
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="en"><? echo _("English");?></a></li>
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="de"><? echo _("German");?></a></li>
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="fr"><? echo _("French");?></a></li>
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="nb"><? echo _("Norwegian");?></a></li>
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="sv"><? echo _("Swedish");?></a></li>
						<li><a href="javascript:void(0)" class="changeLang" data-new-lang="fi"><? echo _("Finnish");?></a></li>
					</ul>
				</div>
				<!-- <div class="large-offset-4 large-2 small-3 columns left"> -->
				<?php }/* else {*/ ?>
				<!-- <div class="large-offset-7 large-2 small-3 columns left">				 -->
				<?php /*}*/ ?>
<!-- 					<p>
	<a class="TWFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/twitter.png"/></a>
	<a class="FBFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/facebook.png"/></a>
	<a class="LIFoot" target="_blank" href="#"><img src="<?echo $_SESSION['path']?>/img/linkedin.png"/></a>
</p>
				</div> -->
				<div class="large-3 small-7 columns footLinks right">
					<p><a href="mailto:info@food4uapp.co.uk"><?echo _("info@food4uapp.co.uk");?></a></p>
					<p><a href='<?echo $_SESSION['OVERRIDES']['terms']?>' target="_blank"><? echo _("Legal Statement");?></a></p>
					<p><a href="<?echo $_SESSION['OVERRIDES']['privacy']?>" target="_blank"><? echo _("Privacy + Cookies");?></a></p>
					<p>&copy; <? echo _("Food4u")." ".date('Y');?></p>
				</div>
			</div>
		</footer>



