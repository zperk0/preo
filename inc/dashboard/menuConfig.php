<?if(!isset($_SESSION['menu_edit_on'])) $_SESSION['menu_edit_on']=0;?>
<form id="menuConfigForm" method="POST" data-abide>
	<div class="row">
		<div class="topSpacer"></div>
		<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/venueSettings.php"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/appSettings1.php"><? echo _("App Styling 1/2");?></a>
			<a href="<?echo $_SESSION['path']?>/appSettings2.php"><? echo _("App Styling 2/2");?></a>
			<a class="current" href="#"><? echo _("Menu Creation");?></a>
		</nav>
		<?}?>
		<div class="large-12 columns">

			<h1><?if(!isset($_SESSION['menu_edit_on'])) echo _("Build your menu"); else echo _("Your menu");?></h1>

			<!-- Hidden inputs here keep count of menu items and options -->
			<input type="hidden" id="sectionCount" 			name="sectionCount"			value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>
			<input type="hidden" id="sectionCountAct" 		name="sectionCountAct"		value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>
			
			<input type="hidden" id="itemCount"				name="itemCount" 			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>
			<input type="hidden" id="itemCountAct" 			name="itemCountAct"			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>
			
			<input type="hidden" id="item0_optionCount" 	name="item0_optionCount"	value="0"/>
			<input type="hidden" id="item0_optionCountAct" 	name="item0_optionCountAct" value="0"/>
			
			<?if($_SESSION['menu_edit_on']) :
				foreach($itemOptionArray as $key=>$itemOption)
				{
					//we have to keep this 1-indexed for consistency
					?>
					<input type="hidden" id="item<?echo ($key+1)?>_optionCount" 	name="item<?echo ($key+1)?>_optionCount"	value="<?echo $itemOption['count'];?>"/>
					<input type="hidden" id="item<?echo ($key+1)?>_optionCountAct" 	name="item<?echo ($key+1)?>_optionCountAct" value="<?echo $itemOption['count'];?>"/>
					<?
				}
			endif; ?>

			<div class="row">
				<input type="text" name="mName" id="mName" class="menuField noEnterSubmit" value="<?if($_SESSION['menu_edit_on']) echo $menu['name'];?>" placeholder="<?echo _("Click to add your menu name");?>" required tabindex=1/>
				<small class="error"><?echo _("Please type a menu name");?></small>
			</div>

			<div class="hide" id="menuSectionRow"> <!-- DUMMY -->
				<div class="row">
					<div class="large-12 columns menuSectionDiv">
						<input type="text" name="mSectionName[]" class="menuField menuSectionField noEnterSubmit" value="<?echo _("Click to add a section name");?>" required/>
						<small class="error"><?echo _("Please type a section name");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<button id="add_section0" 		type="button" class="newItem" 				title="<?echo _("Add an item to this section");?>"><i class="fi-plus"></i></button> <?echo _("Add an item to this section");?>
						<button id="delete_section0" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"><i class="fi-x"></i></button> <?echo _("Delete this section");?>
					</div>
				</div>
			</div>
			
			<div class="hide firstItemDiv"></div> <!-- Dummy hook -->
			
			<table class="menuTable" id="item0" style="display:none;"><!-- DUMMY -->
				<tbody>
					<tr class="menuEdit itemTR">
						<td class="menuTDName">
							<input type="text" name="iName[section0][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an item name");?>" required/>
							<small class="error"><?echo _("Please type an item name");?></small>
						</td>
						<td class="menuTDDesc">
							<input type="text" name="iDesc[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Optional description");?>"/>
							<small class="error"><?echo _("Please type a description");?></small>
						</td>
						<td class="menuTDPrice">
							<input type="text" name="iPrice[section0][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" required/>
							<small class="error"><?echo _("Amount?");?></small>
							</td>
						<td class="menuTDQuant">
							<input type="text" name="iQuan[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Unlimited");?>"/>
						</td>
						<td class="menuTDVisi">
							<div class="switch tiny"> 
								<input name="iVisi[section0][0]" value="0" type="radio">
								<label><?echo _("No");?></label>

								<input name="iVisi[section0][0]" value="1" type="radio" checked>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="menuTDTools">
							<button type="button" class="menuTableButtons itemSave"				title="<?echo _("Lock");?>"							><i class="icon-lock"></i></button>
							<button type="button" class="menuTableButtons itemEdit hide" 		title="<?echo _("Edit");?>"							><i class="fi-pencil"></i></button>
							<button type="button" class="menuTableButtons itemDuplicate" 		title="<?echo _("Duplicate");?>" id="dup_section0"	><i class="icon-copy"></i></button>
							<button type="button" class="menuTableButtons secondary itemDelete" title="<?echo _("Delete");?>"						><i class="fi-x"></i></button>
						</td>
					</tr>
					<tr class="menuEdit subHeaderTR">
						<td class="itemSubheader optionTR"><h6><?echo _("Item options (optional)");?> <button type="button" class="newOpt" title="<?echo _("Add a new option to this item");?>"><i class="fi-plus"></i></button></h6></td>
					</tr>
					<tr class="menuEdit optionTR hide" style="display:none;">
						<td class="menuTDName">
							<input type="text" name="oName[item0][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required/>
							<small class="error"><?echo _("Please type an option name");?></small>
						</td>
						<td class="menuTDDesc">
						</td>
						<td class="menuTDPrice">
							<input type="text" name="oPrice[item0][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" required/>
							<small class="error"><?echo _("Amount?");?></small>
							</td>
						<td class="menuTDQuant">
						</td>
						<td class="menuTDVisi">
							<div class="switch tiny"> 
								<input name="oVisi[item0][0]" value="0" type="radio">
								<label><?echo _("No");?></label>

								<input name="oVisi[item0][0]" value="1" type="radio" checked>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="menuTDTools">
							<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="icon-copy"></i></button>
							<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="fi-x"></i></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="dynamicDataTable"> <!-- This is where the dynamic data goes into -->
	
	<?if($_SESSION['menu_edit_on']){
		$iKey=0; //item number are continuous across sections so we can't use $key in foreach($array as $key=>$var)
		foreach($menu['sections'] as $sKey=>$section){ 
		//again remember its all 1-indexed thats why we add +1 to the key
		?>
			<div id="menuSectionRow">
				<div class="row">
					<div class="large-12 columns menuSectionDiv">
						<input type="text" name="mSectionName[]" class="menuField menuSectionField noEnterSubmit section<?echo ($sKey+1);?>" value="<?echo $section['name'];?>" required/>
						<small class="error"><?echo _("Please type a section name");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<button id="add_section<?echo ($sKey+1);?>" 	type="button" class="newItem" 				title="<?echo _("Add an item to this section");?>"><i class="fi-plus"></i></button> <?echo _("Add an item to this section");?>
						<button id="delete_section<?echo ($sKey+1);?>" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"><i class="fi-x"></i></button> <?echo _("Delete this section");?>
					</div>
				</div>
			</div>
			<?foreach($section['items'] as $item){ 
			//again remember its all 1-indexed thats why we add +1 to the key
			?>
				<table class="menuTable tablesection<?echo ($sKey+1);?>" id="item<?echo ($iKey+1)?>" style="background:transparent">
					<tbody>
						<tr class="savedInput itemTR">
							<td class="menuTDName">
								<input type="text" name="iName[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?echo $item['name'];?>" required readonly="readonly"/>
								<small class="error"><?echo _("Please type an item name");?></small>
							</td>
							<td class="menuTDDesc">
								<input type="text" name="iDesc[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?if(!empty($item['description'])) echo $item['description'];?>" placeholder="<?echo _("Optional description");?>"  readonly="readonly"/>
								<small class="error"><?echo _("Please type a description");?></small>
							</td>
							<td class="menuTDPrice">
								<input type="text" name="iPrice[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?echo number_format($item['price'],2,'.','');?>" required  readonly="readonly"/>
								<small class="error"><?echo _("Amount?");?></small>
								</td>
							<td class="menuTDQuant">
								<input type="text" name="iQuan[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" <?if($item['quantity']){?>value="<?echo $item['quantity']?>"<?}else{?>placeholder="<?echo _("Unlimited");}?>"  readonly="readonly"/>
							</td>
							<td class="menuTDVisi">
								<div class="switch tiny"> 
									<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="0" type="radio" <?if(!$item['visible']){?>checked<?}?>>
									<label><?echo _("No");?></label>

									<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="1" type="radio" <?if($item['visible']){?>checked<?}?>>
									<label><?echo _("Yes");?></label>

									<span></span>
								</div>
							</td>
							<td class="menuTDTools">
								<button type="button" class="menuTableButtons itemSave hide"			title="<?echo _("Lock");?>"							><i class="icon-lock"></i></button>
								<button type="button" class="menuTableButtons itemEdit" 				title="<?echo _("Edit");?>"							><i class="fi-pencil"></i></button>
								<button type="button" class="menuTableButtons itemDuplicate" 			title="<?echo _("Duplicate");?>" id="dup<?echo ($iKey+1);?>_section<?echo ($sKey+1);?>"	><i class="icon-copy"></i></button>
								<button type="button" class="menuTableButtons secondary itemDelete" 	title="<?echo _("Delete");?>"						><i class="fi-x"></i></button>
							</td>
						</tr>
						<tr class="menuEdit subHeaderTR">
							<td class="itemSubheader optionTR hide"><h6><?echo _("Item options (optional)");?> <button type="button" class="newOpt" title="<?echo _("Add a new option to this item");?>"><i class="fi-plus"></i></button></h6></td>
						</tr>
						<tr class="menuEdit hide" style="display:none;"> <!-- This dummy is required! -->
							<td class="menuTDName">
								<input type="text" name="oName[item<?echo ($iKey+1);?>][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required/>
								<small class="error"><?echo _("Please type an option name");?></small>
							</td>
							<td class="menuTDDesc">
							</td>
							<td class="menuTDPrice">
								<input type="text" name="oPrice[item<?echo ($iKey+1);?>][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" required/>
								<small class="error"><?echo _("Amount?");?></small>
								</td>
							<td class="menuTDQuant">
							</td>
							<td class="menuTDVisi">
								<div class="switch tiny"> 
									<input name="oVisi[item<?echo ($iKey+1);?>][0]" value="0" type="radio">
									<label><?echo _("No");?></label>

									<input name="oVisi[item<?echo ($iKey+1);?>][0]" value="1" type="radio" checked>
									<label><?echo _("Yes");?></label>

									<span></span>
								</div>
							</td>
							<td class="menuTDTools">
								<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="icon-copy"></i></button>
								<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="fi-x"></i></button>
							</td>
						</tr>
						<?foreach($item['modifiers'][0]['items'] as $oKey=>$option){ 
						//again remember its all 1-indexed thats why we add +1 to the key
						?>
							<tr class="optionTR savedInput" style="display:none;">
								<td class="menuTDName">
									<input type="text" name="oName[item<?echo ($iKey+1);?>][<?echo ($oKey+1);?>]" class="menuField noEnterSubmit" value="<?echo $option['name'];?>" required  readonly="readonly"/>
									<small class="error"><?echo _("Please type an option name");?></small>
								</td>
								<td class="menuTDDesc">
								</td>
								<td class="menuTDPrice">
									<input type="text" name="oPrice[item<?echo ($iKey+1);?>][<?echo ($oKey+1);?>]" class="menuField noEnterSubmit" value="<?echo number_format($option['price'],2,'.','');?>" required  readonly="readonly"/>
									<small class="error"><?echo _("Amount?");?></small>
									</td>
								<td class="menuTDQuant">
								</td>
								<td class="menuTDVisi">
									<div class="switch tiny"> 
										<input name="oVisi[item<?echo ($iKey+1);?>][<?echo ($oKey+1);?>]" value="0" type="radio" <?if(!$option['visible']){?>checked<?}?>>
										<label><?echo _("No");?></label>

										<input name="oVisi[item<?echo ($iKey+1);?>][<?echo ($oKey+1);?>]" value="1" type="radio" <?if($option['visible']){?>checked<?}?>>
										<label><?echo _("Yes");?></label>

										<span></span>
									</div>
								</td>
								<td class="menuTDTools">
									<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="icon-copy"></i></button>
									<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="fi-x"></i></button>
								</td>
							</tr>
						<?
						}?>
					</tbody>
				</table>
			<?
				$iKey++;
			}
			?>
			<div class="hide firstItemDivsection<?echo ($sKey+1);?>"></div>
		<?
		}
	}?>
		<div class="row">
			<button type="button" class="newSection" title="<?echo _("Add a new section");?>"><i class="fi-plus"></i></button> <?echo _("Add a new section");?>
		</div>
	</div>
	
	<div class="row">
		<div class="small-12 large-4 columns">
			<button type="submit"><?echo _("SAVE MENU");?></button>
		</div>
	</div>
</form>

<?if(!isset($_SESSION['menu_edit_on']) || !$_SESSION['menu_edit_on']){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','240%');
	$('.progressIndicator').attr('title', "55% done, now for the fun bit!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>