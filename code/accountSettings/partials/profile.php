<h3><?echo _("Profile")?></h3>
<div class='profileWrapper'>
	
		<div class='rowWrapper'>
			<label><? echo _("First Name")?></label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.firstName }}</span> 
			<input type='text' ng-show='isEditing' ng-model='user.firstName'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label><?echo _("Last Name")?></label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.lastName }}</span>
				<input type='text'   ng-show='isEditing' ng-model='user.lastName'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label><?echo _("Email Address")?></label>
			<div class='inputWrapper'>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.email }}</span>
			<input type='text'   ng-show='isEditing' ng-model='user.email'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label><?echo _("Business Name")?></label>
			<div class='inputWrapper'> 
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ account.name }}</span>
			<input type='text'   ng-show='isEditing' ng-model='account.name'/>
			</div>
			
		</div>

		<div class='rowWrapper'>
			<label><?echo _("Password")?></label>
			<div class='inputWrapper'>*********
			<button class='preodayButton secondary' ng-click="changePassword()"><?echo _("CHANGE PASSWORD");?></button>
			</div>
			
		</div>

		<button class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE CHANGES");?></button>

</div>