<div class="row">
	<div class="large-6 columns small-centered large-centered">
		<form id="signinForm" method="POST" data-abide>
			<fieldset>
				<legend><?echo _("Sign In to PreoDay");?></legend>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Email");?></label>
						<input type="email" name="email" placeholder="" required tabindex=1>
						<small class="error"><?echo _("An email address is required.");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Password");?></label>
						<input type="password" name="password" placeholder="" required tabindex=2>
						<small class="error"><?echo _("A password address is required.");?></small>
					</div>
				</div>
					
				<div class="row">
					<div class="large-12 columns small-centered large-centered text-center">
						<small><a href="#"><?echo _("Forgot your password");?></a>?</label></small>
					</div>
				</div>
				
				<br/>
				
				<div class="row">
					<div class="small-8 large-5 columns small-centered large-centered">
						<button type="submit" class="large button success radius" tabindex=3><?echo _("Sign In");?></button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</div>