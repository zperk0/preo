<form id="settingsForm" method="POST" data-abide>
	<div class="row">
		<h2><? echo _("Settings");?></h2>
		<div class="large-6 columns">
			<label><?echo _("First Name");?></label>
			<input type="text" name="fName" value="<?echo $_SESSION['user_fName'];?>" required pattern="[a-zA-Z]+" tabindex=1>
			<small class="error"><?echo _("First Name is required and must be only letters.");?></small>
		</div>
		<div class="large-6 columns">
			<label><?echo _("Last Name");?></label>
			<input type="text" name="lName" value="<?echo $_SESSION['user_lName'];?>" required pattern="[a-zA-Z]+" tabindex=2>
			<small class="error"><?echo _("Last Name is required and must be only letters.");?></small>
		</div>
	</div>
	<div class="row">
		<div class="large-6 columns">
			<label><?echo _("Email");?></label>
			<input type="email" name="email" value="<?echo $_SESSION['user_email'];?>" required tabindex=3>
			<small class="error"><?echo _("An email address is required.");?></small>
		</div>
		<div class="large-6 columns">
			<label><?echo _("Business Name");?></label>
			<input type="text" name="businessName" value="<?echo $_SESSION['account_name'];?>" required pattern="[a-zA-Z]+" tabindex=4>
			<small class="error"><?echo _("A business name is required.");?></small>
		</div>
	</div>
	
	<div class="row">
		<div class="small-4 large-2 columns">
			<label>Notifications</label>
			<div class="switch notiSwitch"> 
				<input id="z" name="notification-switch" value="0" type="radio">
				<label for="z" class="offswitch">Off</label>

				<input id="z1" name="notification-switch" value="1" type="radio" checked>
				<label for="z1" class="onswitch">On</label>

				<span></span>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="large-2 small-4 columns">
			<small><a href="#" id="changePassTrigger">Change password?</a></small>
		</div>
	</div>
	
	<div class="hide" id="passDiv">
		<div class="row">
			<div class="large-6 columns">
				<label><?echo _("Old Password");?></label>
				<input type="password" name="password" placeholder="" required tabindex=5>
				<small class="error"><?echo _("A password address is required. Atleast 8chars and must contain atleast 1 number and 1 uppercase letter.");?></small>
			</div>
			<div class="large-6 columns">
				<label><?echo _("New Password");?></label>
				<input type="password" name="password" placeholder="" required tabindex=5>
				<small class="error"><?echo _("A password address is required. Atleast 8chars and must contain atleast 1 number and 1 uppercase letter.");?></small>
			</div>
		</div>
	</div>
	<br/>
	<div class="row">
		<div class="large-3 small-4 columns">
			<button type="submit" class="button" tabindex=6><?echo _("SAVE");?></button>
		</div>
	</div>
</form>