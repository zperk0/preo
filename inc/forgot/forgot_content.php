<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<h2><? echo _("Forgot your password?");?></h2>
		<form id="forgotPassForm" method="POST" data-abide>
			<div class="row">
				<div class="large-6 columns">
					<label><?echo _("Email");?></label>
					<input type="email" name="emailF" id="emailF" required tabindex=3>
					<small class="error"><?echo _("An email address is required.");?></small>
				</div>
			</div>
			<br/>
			<div class="row">
				<div class="large-3 small-4 columns">
					<button type="submit" class="button" tabindex=6><?echo _("RESET PASSWORD");?></button>
				</div>
			</div>
		</form>
	</div>
</div>
