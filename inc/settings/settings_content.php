<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 columns">
		<form id="settingsForm" method="POST" data-abide>
			<div class="row">
				<h2 class="alignHeader"><? echo _("Profile");?></h2>
				<div class="large-6 columns">
					<label><?echo _("First Name");?></label>
					<input type="text" name="fName" value="<?echo $_SESSION['user_fName'];?>" required pattern="^.{0,99}$" tabindex=1>
					<small class="error"><?echo _("First Name is required (max 100chars)");?></small>
				</div>
				<div class="large-6 columns">
					<label><?echo _("Last Name");?></label>
					<input type="text" name="lName" value="<?echo $_SESSION['user_lName'];?>" required pattern="^.{0,99}$" tabindex=2>
					<small class="error"><?echo _("Last Name is required (max 100chars)");?></small>
				</div>
			</div>
			<div class="row">
				<div class="large-6 columns">
					<label><?echo _("Email");?></label>
					<input type="email" name="email" value="<?echo $_SESSION['user_email'];?>" required tabindex=3>
					<small class="error"><?echo _("An email address is required");?></small>
				</div>
				<div class="large-6 columns">
					<label><?echo _("Business Name");?></label>
					<input type="text" name="businessName" value="<?echo $_SESSION['account_name'];?>" required pattern="^.{0,99}$" tabindex=4>
					<small class="error"><?echo _("A business name is required (max 100chars)");?></small>
				</div>
			</div>
			
			<!--
			<div class="row">
				<div class="small-4 large-2 columns">
					<label><?echo _("Notifications");?></label>
					<div class="switch notiSwitch"> 
						<input id="z" name="notification-switch" value="0" type="radio">
						<label for="z" class="offswitch"><?echo _("Off");?></label>

						<input id="z1" name="notification-switch" value="1" type="radio" checked>
						<label for="z1" class="onswitch"><?echo _("On");?></label>

						<span></span>
					</div>
				</div>
			</div>
			-->
			
			<div class="row">
				<div class="large-2 small-4 columns">
					<small class="smallNot"><a href="#" id="changePassTrigger"><?echo _("Change password?");?></a></small>
					
				</div>
			</div>
			
			<div class="hide" id="passDiv">
				<div class="row">
					<div class="large-6 columns">
						<label><?echo _("Old Password");?></label>
						<input type="hidden" name="passFlag" id="passFlag" value="0">
						<input type="password" name="opassword" placeholder="" class="passField" tabindex=5>
						<small class="error"><?echo _("A password address is required.");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-6 columns">
						<label><?echo _("New Password");?></label>
						<input type="password" id="newPassField" name="npassword" placeholder="" class="passField" tabindex=5>
						<small class="error"><?echo _("A password address is required.");?></small>
					</div>
					<div class="large-6 columns">
						<label><?echo _("Confirm New Password");?></label>
						<input type="password" placeholder="" class="passField" data-equalTo="newPassField" tabindex=6>
						<small class="error"><?echo _("Passwords don't match.");?></small>
					</div>
				</div>
			</div>
			<br/>
			<div class="row">
				<div class="large-3 small-4 columns">
					<button type="submit" class="button" tabindex=7><?echo _("SAVE");?></button>
				</div>
			</div>
		</form>
	</div>
</div>