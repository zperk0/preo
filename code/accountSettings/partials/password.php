<h3><?echo _("Profile")?></h3>
<div class='profileWrapper'>
	<form name="passwordForm" id="passwordForm" novalidate>
		<div class='rowWrapper' ng-class="{'error': passwordForm.oldPassword.$invalid && triedSubmit || oldIncorrect}">
			<label><? echo _("Old Password")?></label>
			<div class='inputWrapper'>
				<input type='password' name='oldPassword' ng-model='password.oldPassword' placeholder="**********" required/>
			</div>
			
		</div>
		<div class='rowWrapper' ng-class="{'error': passwordForm.newPassword.$invalid && triedSubmit}">
			<label><?echo _("New Password")?></label>
			<div class='inputWrapper'>			
				<input type='password' name='newPassword' ng-model='password.password' placeholder="**********"  equals="{{newPasswordConfirm}}" required/>
			</div>
			
		</div>
		<div class='rowWrapper' ng-class="{'error': passwordForm.newPasswordConfirm.$invalid && triedSubmit}">
			<label><?echo _("Confirm")?></label>
			<div class='inputWrapper'>
				<input type='password' name='newPasswordConfirm'  ng-model='newPasswordConfirm' placeholder="**********"  equals="{{password.password}}" required/>
			</div>			
		</div>		
		<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
		<button ng-show="!isPosting" class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE CHANGES");?></button>
		<button ng-show="!isPosting" class='preodayButton secondary' ng-click="cancel()" ><?echo _("CANCEL");?></button>
		<button ng-show="isPosting" class="secondary" type="button"><?echo _("SAVING...");?></button>
	</form>

</div>