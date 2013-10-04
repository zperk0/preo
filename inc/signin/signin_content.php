<div class="row">
	<div class="topSpacer"></div>
	<div class="large-6 columns">
		<form id="signinForm" method="POST" data-abide>
			<h1><?echo _("Your account");?></h1>
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Email");?></label>
					<input type="email" name="email" placeholder="" required tabindex=1>
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
					<button type="submit" tabindex=3><?echo _("SIGN IN");?></button>
				</div>
			</div>
		</form>
	</div>
</div>
<div id="forgotPassM" class="reveal-modal">
	<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/forgotpass.php'); ?>
	<a class="close-reveal-modal">&#215;</a>
</div>