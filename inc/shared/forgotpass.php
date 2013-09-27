<h2><i class="fi-unlock large"></i> <? echo _("Forgot your password?");?></h2>
<form id="forgotPassForm" method="POST" data-abide>
	<fieldset>
		<div class="row">
			<div class="large-12 columns">
				<label><?echo _("Email");?></label>
				<input type="email" name="email" required tabindex=3>
				<small class="error"><?echo _("An email address is required.");?></small>
			</div>
		</div>
		<br/>
		<div class="row">
			<div class="large-3 small-4 columns small-centered large-centered">
				<button type="submit" class="large button success radius" tabindex=6><?echo _("Reset Password");?></button>
			</div>
		</div>
	</fieldset>
</form>