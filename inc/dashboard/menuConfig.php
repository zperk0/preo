<? $_SESSION['groupMenu'] = ($_SERVER['REQUEST_URI'] == '/newGroupMenu') || (strtoupper($menu['type']) == 'BOOKING') ? true : false; ?>

<div class="loading" id="loadingConfig">
  <div class="background-loading"></div>
  <div class="loading-content">
    <img src="/img/spinner.gif" class="img-responsive" alt="Carregando..." title="Carregando..." />
  </div>
</div>

<?if(!isset($_SESSION['menu_edit_on'])) $_SESSION['menu_edit_on']=0;?>
<form id="menuConfigForm" class='<? if($_SESSION["groupMenu"]) echo "groupMenu";?>' method="POST" data-preoabide>
	<div class="row">
		<div class="topSpacer"></div>
		<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
		<nav class="breadcrumbs row--space1d">
			<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
			<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
			<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
			<a class="current" href="#"><? echo _("Menu Creation");?></a>
			<?if(!$_SESSION['noEHFlag']){?>
				<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a href="<?echo $_SESSION['path']?>/events?r=1"><? echo _("Events");?></a>
				<?}else{?><a href="<?echo $_SESSION['path']?>/openinghours?r=1"><? echo _("Opening Hours");?></a><?}?>
			<?}else{?>
				<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="unavailable" href="#"><? echo _("Events");?></a>
				<?}else{?><a class="unavailable" href="#"><? echo _("Opening Hours");?></a><?}?>
			<?}?>
			<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>

			<a class="unavailable" href="#"><? echo _("Done");?></a>
		</nav>
		<?}?>
		<div class="large-12 columns">

			<?if(!$_SESSION['groupMenu']) { ?>
			<h1><?if(!$_SESSION['menu_edit_on'] && !isset($menu)) echo _("Build your menu"); else echo _("Your menu");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Now it's time to create your menu. We suggest you keep it simple to start with.<br/><br/>An easy way is to group items, i.e. create separate sections for food, cold drinks and hot drinks.");?>"></i></h1>
			<?}?>
			<!-- Hidden inputs here keep count of menu items and options -->
			<input type="hidden" id="sectionCount" 			name="sectionCount"			value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>
			<input type="hidden" id="sectionCountAct" 		name="sectionCountAct"		value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>

			<input type="hidden" id="itemCount"				name="itemCount" 			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>
			<input type="hidden" id="itemCountAct" 			name="itemCountAct"			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>

			<input type="hidden" id="item0_optionCount" 	name="item0_optionCount"	value="0"/>
			<input type="hidden" id="item0_optionCountAct" 	name="item0_optionCountAct" value="0"/>

			<input type="hidden" id="item0_modCount" 		name="item0_modCount"	 	value="0"/>
			<input type="hidden" id="item0_modCountAct" 	name="item0_modCountAct" 	value="0"/>

			<input type="hidden" id="redirectFlag" name="redirectFlag" value="<?echo $redirectFlag?>"/>

			<input type="hidden" id="menuID" 	name="menuID" 		value="<?if(isset($menuID)) echo $menuID; else echo "menu1";?>"/>
			<input type="hidden" id="venueID" 	name="venueID" 		value="<?if(isset($_SESSION['venue_id'])) echo $_SESSION['venue_id']; else echo "venue1";?>"/>
			<input type="hidden" id="accountID" name="accountID" 	value="<?if(isset($_SESSION['account_id'])) echo $_SESSION['account_id']; else echo "account1";?>"/>

			<?if($_SESSION['menu_edit_on'] || (isset($menu) && count($menu))) :
				foreach($itemModOptArray as $key=>$itemModOption)
				{
					//we have to keep this 1-indexed for consistency
					?>
					<input type="hidden" id="item<?echo ($key+1)?>_optionCount" 	name="item<?echo ($key+1)?>_optionCount"	value="<?echo $itemModOption['optCount'];?>"/>
					<input type="hidden" id="item<?echo ($key+1)?>_optionCountAct" 	name="item<?echo ($key+1)?>_optionCountAct" value="<?echo $itemModOption['optCount'];?>"/>

					<input type="hidden" id="item<?echo ($key+1)?>_modCount" 		name="item<?echo ($key+1)?>_modCount"	 	value="<?echo $itemModOption['modCount'];?>"/>
					<input type="hidden" id="item<?echo ($key+1)?>_modCountAct" 	name="item<?echo ($key+1)?>_modCountAct" 	value="<?echo $itemModOption['modCount'];?>"/>
					<?
				}
			endif; ?>

			<div class="row">
				<input type="text" name="mName" id="mName" data-edit="false" class="menuField noEnterSubmit" value="<?if($_SESSION['menu_edit_on'] || (isset($menu) && count($menu)) ) echo htmlentities($menu['name'], ENT_QUOTES);?>" placeholder="<?echo !$_SESSION['groupMenu'] ? _("Click to add your menu name") : _("Enter menu name");?>" required tabindex=1 pattern="^.{0,99}$"/>
				<small class="error mNameError"><?echo _("Please type a menu name (max 100chars)");?></small>
			</div>
			<?if($_SESSION['groupMenu']) { ?>
			<div class="row">
				<input type="text" name="mDescription" id="mDescription" class="menuField" value="<?if($_SESSION['menu_edit_on'] || (isset($menu) && count($menu)) ) echo htmlentities($menu['description'], ENT_QUOTES);?>" placeholder="<?echo _("Description (optional)");?>" tabindex=2 pattern="^.{0,250}$"/>
			</div>
			<div class='row'>
				<label class='assign-promotions-label'><?echo _('Assigned to these promotions'); ?></label>
				<div class='promotions-input-container'>
					<select class='promotions-select allow-custom-input' data-placeholder="<?echo _('Select some promotions'); ?>" multiple>
						<?if(isset($menu)) {
							foreach($menu['promotions'] as $pKey=>$promotion){?>
							<option value="<? echo $promotion; ?>" selected><? echo $promotion; ?></option>
						<?}
						}?>
					</select>
				</div>
			</div>
			<?}?>




			<div class="hide" id="menuSectionRow"> <!-- DUMMY -->
				<div class="row">
					<div class="large-12 columns menuSectionDiv">
						<input type="text" name="mSectionName[0]" data-insert="false" data-edit="false" data-delete="false" data-id="section0s" data-md="false" class="menuField menuSectionField noEnterSubmit" value="<?echo _("Click to add a section name");?>" required pattern="^.{0,99}$"/>
						<small class="error msecError"><?echo _("Please type a section name (max 100chars)");?></small>
					</div>
					<?if($_SESSION['groupMenu']) { ?>
					<div class="large-12 columns minmax-container">
						<span><?echo _('User must select'); ?></span>
						<div>
							<input type="text" name="mSectionMinMax[0]" data-insert="false" data-edit="false" data-delete="false" data-md="false" class="menuField menuSectionField noEnterSubmit minmax" required pattern="^[1-9][0-9]*$" value='10'/>
							<small class="error mminmaxError"><?echo _("Please enter the quantity");?></small>
						</div>
						<span><?echo _('item/s per guest from this section'); ?></span>
					</div>
					<?}?>
				</div>
				<div class="row">
					<div class="large-12 columns sectionTools">
						<button id="add_section0" 		type="button" class="newItem" 						title="<?echo _("Add an item to this section");?>"	><i class="pd-add"></i></button> <?echo _("Add an item to this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
						<div class="showOnHover">
							<button 						type="button" class="sortSecHandle"				title="<?echo _("Move this section");?>"			><i class="pd-move"></i></button> <?echo _("Move this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
							<button id="delete_section0" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"			><i class="pd-delete"></i></button> <?echo _("Delete this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
							<label class="custom-checkbox"><input type="checkbox" class="collapseSection" id="collapse_section0" data-value="0" data-edit="false" name="collapse[]" value="1" /> <span class="icon"></span><span class="text"><?echo _("Collapse this section");?></span></label>
						</div>
					</div>
				</div>
				<div class="row hasTableHeader">
					<table class="headerTable">
						<thead>
							<tr>
								<th class="menuTDName"><? echo _("Name");?></th>
								<th class="menuTDDesc"><? echo _("Description");?></th>
								<th class="menuTDPrice"><? echo _("Price ");?></th>
								<!--<th class="menuTDQuant"><? echo _("Quantity");?></th>-->
								<th class="menuTDVisi"><? echo _("Visible?");?></th>
								<th class="menuTDTools"><? echo _("Tools");?></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>

			<div class="hide firstItemDiv"></div> <!-- Dummy hook -->

			<table class="menuTable" id="item0" style="display:none;"><!-- DUMMY -->
				<tbody>
					<tr class="menuEdit itemTR">
						<td class="menuTDName">
							<input type="text" name="iName[section0][0]" data-insert="false" data-edit="false" data-delete="false" data-id="item0i"  data-mdi="false" class="menuField noEnterSubmit" value="<?echo _("Click to add an item name");?>" required pattern="^.{0,99}$"/>
							<small class="error"><?echo _("Please type an item name (max 100chars)");?></small>
						</td>
						<td class="menuTDDesc">
							<input type="text" name="iDesc[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Optional description");?>" pattern="^.{0,250}$"/>
							<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
						</td>
						<td class="menuTDPrice">
							<input type="text" name="iPrice[section0][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" pattern="^([0-9]+)([\.,][0-9]{1,2})?$"/>
							<small class="error priceError"><?echo _("Price?");?></small>

							</td>
						<td class="menuTDQuant hide">
							<input type="text" name="iQuan[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Unlimited");?>"/>
						</td>
						<td class="menuTDVisi">
							<div class="switch small" title="<?echo _("This chooses whether you want to activate this food on the menu or not.");?>">
								<input name="iVisi[section0][0]" value="0" type="radio">
								<label class='no'><?echo _("No");?></label>

								<input name="iVisi[section0][0]" value="1" type="radio" checked>
								<label class='yes'><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="menuTDTools colMenuItems">
							<button type="button" class="menuTableButtons itemUpload" 		title="<?echo _("Upload image");?>"							><i class="pd-upload"></i></button>
							<button type="button" class="menuTableButtons itemTags" 		title="<?echo _("Add tags");?>"							><i class="pd-tags"></i></button>
							<button type="button" class="menuTableButtons itemSave"				title="<?echo _("Collapse");?>"						><i class="pd-up"></i></button>
							<button type="button" class="menuTableButtons itemEdit hide" 		title="<?echo _("Edit");?>"							><i class="pd-edit"></i></button>
							<button type="button" class="menuTableButtons sortHandle"			title="<?echo _("Reorder");?>"						><i class="pd-move"></i></button>
							<button type="button" class="menuTableButtons itemDuplicate" 		title="<?echo _("Duplicate");?>" id="dup_section0"	><i class="pd-copy"></i></button>
							<button type="button" class="menuTableButtons secondary itemDelete" title="<?echo _("Delete");?>"						><i class="pd-delete"></i></button>
						</td>
					</tr>
					<tr class="menuEdit subHeaderTR">
						<td class="itemSubheader"><h6><button type="button" class="newOpt" title="<?echo _("Add a new option to this item");?>"><i class="pd-add"></i></button> <?echo _("Add an option");?> </h6></td>
						<td class="modifierRow hide">
							<input type="text" name="iMod[item0][m0]" data-insert="false" data-edit="false" data-delete="false" data-id="mod0m-item0i" class="menuField noEnterSubmit" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" placeholder="<?echo _("Type or pick an option title");?>" pattern="^.{0,99}$"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Pick a size, Choice of an option, Add some extras, Select a side");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
							<small class="error smallerror selectError"><?echo _("Please type or pick a title");?></small>
						</td>
						<td class="modifierRow hide">
							<select class="menuField noEnterSubmit inline" name="iModType[item0][m0]"> <!-- Dummy does not have itemMenuSingleSelect -->
								<option value="S" title="<?echo _("User must select only one option.");?>"><?echo _("User selects 1 option");?></option> <!-- min=1,max=1 -->
								<option value="M" title="<?echo _("User must select one or more options.");?>"><?echo _("User selects 1 or more options");?></option> <!-- min=1,max=-1 -->
								<option value="O" title="<?echo _("User can select zero or more options.");?>"><?echo _("User selects 0 or more options");?></option> <!-- min=0,max=-1 -->
								<option title="<?echo _("Advanced...");?>" class='advanced-modifier-option'><?echo _("Advanced...");?></option> <!-- custom -->
							</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Single: When the user must pick only 1 option.<br/><br/>Multiple: When the user must pick 1 or more options.<br/><br/>Optional: when the user can pick 0 or multiple options.");?>"></i>
							<small class="error"><?echo _("Please choose a type");?></small>
						</td>
						<td class="modifierRow modifierRowDeleteHeader hide menuTDTools">
							<button type="button" class="menuTableButtons secondary optionHeaderDelete" title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
						</td>
					</tr>
					<tr class="menuEdit hide" style="display:none;">
						<td class="menuTDName">
							<input type="text" name="oName[item0][m0][0]" data-insert="false" data-edit="false" data-delete="false" data-id="opt0o-item0i" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required pattern="^.{0,99}$"/>
							<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
						</td>
						<td class="menuTDDesc">
						</td>
						<td class="menuTDPrice">
							<input type="text" name="oPrice[item0][m0][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" pattern="^([0-9]+)([\.,][0-9]{1,2})?$"/>
							&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
							<small class="error smallesterror"><?echo _("Price?");?></small>
						</td>
						<td class="menuTDQuant hide">
						</td>
						<td class="menuTDVisi">
							<div class="switch small hide">
								<input name="oVisi[item0][m0][0]" value="0" type="radio">
								<label class='no'><?echo _("No");?></label>

								<input name="oVisi[item0][m0][0]" value="1" type="radio" checked>
								<label class='yes'><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="menuTDTools">
							<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="pd-copy"></i></button>
							<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
						</td>
					</tr>
					<tr class="menuEdit xtraModTR">
						<td class="xtraModTD"><h6><button type="button" class="xtraOpt" title="<?echo _("Eg. Toppings, Sizes, Exras, etc");?>"><i class="pd-add"></i></button> <?echo _("Add an option category to this item <small>(optional)</small>");?> </h6></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="dynamicDataTable"> <!-- This is where the dynamic data goes into -->

	<?if($_SESSION['menu_edit_on'] || (isset($menu) && count($menu))){
		$iKey=0; //item number are continuous across sections so we can't use $key in foreach($array as $key=>$var)
		foreach($menu['sections'] as $sKey=>$section){
		//again remember its all 1-indexed thats why we add +1 to the key
		$mdFlag = "false";
		foreach($section['items'] as $secitem) { if(in_array($secitem['id'], $mealDealArray)) {$mdFlag="true"; break;} }
		?>
			<div class="moveSec">
				<div class="moveSecInner">
					<div id="menuSectionRow">
						<div class="row">
							<div class="large-12 columns menuSectionDiv">
								<input type="text" name="mSectionName[<?echo ($sKey+1);?>]" data-insert="false" data-edit="false" data-delete="false" data-id="section<?echo $section['id'];?>" data-md="<?echo $mdFlag?>" class="menuField menuSectionField noEnterSubmit section<?echo ($sKey+1);?>" value="<?echo htmlentities($section['name'], ENT_QUOTES);?>" placeholder="<?echo _("Click to add a section name");?>" required pattern="^.{0,99}$"/>
								<small class="error msecError"><?echo _("Please type a section name (max 100chars)");?></small>
							</div>
							<?if($_SESSION['groupMenu']) { ?>
							<div class="large-12 columns minmax-container">
								<span><?echo _('User must select'); ?></span>
								<div>
									<input type="text" name="mSectionMinMax[<?echo ($sKey+1);?>]" data-insert="false" data-edit="false" data-delete="false" data-md="false" class="menuField menuSectionField noEnterSubmit minmax" required pattern="^[1-9][0-9]*$"  value='<? echo $section["min"]; ?>'/>
									<small class="error mminmaxError"><?echo _("Please enter the quantity");?></small>
								</div>
								<span><?echo _('item/s per guest from this section'); ?></span>
							</div>
							<?}?>
						</div>
						<div class="row">
							<div class="large-12 columns sectionTools">
								<button id="add_section<?echo ($sKey+1);?>" 	type="button" class="newItem" 					title="<?echo _("Add an item to this section");?>"	><i class="pd-add"></i></button> <?echo _("Add an item to this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
								<div class="showOnHover">
									<button 						type="button" class="sortSecHandle"								title="<?echo _("Move this section");?>"			><i class="pd-move"></i></button> <?echo _("Move this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
									<button id="delete_section<?echo ($sKey+1);?>" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"			><i class="pd-delete"></i></button> <?echo _("Delete this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
									<label class="custom-checkbox"><input type="checkbox" class="collapseSection" id="collapse_section<?echo ($sKey+1);?>" data-value="<?php echo $section['collapse'] ?>" data-edit="false" name="collapse[]" value="1" <?php echo $section['collapse'] == '1' ? 'checked="checked"' : null ?> /> <span class="icon"></span><span class="text"><?echo _("Collapse this section");?></span></label>
								</div>
							</div>
						</div>
						<div class="row hasTableHeader">
							<table class="headerTable">
								<thead>
									<tr>
										<th class="menuTDName"><? echo _("Name");?></th>
										<th class="menuTDDesc"><? echo _("Description");?></th>
										<th class="menuTDPrice"><? echo _("Price ");?></th>
										<!--<th class="menuTDQuant"><? echo _("Quantity");?></th> -->
										<th class="menuTDVisi"><? echo _("Visible?");?></th>
										<th class="menuTDTools"><? echo _("Tools");?></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="sortWithinDiv">
						<?foreach($section['items'] as $item){
						//again remember its all 1-indexed thats why we add +1 to the key?>
							<table class="menuTable tablesection<?echo ($sKey+1);?> <?if($item['mealDeal']){?>neverShow<?}?>" id="item<?echo ($iKey+1)?>" style="background:transparent<?if($item['mealDeal']){?>;display:none !important;visibility:hidden !important;<?}?>">
								<tbody>
									<tr class="savedInput itemTR">
										<td class="menuTDName">
											<input type="text" name="iName[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" data-insert="false" data-edit="false" data-delete="false" data-id="item<?echo $item['id'];?>" <?if($item['mealDeal']){?>data-md="true"<?}?>  <?if(in_array($item['id'],$mealDealItemArray)){?>data-mdi="true"<?}else{?>data-mdi="false"<?}?> class="menuField noEnterSubmit" value="<?echo htmlentities($item['name'], ENT_QUOTES);?>" required readonly="readonly" pattern="^.{0,99}$"/>
											<small class="error"><?echo _("Please type an item name (max 100chars)");?></small>
										</td>
										<td class="menuTDDesc">
											<input type="text" name="iDesc[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?if(!empty($item['description'])) echo htmlentities($item['description'], ENT_QUOTES);?>" placeholder="<?echo _("Optional description");?>"  readonly="readonly" pattern="^.{0,250}$"/>
											<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
										</td>
										<td class="menuTDPrice">
											<input type="text" name="iPrice[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?echo locale_number_format($item['price'],2,'.','');?>" readonly="readonly" pattern="^([0-9]+)([\.,][0-9]{1,2})?$"/>
											<small class="error priceError"><?echo _("Price?");?></small>
										</td>
										<td class="menuTDQuant hide">
											<input type="text" name="iQuan[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" <?if($item['quantity']){?>value="<?echo $item['quantity']?>"<?}else{?>placeholder="<?echo _("Unlimited");}?>"  readonly="readonly"/>
										</td>
										<td class="menuTDVisi">
											<div class="switch small" title="<?echo _("This chooses whether you want to activate this food on the menu or not.");?>">
												<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="0" type="radio" <?if(!$item['visible']){?>checked<?}?>>
												<label class='no'><?echo _("No");?></label>

												<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="1" type="radio" <?if($item['visible']){?>checked<?}?>>
												<label class='yes'><?echo _("Yes");?></label>

												<span></span>
											</div>
										</td>
										<td class="menuTDTools colMenuItems">
											<?php
												$attr = '';
												if ( isset($item['images']) && count($item['images']) ) {
													$attr = 'data-image-url = "' . $item['images'][0]['image'] . '" data-image-type = "' . $item['images'][0]['type'] . '" data-image-id="' . $item['images'][0]['id'] . '"';
												}
												$attrTags = '';
												if ( isset($item['tags']) && count($item['tags']) ) {
													$attrTags = 'data-tags=\'' . json_encode($item['tags']) . '\'';
												}
											?>
											<button type="button" class="menuTableButtons itemUpload" 	<?php echo $attr ?>	title="<?echo _("Upload image");?>"							><i class="pd-upload"></i></button>
											<button type="button" class="menuTableButtons itemTags" 	<?php echo $attrTags ?>	title="<?echo _("Add tags");?>"							><i class="pd-tags"></i></button>
											<button type="button" class="menuTableButtons itemSave hide"			title="<?echo _("Collapse");?>"							><i class="pd-up"></i></button>
											<button type="button" class="menuTableButtons itemEdit" 				title="<?echo _("Edit");?>"							><i class="pd-edit"></i></button>
											<button type="button" class="menuTableButtons sortHandle"				title="<?echo _("Reorder");?>"							><i class="pd-move"></i></button>
											<button type="button" class="menuTableButtons itemDuplicate" 			title="<?echo _("Duplicate");?>" id="dup<?echo ($iKey+1);?>_section<?echo ($sKey+1);?>"	><i class="pd-copy"></i></button>
											<button type="button" class="menuTableButtons secondary itemDelete" 	title="<?echo _("Delete");?>"						><i class="pd-delete"></i></button>

										</td>
									</tr>
									<?if(isset($item['modifiers']) && count($item['modifiers'])){
										foreach($item['modifiers'] as $modiKey=>$modifier){ ?>
											<tr class="menuEdit subHeaderTR">
												<td class="itemSubheader hide"><h6><button type="button" class="newOpt" title="<?echo _("Add a new option to this item");?>"><i class="pd-add"></i></button> <?echo _("Add an option");?></h6></td>
												<td class="modifierRow hide">
													<input type="text" name="iMod[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>]" data-insert="false" data-edit="false" data-delete="false" data-id="mod<?echo $modifier['id'];?>" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" class="menuField noEnterSubmit hide" placeholder="<?echo _("Type or pick an option title");?>" value="<?echo htmlentities($modifier['name'], ENT_QUOTES);?>" required pattern="^.{0,99}$"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Pick a size, Choice of an option, Add some extras, Select a side");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
													<small class="error smallerror selectError"><?echo _("Please type or pick a title");?></small>
												</td>
												<td class="modifierRow hide">
													<select class="menuField noEnterSubmit inline itemMenuSingleSelect" style="display:none;" name="iModType[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>]">
														<option value="S" title="<?echo _("User must select only one option.");?>" data-minchoices="1" data-maxchoices="1" <?if($modifier['minChoices']==1 && $modifier['maxChoices']==1){?>selected="selected"<?}?> ><?echo _("User selects 1 option");?></option> <!-- min=1,max=1 -->
														<option value="M" title="<?echo _("User must select one or more options.");?>" data-minchoices="1" data-maxchoices="-1" <?if($modifier['minChoices']==1 && $modifier['maxChoices']==-1){?>selected="selected"<?}?>><?echo _("User selects 1 or more options");?></option> <!-- min=1,max=-1 -->
														<option value="O" title="<?echo _("User can select zero or more options.");?>" data-minchoices="0" data-maxchoices="-1" <?if($modifier['minChoices']==0 && $modifier['maxChoices']==-1){?>selected="selected"<?}?>><?echo _("User selects 0 or more options");?></option> <!-- min=0,max=-1 -->
														<?if(!($modifier['minChoices']==1 && $modifier['maxChoices']==1) && !($modifier['minChoices']==1 && $modifier['maxChoices']==-1) && !($modifier['minChoices']==0 && $modifier['maxChoices']==-1)) { ?>

															<?
																if($modifier['minChoices'] != $modifier['maxChoices']) {

																	$optionText =  _("User selects between") .' '. $modifier['minChoices'] .' '. (($modifier['maxChoices'] != -1) ? (_('and') . ' ' . $modifier['maxChoices']) : _('or more')) .' '. _("options");
																} else {
																	$optionText =  _("User selects") .' '. $modifier['minChoices'] .' '. _("options");
																}
															?>

															<option value="A" title="<?echo _("Custom choices");?>" selected="selected" data-minchoices="<? echo $modifier['minChoices']; ?>" data-maxchoices="<? echo $modifier['maxChoices']; ?>"><? echo $optionText; ?></option>
														<?}?>
														<option title="<?echo _("Advanced...");?>" class='advanced-modifier-option'><?echo _("Advanced...");?></option> <!-- custom -->
													</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Single: When the user must pick only 1 option.<br/><br/>Multiple: When the user must pick 1 or more options.<br/><br/>Optional: when the user can pick 0 or multiple options.");?>"></i>
													<small class="error"><?echo _("Please choose a type");?></small>
												</td>
												<td class="modifierRow modifierRowDeleteHeader hide menuTDTools">
													<button type="button" class="menuTableButtons secondary optionHeaderDelete" title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
												</td>
											</tr>
											<tr class="menuEdit hide" style="display:none;"> <!-- This dummy is required! -->
												<td class="menuTDName">
													<input type="text" name="oName[item<?echo ($iKey+1);?>][m0][0]" data-insert="false" data-edit="false" data-delete="false" data-id="opt0o-item0i" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required pattern="^.{0,99}$"/>
													<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
												</td>
												<td class="menuTDDesc">
												</td>
												<td class="menuTDPrice">
													<input type="text" name="oPrice[item<?echo ($iKey+1);?>][m0][0]" class="menuField noEnterSubmit" value="<?echo _("0.00");?>" pattern="^([0-9]+)([\.,][0-9]{1,2})?$"/>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
													<small class="error smallesterror"><?echo _("Price?");?></small>
												</td>
												<td class="menuTDQuant hide">
												</td>
												<td class="menuTDVisi">
													<div class="switch small hide">
														<input name="oVisi[item<?echo ($iKey+1);?>][m0][0]" value="0" type="radio">
														<label class='no'><?echo _("No");?></label>

														<input name="oVisi[item<?echo ($iKey+1);?>][m0][0]" value="1" type="radio" checked>
														<label class='yes'><?echo _("Yes");?></label>

														<span></span>
													</div>
												</td>
												<td class="menuTDTools">
													<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="pd-copy"></i></button>
													<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
												</td>
											</tr>
											<?foreach($modifier['items'] as $oKey=>$option){
												//again remember its all 1-indexed thats why we add +1 to the key
											?>
												<tr class="optionTR savedInput" style="display:none;">
													<td class="menuTDName">
														<input type="text" name="oName[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" data-insert="false" data-edit="false" data-delete="false" data-id="opt<?echo $option['id'];?>" class="menuField noEnterSubmit" value="<?echo htmlentities($option['name'], ENT_QUOTES);?>" required  readonly="readonly" pattern="^.{0,99}$"/>
														<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
													</td>
													<td class="menuTDDesc">
													</td>
													<td class="menuTDPrice">
														<input type="text" name="oPrice[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" class="menuField noEnterSubmit" value="<?echo locale_number_format($option['price'],2,'.','');?>" pattern="^([0-9]+)([\.,][0-9]{1,2})?$" readonly="readonly"/>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
														<small class="error smallesterror"><?echo _("Price?");?></small>
													</td>
													<td class="menuTDQuant hide">
													</td>
													<td class="menuTDVisi">
														<div class="switch small hide">
															<input name="oVisi[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" value="0" type="radio" <?if(!$option['visible']){?>checked<?}?>>
															<label class="no"><?echo _("No");?></label>

															<input name="oVisi[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" value="1" type="radio" <?if($option['visible']){?>checked<?}?>>
															<label class="yes"><?echo _("Yes");?></label>

															<span></span>
														</div>
													</td>
													<td class="menuTDTools">
														<button type="button" class="menuTableButtons optionRowDuplicate" title="<?echo _("Duplicate");?>"><i class="pd-copy"></i></button>
														<button type="button" class="menuTableButtons secondary optionRowDelete" 	title="<?echo _("Delete");?>"><i class="pd-delete"></i></button>
													</td>
												</tr>
											<?
											}
										}
									}?>
									<tr class="menuEdit xtraModTR">
										<td class="xtraModTD hide"><h6><button type="button" class="xtraOpt" title="<?echo _("Eg. Toppings, Sizes, Exras, etc");?>"><i class="pd-add"></i></button> <?echo _("Add an option category to this item <small>(optional)</small>");?> </h6></td>
									</tr>
								</tbody>
							</table>
						<?
							$iKey++;
						}
						?>
						</div>
						<div class="hide firstItemDivsection<?echo ($sKey+1);?>"></div>
					</div>
				</div>
			</div>
		<?
		}
	}?>
		<div class="row alignNewSection">
			<h4><button type="button" class="newSection" title="<?echo _("Add a new menu section");?>"><i class="pd-add"></i></button> <?echo _("Add a new menu section");?></h4>
		</div>
	</div>

	<div class="row">
		<div class="small-12 large-4 columns">
				<button class="collapseAllMenu secondary small" type="button"><?echo _("COLLAPSE ALL");?></button>
			<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
				<button id="menuSaveButtonE" type="submit"><?echo _("SAVE & CONTINUE EDITING");?></button>
				<button id="menuSaveButton" type="submit"><?echo _("SAVE & FINISH");?></button>
			<?}else{?>
				<button id="menuSaveButton" type="submit"><?echo _("SAVE CHANGES");?></button>
			<?}?>
			<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
		</div>
	</div>
</form>

<div id="modalImagesCrop" class="reveal-modal modal-preoday xsmall" data-options="closeOnBackgroundClick:false" data-reveal>
	<a class="close-reveal-modal">×</a>
	<form action="" method="POST" class="formImageMenuItem" enctype="multipart/form-data">
		<div class="header-modalCrop spacing-modalCrop">
			<header class="title-notification" id="title-modalCrop"><? echo _("Name of item");?></header>
			<button type="button" class="doImageMenuItem preodayButton pull-left" id="addPicture" title="<?echo _("UPLOAD");?>"><? echo _("ADD PICTURE"); ?></button>
			<input type="file" name="picFile[]" accept="image/png;image/jpg;image/jpeg" class="hide picImageMenuItem" />
			<p id="descriptionExtensions"><? echo _("JPG, PNG (Max. file size 5mb)");?></p>
			<p id="errorMessageImageCrop"></p>
		</div>

		<div class="content-modal">
			<div id="croppic"></div>
			<div class="progressImageCrop">
			    <div class="barImageCrop"></div >
			    <div class="percentImageCrop">0%</div>
			</div>

			<p class="itemBackgroundImage">
				<input type="checkbox" name="item_background" id="item_background" />
				<label for="item_background">Item background</label>
			</p>
		</div>

		<div class="footer-modalCrop spacing-modalCrop">
			<button class="preodayButton pull-left" type="button" id="saveChangesModalCrop"><? echo _("SAVE CHANGES");?></button>
			<button class="preodayButton pull-left" type="button" id="cancelModalImageCrop"><? echo _("CANCEL"); ?></button>
		</div>
	</form>
</div>

<div id="modalTags" class="reveal-modal modal-preoday xsmall" data-options="closeOnBackgroundClick:false" data-reveal>
	<a class="close-reveal-modal">×</a>
	<form action="" method="POST" class="formTags">
		<div class="header-modalCrop spacing-modalCrop">
			<header class="title-notification" id="title-tags"></header>
		</div>

		<div class="content-modal content-modal-tags">
			<ul class="listTags"></ul>
		</div>

		<div class="footer-modalCrop spacing-modalCrop">
			<button class="preodayButton pull-left" type="button" id="saveChangesTags"><? echo _("SAVE CHANGES");?></button>
			<button class="preodayButton pull-left" type="button" id="cancelModalTags"><? echo _("CANCEL"); ?></button>
		</div>
	</form>
</div>

<div id="modalMinMaxMod" class="reveal-modal modal-preoday xsmall" data-options="closeOnBackgroundClick:false" data-reveal>
	<a class="close-reveal-modal">×</a>
	<form action="" method="POST" class="formMinMaxMod">
		<div class="spancing-modalMinMaxMod">
			<header class="title-notification" id="title-tags"><? echo _("Custom options");?></header>
		</div>

		<div class="content-modal">
			<div class='fields-container'>
				<label><? echo _("Min"); ?></label>
				<input type='text' pattern="^[0-9]*$" name='modMin'>
				<small class="error mMinError"><?echo _("Please enter the quantity");?></small>
			</div>
			<div class='fields-container'>
				<label><? echo _("Max"); ?></label>
				<input type='text' pattern="^[1-9]*$" name='modMax'>
				<small class="error mMaxError"><?echo _("Please enter the quantity");?></small>
			</div>
		</div>

		<div class="spancing-modalMinMaxMod">
			<button class="preodayButton pull-left" type="button" id="saveChangesMinMaxMod"><? echo _("SAVE CHANGES");?></button>
			<button class="preodayButton pull-left" type="button" id="cancelModalMinMaxMod"><? echo _("CANCEL"); ?></button>
		</div>
	</form>
</div>

<div class="loading" id="loadingMenuConfig">
  <div class="background-loading"></div>
  <div class="loading-content">
    <div class="spinner">
      <div class="b1 se"></div>
      <div class="b2 se"></div>
      <div class="b3 se"></div>
      <div class="b4 se"></div>
      <div class="b5 se"></div>
      <div class="b6 se"></div>
      <div class="b7 se"></div>
      <div class="b8 se"></div>
      <div class="b9 se"></div>
      <div class="b10 se"></div>
      <div class="b11 se"></div>
      <div class="b12 se"></div>
    </div>
  </div>
</div>

<script type="text/javascript">

(function($){
	$('#loadingConfig').hide();
}(jQuery))

</script>
<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {

	$('.progressIndicator').css('width','200%');
	$('.progressIndicator').attr('title', <? echo json_encode(_("45&#37 done, now for the fun bit!")) ?>);
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>

<?if($_SESSION['groupMenu']){?>
<script type="text/javascript">
$(document).ready(function() {

	var select, chosen;

	// cache the select element as we'll be using it a few times
	select = $(".promotions-select");

	// init the chosen plugin
	select.chosen({'disable_search': true, 'no_results_text': _tr('Press enter, space or comma to assign the promotion: ')});

	// get the chosen object (any type, single or multiple)
	chosen = $('.chosen-container');

	// Bind the keyup event to the search box input
	chosen.find('input').addClass('noEnterSubmit').attr('type', 'number').keyup( function(e) {

	    // if we hit Enter, Space or Comma and the results list is empty (no matches) add the option
	    if ((e.which == 13 || e.which == 32 || e.which == 188) && (chosen.find('.chosen-results > li').length == chosen.find('.result-selected').length || chosen.find('li.no-results').length > 0))
	    {
	    	if(select.find('option[value="' + this.value + '"]').length == 0) {

		    	// if(e.which == 188)
		    	// 	this.value = this.value.substr(0, this.value.length - 1);

		        var option = $("<option>").val(this.value).text(this.value).attr('selected', true);

		        select.trigger('change');

		        // add the new option
		        select.prepend(option);
		        // automatically select it
		        select.find(option).prop('selected', true);
		        // trigger the update
		        select.trigger("chosen:updated");
	    	}
	    }
	}).blur(function() {

		var e = $.Event('keyup');
    	e.which = 13;
		$(this).trigger(e)
	});

	// trigger edit menu when promotions were edited
	select.change(function() {

		$('#mName').attr('data-edit',true);
		$('#mName').data('edit',true);
	});

	if(getParameterByName('duplicated'))
		noty({
            type: 'success',
            text: _tr('Menu duplicated with success.')
        });


	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

});
</script>
<?}?>