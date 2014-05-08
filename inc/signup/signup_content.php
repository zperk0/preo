<?if($fb_field_flag){?>
<script type="text/javascript">
$(document).ready(function(){
	noty({
	  type: 'success',
	  text: <? echo json_encode(_('Now, we just need your business name.')) ?>
	});
});
</script>
<?}?>
<div class="row">
	<div class="topSpacer"></div>
	<h1 class="alignHeader"><?echo _("Get started");?></h1>
	<div class="large-12 columns socialMediaDiv <?if($fb_field_flag) echo 'hide';?>">
		<div class="row">
			<div class="large-6 columns fbSignup">
				<a href="<?php echo $authCodeUrl;?>"><span><?echo _("Signup using Facebook");?></span></a>
			</div>
		</div>
		<div class="row">
			<div class="large-6 columns googleSignup">
				<input type="hidden" id="userConsent" value="0"/>
				<span class="g-signin" data-callback="signinCallback" data-clientid="26773142567-ui0mkhms9iu18n82k3tegok0b0phnim6.apps.googleusercontent.com" 
						data-cookiepolicy="single_host_origin" data-scope="email profile"><?echo _("Signup using Google+");?></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="large-6 small-11 columns left row--space1u alignDiv">
			<form id="signupForm" method="POST" data-abide>
				<div class="row nameRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("First Name");?></label>
						<input type="text" id="fName" name="fName" placeholder="" <?if($fb_field_flag) echo "value='$fName'";?> required pattern="^.{0,99}$" tabindex=1>
						<small class="error"><?echo _("Please type your first name.(max 100chars)");?></small>
					</div>
					<div class="large-12 columns">
						<label><?echo _("Last Name");?></label>
						<input type="text" id="lName" name="lName" placeholder="" required <?if($fb_field_flag) echo "value='$lName'";?>  pattern="^.{0,99}$" tabindex=2>
						<small class="error"><?echo _("Please type your last name.(max 100chars)");?></small>
					</div>
				</div>
				<div class="row emailRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("Your email");?></label>
						<input type="email" id="email" name="email" placeholder=""  <?if($fb_field_flag) echo "value='$email' readonly='readonly'";?> required tabindex=3>
						<small class="error"><?echo _("Please type your email");?></small>
					</div>
				</div>
				
				<div class="row passRow <?if($fb_field_flag) echo 'hide';?>">
					<div class="large-12 columns">
						<label><?echo _("Create a password");?></label>
						<input type="password" name="password" id="passwordField" <?if($fb_field_flag) echo "value='".randomPassword()."'";?> required tabindex=4>
						<small class="error"><?echo _("Please type a password.");?></small>
					</div>
				</div>
				<?if(!$fb_field_flag){?>
				<div class="row passRow">
					<div class="large-12 columns">
						<label><?echo _("Confirm password");?></label>
						<input type="password" id="confPassword" required data-equalTo="passwordField" tabindex=5>
						<small class="error"><?echo _("Passwords don't match.");?></small>
					</div>
				</div>
				<?}?>
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Your business name");?></label>
						<input type="text" name="businessName" placeholder="" required pattern="^.{0,99}$" tabindex=6>
						<small class="error"><?echo _("Please type your business name (max 100chars)");?></small>
					</div>
				</div>
				
				<div class="row">
					<div class="large-12 columns">
						<label><?echo _("Telephone Number");?></label>
						<input type="text" name="phone" placeholder="" required pattern="^.{0,99}$" tabindex=6>
						<small class="error"><?echo _("Please type your telephone number");?></small>
					</div>
				</div>
							
												
				
				<div class="row row--space1">
					<div class="large-12 columns small-centered large-centered">
						<small class="smallNot"><?echo _("By clicking 'Sign Up' you agree to our");?> <a href="#" data-reveal-id="termsM"><?echo _("Terms");?></a> <?echo _("and");?> <a href="#" data-reveal-id="privM"><?echo _("Privacy Policy");?></a>.</label></small>
					</div>
				</div>
			
				<div class="row">
					<div class="small-8 large-5 columns">
						<input type="hidden" name="fbid" <?if($fb_field_flag) echo "value='$fbId'"; else echo "value='0'";?>>
						<input type="hidden" id="gpid" name="gpid" value='0'>
						<button type="submit" tabindex=7><?echo _("SIGN UP");?></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<?if(isset($_GET['autoG']) && $_GET['autoG']=='1'){?>
<script type="text/javascript">
$(document).ready(function(){
	$('#userConsent').val('1');
	$('.g-signin').trigger('click');
});
</script>
<?}?>