<div class="row">
	<div class="topSpacer"></div>
	<div class="large-6 columns">
		<h1><?echo _("Your account");?></h1>
		<div class="large-12 columns socialMediaDiv">
			<div class="row">
				<div class="large-6 columns fbSignup">
					<a href="<?php echo $authCodeUrl;?>"><span><?echo _("Login using Facebook");?></span></a>
				</div>
			</div>
			<div class="row">
				<div class="large-6 columns googleSignup">
					<input type="hidden" id="userConsent" value="0"/>
					<span class="g-signin" data-callback="signinCallback" data-clientid="415077578170-8p5u7eurntd3qj7qbrk2nv2mvetuqjur.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-requestvisibleactions="http://schemas.google.com/AddActivity" data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email" data-prompt="select_account"><?echo _("Login using Google+");?></span>
				</div>
			</div>
		</div>
		<div class="large-12 columns">
			<form id="signinForm" method="POST" data-abide>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Email");?></label>
						<input type="email" id="email" name="email" placeholder="" required tabindex=1>
						<small class="error"><?echo _("Please type your email address");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Password");?></label>
						<input type="password" name="password" placeholder="" required tabindex=2>
						<small class="error"><?echo _("Please type your password");?></small>
					</div>
				</div>
					
				<div class="row row--space1">
					<div class="large-12 columns">
						<small><a href="#" data-reveal-id="forgotPassM"><?echo _("Forgot your password?");?></a></label></small>
					</div>
				</div>
				
				<div class="row">
					<div class="small-8 large-5 columns">
						<button type="submit" tabindex=3><?echo _("LOG IN");?></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<div id="forgotPassM" class="reveal-modal">
	<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/forgotpass.php'); ?>
	<a class="close-reveal-modal">&#215;</a>
</div>