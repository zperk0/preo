<div class="row">
	<div class="topSpacer"></div>
	<div class="large-6 columns">
		<form id="signupForm" method="POST" data-abide>
			<h1><?echo _("Get started");?></h1>
			<div class="row">
				<div class="large-6 columns fbSignup">
					<p><?echo _("Signup using Facebook");?></p>
				</div>
			</div>
			<div class="row">
				<div class="large-6 columns googleSignup">
					<p><?echo _("Signup using Google");?></p>
				</div>
			</div>
			<div class="row">
				<div class="large-6 columns">
					<label><?echo _("First Name");?></label>
					<input type="text" name="fName" placeholder="" required pattern="[a-zA-Z]+" tabindex=1>
					<small class="error"><?echo _("Please type your first name. It must be only letters");?></small>
				</div>
				<div class="large-6 columns">
					<label><?echo _("Last Name");?></label>
					<input type="text" name="lName" placeholder="" required pattern="[a-zA-Z]+" tabindex=2>
					<small class="error"><?echo _("Please type your last name. It must be only letters");?></small>
				</div>
			</div>
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Your email");?></label>
					<input type="email" name="email" placeholder="" required tabindex=3>
					<small class="error"><?echo _("Please type your email");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Create a password");?></label>
					<input type="password" name="password" placeholder="" required tabindex=4>
					<small class="error"><?echo _("Please type a password. It must be at least 8 characters long and must contain at least 1 number and 1 uppercase letter");?></small>
				</div>
			</div>
			
			<div class="row">
				<div class="large-12 columns">
					<label><?echo _("Your business name");?></label>
					<input type="text" name="businessName" placeholder="" required pattern="[a-zA-Z]+" tabindex=5>
					<small class="error"><?echo _("Please type your business name");?></small>
				</div>
			</div>
			
			
			<div class="row row--space1">
				<div class="large-12 columns small-centered large-centered">
					<small><?echo _("By clicking 'Sign Up' you agree to our");?> <a href="#" data-reveal-id="termsM"><?echo _("Terms");?></a> <?echo _("and");?> <a href="#" data-reveal-id="privM"><?echo _("Privacy Policy");?></a>.</label></small>
				</div>
			</div>
			
			
			<div class="row">
				<div class="small-8 large-5 columns">
					<button type="submit" tabindex=6><?echo _("CONTINUE");?></button>
				</div>
			</div>
		</form>
	</div>
</div>