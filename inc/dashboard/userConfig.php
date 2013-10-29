<?if(!isset($_SESSION['user_edit_on'])) $_SESSION['user_edit_on']=0;?>
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
					<button id="add_user" 	type="button" class="newUser" title="<?echo _("Add a new user");?>"><i class="fi-plus"></i></button> <?echo _("Add a new user");?>
				</div>
			</div>

			<div class="row"> <!-- DUMMY -->
				<div class="large-12 columns">
					<table class="userTable hide" id="user0" style="display:none;">
						<tbody>
							<tr class="userEdit userTR">
								<td class="userTDName">
									<input type="hidden" name="uID[0]" value="" />
									<input type="text" name="uName[0]" class="userField noEnterSubmit" value="<?echo _("Add a user name");?>" required/>
									<small class="error"><?echo _("Please type a user name");?></small>
								</td>
								<td class="userTDEmail">
									<input type="text" name="uEmail[0]" class="userField noEnterSubmit" placeholder="<?echo _("Add an email");?>" required/>
									<small class="error"><?echo _("Please type an email");?></small>
								</td>
								<td class="userTDPassword">
									<input type="password" name="uPassword[0]" class="userField noEnterSubmit" placeholder="<?echo _("Assign a password");?>"/>
									</td>
								<td class="userTDRole">
									<select name="uRole[0]" class="userField noEnterSubmit inline"/>
										<option value="ADMIN"><?echo _("Admin")?></option>
										<option value="STAFF"><?echo _("Staff")?></option>
										<option value="OWNER"><?echo _("Owner")?></option>
									</select>
								</td>
								<td class="userTDTools">
									<button type="button" class="userTableButtons userSave"					title="<?echo _("Lock");?>"					><i class="icon-lock"></i></button>
									<button type="button" class="userTableButtons userTDEdit hide" 			title="<?echo _("Edit");?>"					><i class="fi-pencil"></i></button>
									<!--<button type="button" class="userTableButtons userDuplicate" 			title="<?echo _("Duplicate");?>" id="dup0"	><i class="icon-copy"></i></button>-->
									<button type="button" class="userTableButtons secondary userDelete" 	title="<?echo _("Delete");?>"				><i class="fi-x"></i></button>
								</td>
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
		//again remember its all 1-indexed thats why we add +1 to the key
		?>
			<table class="userTable" id="user<?echo ($uKey+1)?>" style="background:#E9E9E9">
				<tbody>
					<tr class="savedInput userTR">
						<td class="userTDName">
							<input type="hidden" name="uID[<?echo ($uKey+1);?>]" value="<?echo $user['id'];?>" />
							<input type="text" name="uName[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" value="<?echo $user['name'];?>" required readonly="readonly"/>
							<small class="error"><?echo _("Please type a user name");?></small>
						</td>
						<td class="userTDEmail">
							<input type="text" name="uEmail[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" value="<?echo $user['email'];?>" placeholder="<?echo _("Add an email");?>" readonly="readonly" required/>
							<small class="error"><?echo _("Please type an email");?></small>
						</td>
						<td class="userTDPassword">
							<input type="password" name="uPassword[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" placeholder="<?echo _("Change a password");?>" readonly="readonly"/>
						</td>
						<td class="userTDRole">
							<select name="uRole[<?echo ($uKey+1);?>]" class="userField noEnterSubmit" readonly="readonly"/>
								<option value="ADMIN" 		<?if($user['role']=='ADMIN'){	?>selected="selected"<?}?>><?echo _("Admin")?></option>
								<option value="STAFF" 		<?if($user['role']=='READONLY'){?>selected="selected"<?}?>><?echo _("Staff")?></option>
								<option value="OWNER" 		<?if($user['role']=='OWNER'){	?>selected="selected"<?}?>><?echo _("Owner")?></option>
							</select>
						</td>
						<td class="userTDTools">
							<button type="button" class="userTableButtons userSave hide" 			title="<?echo _("Lock");?>"										><i class="icon-lock"></i></button>
							<button type="button" class="userTableButtons userTDEdit" 				title="<?echo _("Edit");?>"										><i class="fi-pencil"></i></button>
							<!--<button type="button" class="userTableButtons userDuplicate" 			title="<?echo _("Duplicate");?>" id="dup<?echo ($uKey+1);?>"	><i class="icon-copy"></i></button>-->
							<button type="button" class="userTableButtons secondary userDelete <?if($_SESSION['user_id'] == $user['id']) echo 'hide';?>" 	title="<?echo _("Delete");?>"									><i class="fi-x"></i></button>
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
		<div class="small-12 large-4 columns">
			<button type="submit"><?echo _("SAVE CHANGES");?></button>
		</div>
	</div>
</form>