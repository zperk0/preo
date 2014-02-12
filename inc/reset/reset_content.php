<div class="row">
	<div class="topSpacer"></div>
	<div class="large-12 small-11 columns">
		<h2><? echo _("Reset your password?");?></h2>
		<?if($continueFlag){?>
		<form id="resetPassForm" method="POST" data-abide>
			<div class="row">
				<div class="large-6 columns">
					<label><?echo _("New Password");?></label>
					<input type="password" name="password" id="password" required tabindex=1>
					<input type="hidden" name="code" value="<?echo $code;?>">
					<small class="error"><?echo _("A password is required.");?></small>
				</div>
				<div class="large-6 columns">
					<label><?echo _("Confirm Password");?></label>
					<input type="password" id="confPassword" data-equalTo="password" required tabindex=2>
					<small class="error"><?echo _("Passwords don't match.");?></small>
				</div>
			</div>
			<br/>
			<div class="row">
				<div class="large-3 columns">
					<button type="submit" class="button" tabindex=3><?echo _("RESET PASSWORD");?></button>
				</div>
			</div>
		</form>
		<?}else{?>
		<h3><?echo _("Sorry. Invalid code.");?></h3>
		<?}?>
	</div>
</div>
