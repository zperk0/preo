<?if(!isset($_SESSION['user_edit_on'])) $_SESSION['user_edit_on']=0;?>
<?if(!isset($_SESSION['invite_user_edit_on'])) $_SESSION['invite_user_edit_on']=0;?>
<form id="userConfigForm" method="POST" data-abide>
	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h1><?echo _("User management");?></h1>

			<!-- Hidden inputs here keep count of users -->
			<input type="hidden" id="userCount"		name="userCount" 		value="<?if($_SESSION['user_edit_on']) echo $userCount; else echo "0";?>"/>
			<input type="hidden" id="userCountAct" 	name="userCountAct"		value="<?if($_SESSION['user_edit_on']) echo $userCount; else echo "0";?>"/>

			<div class="row">
				<div class="large-12 columns">
					<button id="add_user" 	type="button" class="newUser" title="<?echo _("Add a new user");?>"><i class="pd-add"></i></button> <?echo _("Add a new user");?>
				</div>
			</div>
			
			<table class="headerTable">
				<thead>
					<tr>
						<th class="userTDName"><? echo _("Name");?></th>
						<th class="userTDEmail"><? echo _("Email");?></th>
						<th class="userTDRole"><? echo _("Role");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This decides the level of access of your users.");?>"></i></th>
						<th class="userTDTools"><? echo _("Tools");?></th>
					</tr>
				</thead>
			</table>

			<div class="row"> <!-- DUMMY -->
				<div class="large-12 columns">
					<table class="userTable hide" id="user0" style="display:none;">
						<tbody>
							<tr class="userEdit userTR">
								<td class="userTDName">
									<input type="hidden" name="uID[0]" value="u0" />
									<input type="text" name="uName[0]" class="userField noEnterSubmit" value="<?echo _("Add a user name");?>"  pattern="^.{0,199}$"/>
									<small class="error"><?echo _("Please type a user name (max 200chars)");?></small>
								</td>
								<td class="userTDEmail">
									<input type="email" name="uEmail[0]" class="userField noEnterSubmit" placeholder="<?echo _("Add an email");?>"/>
									<small class="error"><?echo _("Please type an email");?></small>
								</td>
								<td class="userTDRole">
									<select name="uRole[0]" class="userField noEnterSubmit inline" style="display:none;" /> <!-- Dummy does not have userMenuSingleSelect -->
										<option value="STAFF" title="<?echo _("Staff: can only read account")?>"><?echo _("Staff")?></option>
										<!--<option value="ADMIN" title="<?echo _("Admin: can read/write account but cannot close it down")?>"><?echo _("Admin")?></option>-->
										<option value="OWNER" title="<?echo _("Owner: can read/write account and close it down")?>"><?echo _("Owner")?></option>
									</select>
								</td>
								<td class="userTDTools">
									<button type="button" class="userTableButtons userSave"					title="<?echo _("Collapse");?>"					><i class="pd-up"></i></button>
									<button type="button" class="userTableButtons userTDEdit hide" 			title="<?echo _("Edit");?>"					><i class="pd-edit"></i></button>
									<!--<button type="button" class="userTableButtons userDuplicate" 			title="<?echo _("Duplicate");?>" id="dup0"	><i class="pd-copy"></i></button>-->
									<button type="button" class="userTableButtons secondary userDelete" 	title="<?echo _("Delete");?>"				><i class="pd-delete"></i></button>
								</td>
							</tr>
							<tr class="userEdit userTR userPassTR">
								<td class="userTDPassword">
									<label><?echo _("Password");?></label>
									<input type="password" id="uPassword[0]" name="uPassword[0]" class="userField noEnterSubmit" placeholder="<?echo _("Assign a password");?>"/>
									<small class="error"><?echo _("Provide a Password");?></small>
								</td>
								<td class="userTDPassword">
									<label><?echo _("Confirm Password");?></label>
									<input type="password" name="uPasswordConf[0]" class="userField noEnterSubmit" data-equalTo="uPassword[0]" placeholder="<?echo _("Confirm password");?>"/>
									<small class="error"><?echo _("Passwords don't match");?></small>
								</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
	<?if($_SESSION['user_edit_on']){
		foreach($account['users'] as $uKey=>$user){
			if($_SESSION['user_id'] == $user['id']) continue;
		//again remember its all 1-indexed thats why we add +1 to the key
		?>
			<table class="userTable" id="user<?echo ($uKey+1)?>" style="background:transparent">
				<tbody>
					<tr class="savedInput userTR">
						<td class="userTDName">
							<input type="hidden" name="uID[<?echo ($uKey+1);?>]" value="<?echo $user['id'];?>" />
							<input type="text" name="uName[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" value="<?echo htmlentities($user['firstName'] . $user['lastName'], ENT_QUOTES);?>" required readonly="readonly"  pattern="^.{0,199}$"/>
							<small class="error"><?echo _("Please type a user name (max 200chars)");?></small>
						</td>
						<td class="userTDEmail">
							<input type="email" name="uEmail[<?echo ($uKey+1);?>]" class="userField noEnterSubmit preSaved" value="<?echo $user['email'];?>" placeholder="<?echo _("Add an email");?>" readonly="readonly" required/>
							<small class="error"><?echo _("Please type an email");?></small>
						</td>
						<td class="userTDRole">
							<select name="uRole[<?echo ($uKey+1);?>]" class="userMenuSingleSelect userField noEnterSubmit" style="display:none" readonly="readonly"/>
								<option value="STAFF" 	<?if($user['role']=='STAFF'){?>selected="selected"<?}?> title="<?echo _("Staff: can only read account")?>"><?echo _("Staff")?></option>
								<!--<option value="ADMIN" 	<?if($user['role']=='ADMIN'){?>selected="selected"<?}?> title="<?echo _("Admin: can read/write account but cannot close it down")?>"><?echo _("Admin")?></option>-->
								<option value="OWNER" 	<?if($user['role']=='OWNER'){?>selected="selected"<?}?> title="<?echo _("Owner: can read/write account and close it down")?>"><?echo _("Owner")?></option>
							</select>
						</td>
						<td class="userTDTools">
							<button type="button" class="userTableButtons userSave hide" title="<?echo _("Collapse");?>"><i class="pd-up"></i></button>
							<button type="button" class="userTableButtons userTDEdit"	title="<?echo _("Edit");?>"><i class="pd-edit"></i></button>
							<!--<button type="button" class="userTableButtons userDuplicate"	title="<?echo _("Duplicate");?>" id="dup<?echo ($uKey+1);?>"><i class="pd-copy"></i></button>-->
							<button type="button" class="userTableButtons secondary userDelete <?if($_SESSION['user_id'] == $user['id']) echo 'hide';?>" title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
						</td>
					</tr>
				</tbody>
			</table>
		<?
			$uKey++;
		}
	}?>
		<div class="hide firstUserDiv"></div> <!-- Dummy hook -->



	</div>

	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h1><?echo _("Invited users");?></h1>

			<input type="hidden" id="inviteUserCount"		name="inviteUserCount" 		value="<?if($_SESSION['invite_user_edit_on']) echo $inviteUserCount; else echo "0";?>"/>
			<input type="hidden" id="inviteUserCountAct" 	name="inviteUserCountAct"		value="<?if($_SESSION['invite_user_edit_on']) echo $inviteUserCount; else echo "0";?>"/>			

			<div class="row">
				<div class="large-12 columns">
					<button id="invite_user" 	type="button" class="inviteUser" title="<?echo _("Invite new user");?>"><i class="pd-add"></i></button> <?echo _("Invite new user");?>
				</div>
			</div>
			
			<table class="headerTable">
				<thead>
					<tr>
						<th class="userTDName"><? echo _("Name");?></th>
						<th class="userTDEmail"><? echo _("Email");?></th>
						<th class="userTDRole"><? echo _("Role");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This decides the level of access of your users.");?>"></i></th>
						<th class="userTDTools"><? echo _("Tools");?></th>
					</tr>
				</thead>
			</table>

			<div class="row"> <!-- DUMMY -->
				<div class="large-12 columns">
					<table class="userTable hide inviteUserTable" id="inviteUser0" style="display:none;">
						<tbody>
							<tr class="userEdit inviteUserTR">
								<td class="userTDName">
									<input type="hidden" name="iuID[0]" value="u0" />
									<input type="text" name="iuName[0]" class="userField noEnterSubmit" placeholder="<?echo _("Add a user name");?>"  pattern="^.{0,199}$"/>
									<small class="error"><?echo _("Please type a user name (max 200chars)");?></small>
								</td>
								<td class="userTDEmail">
									<input type="email" name="iuEmail[0]" class="userField noEnterSubmit" placeholder="<?echo _("Add an email");?>"/>
									<small class="error"><?echo _("Please type an email");?></small>
								</td>
								<td class="userTDRole">
									<select name="iuRole[0]" class="userField noEnterSubmit inline" style="display:none;" /> <!-- Dummy does not have userMenuSingleSelect -->
										<option value="STAFF" title="<?echo _("Staff: can only read account")?>"><?echo _("Staff")?></option>
										<option value="OWNER" title="<?echo _("Owner: can read/write account and close it down")?>"><?echo _("Owner")?></option>
									</select>
								</td>
								<td class="userTDTools">
									<button type="button" class="userTableButtons secondary inviteUserDelete" 	title="<?echo _("Delete");?>"				><i class="pd-delete"></i></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> <!-- End row new user -->						
		</div>
	</div>	

	<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
	<?if($_SESSION['invite_user_edit_on']){
		foreach($inviteUsers as $uKey=>$user){
		//again remember its all 1-indexed thats why we add +1 to the key
		?>
			<table class="userTable " id="inviteUser<?echo ($uKey+1)?>" style="background:transparent">
				<tbody>
					<tr class="savedInput inviteUserTR">
						<td class="userTDName">
							<input type="hidden" name="iuID[<?echo ($uKey+1);?>]" value="<?echo $user['id'];?>" />
							<input type="text" name="iuName[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" value="<?echo htmlentities($user['name'], ENT_QUOTES);?>" required readonly="readonly"  pattern="^.{0,199}$"/>
							<small class="error"><?echo _("Please type a user name (max 200chars)");?></small>
						</td>
						<td class="userTDEmail">
							<input type="email" name="iuEmail[<?echo ($uKey+1);?>]" class="userField noEnterSubmit preSaved" value="<?echo $user['email'];?>" placeholder="<?echo _("Add an email");?>" readonly="readonly" required/>
							<small class="error"><?echo _("Please type an email");?></small>
						</td>
						<td class="userTDRole">
							<select name="iuRole[<?echo ($uKey+1);?>]" class="userMenuSingleSelect userField noEnterSubmit" style="display:none" readonly="readonly"/>
								<option value="STAFF" 	<?if($user['role']=='STAFF'){?>selected="selected"<?}?> title="<?echo _("Staff: can only read account")?>"><?echo _("Staff")?></option>
								<!--<option value="ADMIN" 	<?if($user['role']=='ADMIN'){?>selected="selected"<?}?> title="<?echo _("Admin: can read/write account but cannot close it down")?>"><?echo _("Admin")?></option>-->
								<option value="OWNER" 	<?if($user['role']=='OWNER'){?>selected="selected"<?}?> title="<?echo _("Owner: can read/write account and close it down")?>"><?echo _("Owner")?></option>
							</select>
						</td>
						<td class="userTDTools">
							<button type="button" class="userTableButtons secondary inviteUserDelete <?if($_SESSION['user_id'] == $user['id']) echo 'hide';?>" title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
						</td>
					</tr>
				</tbody>
			</table>
		<?
			$uKey++;
		}
	}?>
		<div class="hide firstInviteUserDiv"></div> <!-- Dummy hook -->	
		</div>	
	<div class="row">
		<div class="small-12 large-4 columns">
			<button id="userSubButton" type="submit"><?echo _("SAVE CHANGES");?></button>
			<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
		</div>
	</div>
</form>