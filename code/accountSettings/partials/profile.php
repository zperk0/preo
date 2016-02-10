<h3 translate>Profile</h3>
<div class='profileWrapper' ng-cloak>
	<form name='profileForm' novalidate>
		<div class='rowWrapper' ng-class="{'error': profileForm.firstName.$invalid && triedSubmit }">
			<label translate>First Name</label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.firstName }}</span>
			<input type='text' ng-show='isEditing' name='firstName' ng-model='user.firstName' required/>
			<small  ng-show="profileForm.firstName.$invalid && triedSubmit" class="error" translate>Please type your first name.(max 100chars)</small>
			</div>

		</div>
		<div class='rowWrapper' ng-class="{'error': profileForm.lastName.$invalid && triedSubmit }">
			<label translate>Last Name</label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.lastName }}</span>
				<input type='text' name='lastName'   ng-show='isEditing' ng-model='user.lastName' required ng-maxlength="100"/>
				<small  ng-show="profileForm.lastName.$invalid && triedSubmit" class="error" translate>Please type your last name.(max 100chars)</small>
			</div>

		</div>
		<div class='rowWrapper' ng-class="{'error': profileForm.email.$invalid && triedSubmit }">
			<label translate>Email Address</label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.email }}</span>
			<input type='email' name='email'   ng-show='isEditing' ng-model='user.email' required/>
			<small  ng-show="profileForm.email.$invalid && triedSubmit" class="error" translate>Please type a valid email address</small>
			</div>

		</div>
		<div class='rowWrapper' ng-class="{'error': profileForm.accountName.$invalid && triedSubmit }">
			<label translate>Business Name</label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ account.name }}</span>
			<input type='text' name='accountName'   ng-show='isEditing' ng-model='account.name' required ng-maxlength="100"/>
			<small  ng-show="profileForm.accountName.$invalid && triedSubmit" class="error" translate>Please type your account name.(max 100chars)</small>
			</div>

		</div>

		<div class='rowWrapper'>
			<label translate>Password</label>
			<div class='inputWrapper'>*********
				<button class='preodayButton secondary' ng-click="changePassword()" translate>CHANGE PASSWORD</button>
			</div>
			<div class='clearfix'></div>
		</div>
		<button ng-show="!isEditing" class='preodayButton' ng-click="toggleEditUserDetails()" type="button" translate>CHANGE DETAILS</button>
		<button ng-show="!isPosting && isEditing " class='preodayButton' ng-click="saveChanges()" type="submit" translate>SAVE</button>
		<button ng-show="isPosting" class="secondary" type="button" translate>SAVING...</button>
		<button ng-show="isEditing" class='preodayButton secondary' ng-click="toggleEditUserDetails(true)" translate>CANCEL</button>
 </form>
</div>