<h3 translate>Profile</h3>
<div class='profileWrapper'>
	<form name="passwordForm" id="passwordForm" novalidate>
		<div class='rowWrapper' ng-class="{'error': passwordForm.oldPassword.$invalid && triedSubmit || oldIncorrect}">
			<label translate>Old Password</label>
			<div class='inputWrapper'>
				<input type='password' name='oldPassword' ng-model='password.oldPassword' placeholder="**********" required/>
			</div>

		</div>
		<div class='rowWrapper' ng-class="{'error': passwordForm.newPassword.$invalid && triedSubmit}">
			<label translate>New Password</label>
			<div class='inputWrapper'>
				<input type='password' name='newPassword' ng-model='password.password' placeholder="**********"  equals="{{newPasswordConfirm}}" required/>
			</div>

		</div>
		<div class='rowWrapper' ng-class="{'error': passwordForm.newPasswordConfirm.$invalid && triedSubmit}">
			<label translate>Confirm</label>
			<div class='inputWrapper'>
				<input type='password' name='newPasswordConfirm'  ng-model='newPasswordConfirm' placeholder="**********"  equals="{{password.password}}" required/>
			</div>
		</div>
		<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
		<button ng-show="!isPosting" class='preodayButton' ng-click="saveChanges()" type="submit"  translate>SAVE CHANGES</button>
		<button ng-show="!isPosting" class='preodayButton secondary' ng-click="cancel()" translate>CANCEL</button>
		<button ng-show="isPosting" class="secondary" type="button" translate>SAVING...</button>
	</form>

</div>