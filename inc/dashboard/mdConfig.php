<?if(!isset($_SESSION['md_edit_on'])) $_SESSION['md_edit_on']=0;?>
<div class="row">
	<div class="topSpacer"></div>
	<form id="mealDealConfigForm" method="POST" class="custom" data-abide>
		<h1><?echo _("Meal Deals");?></h1>
		<div class="large-12 columns">
			<div class="row">
				<?if(!$_SESSION['noItemsFlag']){?><button type="button" class="newMD" title="<?echo _("Add a new Meal Deal");?>"><i class="fi-plus"></i></button> <?echo _("Add a new Meal Deal"); }?>
			</div>
			<input type="hidden" id="mdCount" 			name="mdCount"			value="<?echo $mdCount;?>"/>
			<input type="hidden" id="mdCountAct" 		name="mdCountAct"		value="<?echo $mdCount;?>"/>
			
			<?php 
			if($_SESSION['md_edit_on']){
				foreach($md as $key => $mealDeal){ /*1-index so key+1*/?>
				<table class="mdTable" id="md<?echo $key+1;?>" style="background:transparent;">
					<tbody>
						<tr class="savedInput mdTR">
							<td class="mdTDName">
								<input type="hidden" name="mdID[<?echo $key+1;?>]" value="<?echo $mealDeal['id']?>"/>
								<input type="text" name="mdName[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo $mealDeal['name'];?>" required/>
								<small class="error"><?echo _("Please type an item name");?></small>
							</td>
							<td class="mdTDTPrice">
								<input type="text" name="mdTPrice[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>" readonly="readonly"/>
							</td>
							<td class="mdTDPrice">
								<input type="text" name="mdPrice[<?echo $key+1;?>]" class="mdField noEnterSubmit" value="<?echo $mealDeal['price'];?>" required/>
								<small class="error"><?echo _("Amount?");?></small>
								</td>
							<td class="mdTDVisi">
								<div class="switch tiny"> 
									<input name="mdVisi[<?echo $key+1;?>]" value="0" type="radio" <?if(!$mealDeal['visible']){?>checked<?}?>>
									<label><?echo _("No");?></label>

									<input name="mdVisi[<?echo $key+1;?>]" value="1" type="radio" <?if($mealDeal['visible']){?>checked<?}?>>
									<label><?echo _("Yes");?></label>

									<span></span>
								</div>
							</td>
							<td class="mdTDTools">
								<button type="button" class="mdTableButtons mdSave hide"		title="<?echo _("Collapse");?>"		><i class="icon-chevron-up"></i></button>
								<button type="button" class="mdTableButtons mdTDEdit"	 		title="<?echo _("Edit");?>"		><i class="fi-pencil"></i></button>
								<button type="button" class="mdTableButtons secondary mdDelete" title="<?echo _("Delete");?>"	><i class="fi-x"></i></button>
							</td>
						</tr>
						<tr class="savedInput subHeaderTR" style="display:none;">
							<td class="mdSubheader optionTR"><h6><?echo _("Add items to this Meal Deal");?></h6></td>
						</tr>
						<tr class="savedInput optionTR"  style="display:none;">
							<td class="mdTDIName" colspan="5">
								<input type="hidden" name="mdItems[<?echo $key+1;?>]" value=""/>
								<?if(!$_SESSION['noItemsFlag']) 
								{ 
									foreach($items as $item) { ?>
										<label class="mdItemName"><span id="<?echo $key+1;?>_item_<?echo $item['id']?>" data-value="<?echo $item['price'];?>"><?echo $item['name'];?></span> &nbsp; <button type="button" class="newmdItem" title="<?echo _("Add this item to the current Meal Deal");?>"><i class="fi-plus"></i></button></label>
								<?  }
								}?>
							</td>
						</tr>
					</tbody>
				</table>
				<script type="text/javascript">
					<? foreach($mealDeal['items'] as $mdiKey => $mdItem){?> 
						$(document).ready(function(){
							$(function() { //this inside document.ready makes the following run once DOM is ready (note that is AFTER page load is complete)
								$('#<?echo $key+1;?>_item_<?echo $mdItem['itemId']?>').closest('.mdItemName').find('button').find('i').trigger('click');
							});
						});
					<?}?>
				</script>
			<? 	}
			} ?>
			
			<div class="hide firstMdDiv"></div> <!-- Dummy hook -->

			<table class="mdTable" id="md0" style="display:none;"> <!-- DUMMY -->
				<tbody>
					<tr class="mdEdit mdTR">
						<td class="mdTDName">
							<input type="hidden" name="mdID[0]" value="mid0"/>
							<input type="text" name="mdName[0]" class="mdField noEnterSubmit" value="<?echo _("Click to add a Meal Deal name");?>" required/>
							<small class="error"><?echo _("Please type an item name");?></small>
						</td>
						<td class="mdTDTPrice">
							<input type="text" name="mdTPrice[0]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>" readonly="readonly"/>
						</td>
						<td class="mdTDPrice">
							<input type="text" name="mdPrice[0]" class="mdField noEnterSubmit" value="<?echo _("0.00");?>" required/>
							<small class="error"><?echo _("Amount?");?></small>
							</td>
						<td class="mdTDVisi">
							<div class="switch tiny"> 
								<input name="mdVisi[0]" value="0" type="radio">
								<label><?echo _("No");?></label>

								<input name="mdVisi[0]" value="1" type="radio" checked>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="mdTDTools">
							<button type="button" class="mdTableButtons mdSave"				title="<?echo _("Collapse");?>"		><i class="icon-chevron-up"></i></button>
							<button type="button" class="mdTableButtons mdTDEdit hide" 		title="<?echo _("Edit");?>"		><i class="fi-pencil"></i></button>
							<button type="button" class="mdTableButtons secondary mdDelete" title="<?echo _("Delete");?>"	><i class="fi-x"></i></button>
						</td>
					</tr>
					<tr class="mdEdit subHeaderTR">
						<td class="mdSubheader optionTR"><h6><?echo _("Add items to this Meal Deal");?></h6></td>
					</tr>
					<tr class="mdEdit optionTR">
						<td class="mdTDIName" colspan="5">
							<input type="hidden" name="mdItems[0]" value=""/>
							<?if(!$_SESSION['noItemsFlag']) 
							{ 
								foreach($items as $item) { ?>
									<label class="mdItemName"><span id="0_item_<?echo $item['id']?>" data-value="<?echo $item['price'];?>"><?echo $item['name'];?></span> &nbsp; <button type="button" class="newmdItem" title="<?echo _("Add this item to the current Meal Deal");?>"><i class="fi-plus"></i></button></label>
							<?  }
							}?>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="row row--space1">
				<?if(!$_SESSION['noItemsFlag']){?><button type="submit"><?echo _("SAVE");?></button><?}?>
			</div>
		</div>
	</form>
</div>
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