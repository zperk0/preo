<?if(!isset($_SESSION['md_edit_on'])) $_SESSION['md_edit_on']=0;?>
<form id="mealDealConfigForm" method="POST" data-abide >
	<div class="row">
		<div class="topSpacer"></div>
		<h1 class="alignHeader"><?echo _("Meal Deals");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This is where you can combine separate food items into one meal combination, e.g. sandwich, crisps and a drink");?>"></i></h1>
		<div class="large-12 columns">
			<div class="row">
				<?if(!$_SESSION['noItemsFlag']){?><button type="button" class="newMD" title="<?echo _("Add a new Meal Deal");?>"><i class="pd-add"></i></button> <?echo _("Add a new Meal Deal"); }?>
			</div>
			<input type="hidden" id="mdCount" 			name="mdCount"			value="<?echo $mdCount;?>"/>
			<input type="hidden" id="mdCountAct" 		name="mdCountAct"		value="<?echo $mdCount;?>"/>
			
			<input type="hidden" id="md0_secCount" 		name="md0_secCount"		value="0"/>
			<input type="hidden" id="md0_secCountAct" 	name="md0_secCountAct"	value="0"/>
			
			<?if($_SESSION['md_edit_on']){
				foreach($md as $key => $mealDeal){
					$mdSecCount = count($mealDeal['sections']);
				?>
					<input type="hidden" id="md<?echo $key+1;?>_secCount" 		name="md<?echo $key+1;?>_secCount"		value="<?echo $mdSecCount;?>"/>
					<input type="hidden" id="md<?echo $key+1;?>_secCountAct" 	name="md<?echo $key+1;?>_secCountAct"	value="<?echo $mdSecCount;?>"/>
				<?
				}
			}?>
			
			<div class="row hasTableHeader">
				<table class="headerTable">
					<thead>
						<tr>
							<th class="mdTDName"><? echo _("Name");?></th>
							<th class="mdTDSec"><? echo _("Section");?> &nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Which menu section does this meal deal belong in?");?>"></i></th>
							<th class="mdTDTPrice hide"><? echo _("Total Price (&pound;)");?></th>
							<th class="mdTDPrice"><? echo _("Discount Price (&pound;)");?></th>
							<th class="mdTDVisi hide"><? echo _("Visible?");?></th>
							<th class="mdTDTools"><? echo _("Tools");?></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<div class="dynamicDataTable">
		<table class="hide"></table>
	<?php 
	if($_SESSION['md_edit_on']){
		foreach($md as $key => $mealDeal){ /*1-index so key+1*/?>
		<table class="mdTable" id="md<?echo $key+1;?>" style="background:transparent;">
			<tbody>
				<tr class="savedInput mdTR">
					<td class="mdTDName">
						<input type="hidden" name="mdID[<?echo $key+1;?>]" value="<?echo $mealDeal['id']?>"/>
						<input type="text" name="mdName[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo $mealDeal['name'];?>" required readonly="readonly"/>
						<small class="error"><?echo _("Please type an item name");?></small>
					</td>
					<td class="mdTDSec">
						<select name="mdSecID[<?echo $key+1;?>]" class="mdField noEnterSubmit inline mdSecSingleSelect" > <!-- Dummy does not have mdSecSingleSelect -->
							<?foreach($mdSections as $mdSection){?>
								<option value="<?echo $mdSection['id']?>" <?if($mealDeal['sectionID'] == $mdSection['id']){?>selected="selected"<?}?>><?echo $mdSection['name']?></option>
							<?}?>
						</select>
						<small class="error"><?echo _("Please choose a section");?></small>
					</td>
					<td class="mdTDTPrice hide">
						<input type="text" name="mdTPrice[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>" readonly="readonly"/>
					</td>
					<td class="mdTDPrice">
						<input type="text" name="mdPrice[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo $mealDeal['price'];?>" required readonly="readonly" pattern="^([0-9]+)(\.[0-9]{1,2})?$"/>
						<small class="error"><?echo _("Amount?");?></small>
						</td>
					<td class="mdTDVisi hide">
						<div class="switch tiny"> 
							<input name="mdVisi[<?echo $key+1;?>]" value="0" class="hide" type="radio" <?if(!$mealDeal['visible']){?>checked<?}?>>
							<label><?echo _("No");?></label>

							<input name="mdVisi[<?echo $key+1;?>]" value="1" class="hide"  type="radio" <?if($mealDeal['visible']){?>checked<?}?>>
							<label><?echo _("Yes");?></label>

							<span></span>
						</div>
					</td>
					<td class="mdTDTools">
						<button type="button" class="mdTableButtons mdSave hide"		title="<?echo _("Collapse");?>"		><i class="pd-up"></i></button>
						<button type="button" class="mdTableButtons mdTDEdit"	 		title="<?echo _("Edit");?>"		><i class="pd-edit"></i></button>
						<button type="button" class="mdTableButtons secondary mdDelete" title="<?echo _("Delete");?>"	><i class="pd-delete"></i></button>
					</td>
				</tr>
				<?foreach($mealDeal['sections'] as $sKey => $mdS){ /*1-index so key+1*/?>
					<tr class="savedInput subHeaderTR" style="display:none;">
						<td class="mdSubheader optionTR"><h6><button type="button" class="mdSectionDelete secondary"><i class="pd-delete"></i></button> <?echo _("Delete this section");?></h6></td>
						<td class="modifierRow hide">
							<input type="text" name="iMD[<?echo $key+1;?>][s<?echo $sKey+1?>]" class="mdField noEnterSubmit hide" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" placeholder="<?echo _("Type or pick a selection title");?>" value="<?echo $mdS['name'];?>"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Choose a main, Choose a side, Choose a drink, etc");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
							<small class="error smallerror"><?echo _("Please type or pick a title");?></small>
						</td>
						<td class="modifierRow hide" colspan="3">
							<select class="mdField noEnterSubmit inline mdMenuSingleSelect" name="iMDType[<?echo $key+1;?>][s<?echo $sKey+1?>]" required> <!-- Dummy does not have mdMenuSingleSelect -->
								<option><?echo _("Choose a menu section");?></option>
								<?foreach($mdSections as $mdSection){?>
									<option value="<?echo $mdSection['id']?>"><?echo $mdSection['name']?></option>
								<?}?>
								<option value="all"><?echo _('All sections');?></option>
							</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Pick a menu section from where you'd like to import items.");?>"></i>
							<small class="error"><?echo _("Please choose a section");?></small>
						</td>
					</tr>
					<tr class="savedInput optionTR"  style="display:none;">
						<td class="mdTDIName" colspan="5">
							<input type="hidden" name="mdItems[<?echo $key+1;?>][s<?echo $sKey+1?>]" value=""/>
							<?if(!$_SESSION['noItemsFlag']) 
							{ 
								foreach($mdSections as $mdSection) { 
									foreach($mdSection['items'] as $item) { 
										if($item['mealDeal']) continue;
									?>
										<label class="mdItemName sec<?echo $mdSection['id'];?>" style="display:none;"><span id="<?echo $sKey+1?>_item_<?echo $item['id']?>" data-value="<?echo $item['price'];?>"><?echo "(&pound;".number_format($item['price'],2).") ".$item['name'];?></span> &nbsp; <button type="button" class="newmdItem" title="<?echo _("Add this item to the current Meal Deal");?>"><i class="pd-add"></i></button></label>
								<?  }
								}
							}?>
						</td>
					</tr>
				<?}?>
				<tr class="savedInput subHeaderTR" style="display:none;">
					<td class="mdSubheader optionTR"><h6><button type="button" class="newMDSection"><i class="pd-add"></i></button> <?echo _("Add a selection to this meal deal");?></h6></td>
				</tr>
			</tbody>
		</table>
		<script type="text/javascript">
			$(document).ready(function(){
			<? foreach($mealDeal['sections'] as $sKey => $mdS){
				$secTemp = 0;
				$allFlag = 0;
				foreach($mdS['items'] as $mdiKey => $mdItem){
					$secVal = array_searcher($mdItem,$itemSectionArray);
					if($secTemp == 0)
						$secTemp = $secVal;
					else if($secTemp != $secVal)
						$allFlag = 1;
				?> 
					$(function() { //this inside document.ready makes the following run once DOM is ready (note that is AFTER page load is complete)
						$('#md<?echo $key+1;?>').find('#<?echo $sKey+1;?>_item_<?echo $mdItem?>').closest('.mdItemName').find('.pd-add').trigger('click');
					});
				<?}
				if($allFlag){
					?>$("select[name='iMDType[<?echo $key+1;?>][s<?echo $sKey+1?>]']").val("all");
					  $('#md<?echo $key+1;?>').find("span[id^='<?echo $sKey+1;?>_item_']").parent().show();
					<?
				}else{
					?>$("select[name='iMDType[<?echo $key+1;?>][s<?echo $sKey+1?>]']").val("<?echo $secVal;?>");<?
					foreach($itemSectionArray as $intermediateArray)
					{
						foreach($intermediateArray as $isKey => $isVal)
						{
							if($isKey == $secVal)
							{
								?>$('#md<?echo $key+1;?>').find("span[id='<?echo $sKey+1;?>_item_<?echo $isVal;?>']").parent().show();<?
							}
						}
					}
				}
			}?>
		});
		</script>
	<? 	}
	} ?>
	</div>
	<table class="mdTable" id="md0" style="display:none;"> <!-- DUMMY -->
		<tbody>
			<tr class="mdEdit mdTR">
				<td class="mdTDName">
					<input type="hidden" name="mdID[0]" value="mid0"/>
					<input type="text" name="mdName[0]" class="mdField noEnterSubmit" value="<?echo _("Click to add a Meal Deal name");?>" required/>
					<small class="error"><?echo _("Please type an item name");?></small>
				</td>
				<td class="mdTDSec">
					<select name="mdSecID[0]" class="mdField noEnterSubmit inline"> <!-- Dummy does not have mdSecSingleSelect -->
						<?foreach($mdSections as $mdSection){?>
							<option value="<?echo $mdSection['id']?>"><?echo $mdSection['name']?></option>
						<?}?>
					</select>
					<small class="error"><?echo _("Please choose a section");?></small>
				</td>
				<td class="mdTDTPrice hide">
					<input type="text" name="mdTPrice[0]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>"/>
				</td>
				<td class="mdTDPrice">
					<input type="text" name="mdPrice[0]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>" required pattern="^([0-9]+)(\.[0-9]{1,2})?$"/>
					<small class="error"><?echo _("Amount?");?></small>
					</td>
				<td class="mdTDVisi hide">
					<div class="switch tiny"> 
						<input name="mdVisi[0]" value="0" class="hide" type="radio">
						<label><?echo _("No");?></label>

						<input name="mdVisi[0]" value="1" class="hide" type="radio" checked>
						<label><?echo _("Yes");?></label>

						<span></span>
					</div>
				</td>
				<td class="mdTDTools">
					<button type="button" class="mdTableButtons mdSave"				title="<?echo _("Collapse");?>"		><i class="pd-up"></i></button>
					<button type="button" class="mdTableButtons mdTDEdit hide" 		title="<?echo _("Edit");?>"		><i class="pd-edit"></i></button>
					<button type="button" class="mdTableButtons secondary mdDelete" title="<?echo _("Delete");?>"	><i class="pd-delete"></i></button>
				</td>
			</tr>
			<tr class="mdEdit subHeaderTR">
				<td class="mdSubheader optionTR"><h6><button type="button" class="newMDSection"><i class="pd-add"></i></button> <?echo _("Add a selection to this meal deal");?></h6></td>
				<td class="modifierRow hide">
					<input type="text" name="iMD[0][s0]" class="mdField noEnterSubmit hide" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" placeholder="<?echo _("Type or pick a selection title");?>"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Choose a main, Choose a side, Choose a drink, etc");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
					<small class="error smallerror"><?echo _("Please type or pick a title");?></small>
				</td>
				<td class="modifierRow hide" colspan="3">
					<select class="mdField noEnterSubmit inline" name="iMDType[0][s0]"> <!-- Dummy does not have mdMenuSingleSelect -->
						<option><?echo _("Choose a menu section");?></option>
						<?foreach($mdSections as $mdSection){?>
							<option value="<?echo $mdSection['id']?>"><?echo $mdSection['name']?></option>
						<?}?>
						<option value="all"><?echo _('All sections');?></option>
					</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Pick a menu section from where you'd like to import items.");?>"></i>
					<small class="error"><?echo _("Please choose a section");?></small>
				</td>
			</tr>
			<tr class="mdEdit optionTR">
				<td class="mdTDIName" colspan="5">
					<input type="hidden" name="mdItems[0][s0]" value=""/>
					<?if(!$_SESSION['noItemsFlag']) 
					{ 
						foreach($mdSections as $mdSection) { 
							foreach($mdSection['items'] as $item) { 
								if($item['mealDeal']) continue;
							?>
								<label class="mdItemName sec<?echo $mdSection['id'];?>" style="display:none;"><span id="0_item_<?echo $item['id']?>" data-value="<?echo $item['price'];?>"><?echo "(&pound;".number_format($item['price'],2).") ".$item['name'];?></span> &nbsp; <button type="button" class="newmdItem" title="<?echo _("Add this item to the current Meal Deal");?>"><i class="pd-add"></i></button></label>
						<?  }
						}
					}?>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="row row--space1">
		<?if(!$_SESSION['noItemsFlag']){?><button id="mdSubButton" type="submit"><?echo _("SAVE CHANGES");?></button><?}?>
		<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
	</div>
</form>

<h6 class="hide deleteDummy"><button type="button" class="mdSectionDelete secondary"><i class="pd-delete"></i></button> <?echo _("Delete this section");?></h6>

<?if($_SESSION['noItemsFlag']){?>
<script type="text/javascript">
	$(document).ready(function() {
		noty({
		  type: 'error',
		  text: '<? echo _("You\'ve not created any items! You won\'t be able to create Meal Deals until you have some items in your menu."); ?>'
		});
	
	});
</script>
<?
$_SESSION['noItemsFlag']=0;
}?>