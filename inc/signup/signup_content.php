<?if($fb_field_flag){?>
<script>
$(document).ready(function(){
	noty({
	  type: 'success',
	  text: 'Now, we just need a couple details from you'
	});
});
</script>
<?}?>

<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<div class="large-6 columns">
			<form id="signupForm" method="POST" data-abide>
				<h1><?echo _("Get started");?></h1>
				<div class="row nameRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("First Name");?></label>
						<input type="text" id="fName" name="fName" placeholder="" <?if($fb_field_flag) echo "value='$fName'";?> required pattern="[a-zA-Z]+" tabindex=1>
						<small class="error"><?echo _("Please type your first name. It must be only letters");?></small>
					</div>
					<div class="large-12 columns">
						<label><?echo _("Last Name");?></label>
						<input type="text" id="lName" name="lName" placeholder="" required <?if($fb_field_flag) echo "value='$lName'";?>  pattern="[a-zA-Z]+" tabindex=2>
						<small class="error"><?echo _("Please type your last name. It must be only letters");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Your email");?></label>
						<input type="email" id="email" name="email" placeholder=""  <?if($fb_field_flag) echo "value='$email' readonly='readonly'";?> required tabindex=3>
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
						<input type="hidden" name="fbid" <?if($fb_field_flag) echo "value='$fbId'"; else echo "value='0'";?>>
						<input type="hidden" id="gpid" name="gpid" value='0'>
						<button type="submit" tabindex=6><?echo _("CONTINUE");?></button>
					</div>
				</div>
			</form>
		</div>
		<div class="large-offset-1 large-5 columns socialMediaDiv <?if($fb_field_flag) echo 'hide';?>">
			<div class="row">
				<div class="large-6 columns fbSignup">
					<a href="<?php echo $authCodeUrl;?>"><span><?echo _("Signup using Facebook");?></span></a>
				</div>
			</div>
			<div class="row">
				<div class="large-6 columns googleSignup">
					<span class="g-signin" data-callback="signinCallback" data-clientid="415077578170-8p5u7eurntd3qj7qbrk2nv2mvetuqjur.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-requestvisibleactions="http://schemas.google.com/AddActivity" data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email"><?echo _("Signup using Google+");?></span>
				</div>
			</div>
		</div>
	</div>
</div>