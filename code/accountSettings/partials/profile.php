<h3>Profile</h3>
<div class='profileWrapper'>
	
		<div class='rowWrapper'>
			<label>First Name</label>
			<div >
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.firstName }}</span> 
			<input type='text' ng-show='isEditing' ng-model='user.firstName'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label>Last Name</label>
			<div>
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.lastName }}</span>
				<input type='text'   ng-show='isEditing' ng-model='user.lastName'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label>Email Address</label>
			<div >
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ user.email }}</span>
			<input type='text'   ng-show='isEditing' ng-model='user.email'/>
			</div>
			
		</div>
		<div class='rowWrapper'>
			<label>Business Name</label>
			<div > 
			<span ng-click="toggleEditUserDetails()" ng-show='!isEditing'>{{ account.name }}</span>
			<input type='text'   ng-show='isEditing' ng-model='account.name'/>
			</div>
			
		</div>

		<div class='rowWrapper'>
			<label>Password</label>
			<div>*********
			<button class='preodayButton secondary'><?echo _("CHANGE PASSWORD");?></button>
			</div>
			
		</div>

		<button class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE CHANGES");?></button>

</div>