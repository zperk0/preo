<?if(!isset($_SESSION['outlet_edit_on'])) $_SESSION['outlet_edit_on']=0;?>
<form id="outletConfigForm" method="POST" data-abide>
	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h1><?echo _("Outlets");?></h1>

			<!-- Hidden inputs here keep count of outlets -->
			<input type="hidden" id="outletCount"		name="outletCount" 		value="<?if($_SESSION['outlet_edit_on']) echo $outletCount; else echo "0";?>"/>
			<input type="hidden" id="outletCountAct" 	name="outletCountAct"	value="<?if($_SESSION['outlet_edit_on']) echo $outletCount; else echo "0";?>"/>

			<div class="row">
				<div class="large-12 columns">
					<button id="add_outlet" 	type="button" class="newOutlet" 		title="<?echo _("Add a new Outlet");?>"	><i class="fi-plus"></i></button> <?echo _("Add a new Outlet");?>
					<button id="new_menu"		type="button" class="inline newMenu"	title="<?echo _("Create a new menu");?>"><i class="fi-plus"></i></button> <?echo _("Create a new menu");?>
				</div>
			</div>

			<div class="row"> <!-- DUMMY -->
				<div class="large-12 columns">
					<table class="outletTable hide" id="outlet0" style="display:none;">
						<tbody>
							<tr class="outletEdit outletTR">
								<td class="outletTDName">
									<input type="hidden" name="oID[0]" value="" />
									<input type="text" name="oName[0]" class="outletField noEnterSubmit" value="<?echo _("Add an outlet name");?>" required/>
									<small class="error"><?echo _("Please type an outlet name");?></small>
								</td>
								<td class="outletTDMenu">
									<select name="oMenu[0][]" class="outletField noEnterSubmit inline" style="display:none;" multiple="multiple" required/>  <!-- Dummy does not have outletMenuMultiSelect -->
										<?foreach($menus as $mKey=>$menu){?>
											<option value="<?echo $menu['id'];?>" <?if($mKey == 0) echo 'selected="selected"';?>><?echo $menu['name'];?></option>
										<?}?>
									</select>
									<small class="error"><?echo _("Please choose a menu");?></small>
								</td>
								<td class="outletTDTools">
									<button type="button" class="outletTableButtons outletSave"					title="<?echo _("Lock");?>"		><i class="icon-lock"></i></button>
									<button type="button" class="outletTableButtons outletTDEdit hide" 			title="<?echo _("Edit");?>"		><i class="fi-pencil"></i></button>
									<button type="button" class="outletTableButtons secondary outletDelete" 	title="<?echo _("Delete");?>"	><i class="fi-x"></i></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
	<?if($_SESSION['outlet_edit_on']){ //again remember its all 1-indexed thats why we add +1 to the key
		foreach($outlets as $oKey=>$outlet){
			//get outlet-menus
			$outletMenus = getOutletMenus($outlet['id']);
		?>
			<table class="outletTable" id="outlet<?echo ($oKey+1)?>" style="background:transparent">
				<tbody>
					<tr class="savedInput outletTR">
						<td class="outletTDName">
							<input type="hidden" name="oID[<?echo ($oKey+1);?>]" value="<?echo $outlet['id'];?>" />
							<input type="text" name="oName[<?echo ($oKey+1);?>]" class="outletField noEnterSubmit" value="<?echo $outlet['name'];?>" required readonly="readonly"/>
							<small class="error"><?echo _("Please type an outlet name");?></small>
						</td>
						<td class="outletTDMenu">
							<select name="oMenu[<?echo ($oKey+1);?>][]" class="outletMenuMultiSelect outletField noEnterSubmit small" readonly="readonly" style="display:none" multiple="multiple" required/>
								<?foreach($menus as $mKey=>$menu){?>
									<option value="<?echo $menu['id'];?>" <?if(searchForId($menu['id'],$outletMenus)) echo 'selected="selected"';?>><?echo $menu['name'];?></option>
								<?}?>
							</select>
							<small class="error"><?echo _("Please choose a menu");?></small>
						</td>
						<td class="outletTDTools">
							<button type="button" class="outletTableButtons outletSave hide" 			title="<?echo _("Lock");?>"		><i class="icon-lock"></i></button>
							<button type="button" class="outletTableButtons outletTDEdit" 				title="<?echo _("Edit");?>"		><i class="fi-pencil"></i></button>
							<button type="button" class="outletTableButtons secondary outletDelete" 	title="<?echo _("Delete");?>"	><i class="fi-x"></i></button>
						</td>
					</tr>
				</tbody>
			</table>
		<?
			$oKey++;
		}
	}?>
		<div class="hide firstOutletDiv"></div> <!-- Dummy hook -->
	</div>
			
	<div class="row">
		<div class="small-12 large-4 columns">
			<button type="submit"><?echo _("SAVE CHANGES");?></button>
		</div>
	</div>
</form>