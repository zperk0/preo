<?if(!isset($_SESSION['menu_edit_on'])) $_SESSION['menu_edit_on']=0;?>
<form id="menuConfigForm" method="POST" data-abide>
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
			<?if(!$_SESSION['noPaymentFlag']){?>
				<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
			<?}else{?>
				<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
			<?}?>
			
			<a class="unavailable" href="#"><? echo _("Done");?></a>
		</nav>
		<?}?>
		<div class="large-12 columns">

			<h1><?if(!$_SESSION['menu_edit_on'] && !isset($menu)) echo _("Build your menu"); else echo _("Your menu");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Now it's time to create your menu. We suggest you keep it simple to start with.<br/><br/>An easy way is to group items, i.e. create separate sections for food, cold drinks and hot drinks.");?>"></i></h1>

			<!-- Hidden inputs here keep count of menu items and options -->
			<input type="hidden" id="sectionCount" 			name="sectionCount"			value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>
			<input type="hidden" id="sectionCountAct" 		name="sectionCountAct"		value="<?if($_SESSION['menu_edit_on']) echo $sectionCount; else echo "0";?>"/>
			
			<input type="hidden" id="itemCount"				name="itemCount" 			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>
			<input type="hidden" id="itemCountAct" 			name="itemCountAct"			value="<?if($_SESSION['menu_edit_on']) echo $itemCount; else echo "0";?>"/>
			
			<input type="hidden" id="item0_optionCount" 	name="item0_optionCount"	value="0"/>
			<input type="hidden" id="item0_optionCountAct" 	name="item0_optionCountAct" value="0"/>
			
			<input type="hidden" id="item0_modCount" 		name="item0_modCount"	 	value="0"/>
			<input type="hidden" id="item0_modCountAct" 	name="item0_modCountAct" 	value="0"/>
			
			<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag?>"/>
			
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
				<input type="text" name="mName" id="mName" class="menuField noEnterSubmit" value="<?if($_SESSION['menu_edit_on'] || (isset($menu) && count($menu)) ) echo $menu['name'];?>" placeholder="<?echo _("Click to add your menu name");?>" required tabindex=1 pattern="^.{0,99}$"/>
				<small class="error"><?echo _("Please type a menu name (max 100chars)");?></small>
			</div>

			<div class="hide" id="menuSectionRow"> <!-- DUMMY -->
				<div class="row">
					<div class="large-12 columns menuSectionDiv">
						<input type="text" name="mSectionName[0]" class="menuField menuSectionField noEnterSubmit" value="<?echo _("Click to add a section name");?>" required pattern="^.{0,99}$"/>
						<small class="error smallerror"><?echo _("Please type a section name (max 100chars)");?></small>
					</div>
				</div>
				<div class="row">
					<div class="large-12 columns sectionTools">
						<button id="add_section0" 		type="button" class="newItem" 						title="<?echo _("Add an item to this section");?>"	><i class="pd-add"></i></button> <?echo _("Add an item to this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
						<div class="showOnHover">
							<button 						type="button" class="sortSecHandle"				title="<?echo _("Move this section");?>"			><i class="pd-move"></i></button> <?echo _("Move this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
							<button id="delete_section0" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"			><i class="pd-delete"></i></button> <?echo _("Delete this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div class="row hasTableHeader">
					<table class="headerTable">
						<thead>
							<tr>
								<th class="menuTDName"><? echo _("Name");?></th>
								<th class="menuTDDesc"><? echo _("Description");?></th>
								<th class="menuTDPrice"><? echo _("Price (&pound;)");?></th>
								<!--<th class="menuTDQuant"><? echo _("Quantity");?></th>
								<th class="menuTDVisi"><? echo _("Visible?");?></th>-->
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
							<input type="text" name="iName[section0][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an item name (max 100chars)");?>" required pattern="^.{0,99}$"/>
							<small class="error"><?echo _("Please type an item name (max 100chars)");?></small>
						</td>
						<td class="menuTDDesc">
							<input type="text" name="iDesc[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Optional description");?>" pattern="^.{0,99}$"/>
							<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
						</td>
						<td class="menuTDPrice">
							<input type="text" name="iPrice[section0][0]" class="menuField noEnterSubmit" value="<?echo _("&pound.&pound&pound");?>" required/>
							
							</td>
						<td class="menuTDQuant hide">
							<input type="text" name="iQuan[section0][0]" class="menuField noEnterSubmit" placeholder="<?echo _("Unlimited");?>"/>
						</td>
						<td class="menuTDVisi hide">
							<div class="switch tiny" title="<?echo _("This chooses whether you want to activate this food on the menu or not.");?>"> 
								<input name="iVisi[section0][0]" value="0" type="radio">
								<label><?echo _("No");?></label>

								<input name="iVisi[section0][0]" value="1" type="radio" checked>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="menuTDTools">
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
							<input type="text" name="iMod[item0][m0]" class="menuField noEnterSubmit" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" placeholder="<?echo _("Type or pick an option title");?>" pattern="^.{0,99}$"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Pick a size, Choice of an option, Add some extras, Select a side");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
							<small class="error smallerror"><?echo _("Please type or pick a title");?></small>
						</td>
						<td class="modifierRow hide">
							<select class="menuField noEnterSubmit inline" name="iModType[item0][m0]"> <!-- Dummy does not have itemMenuSingleSelect -->
								<option value="S" title="<?echo _("User must select only one option.");?>"><?echo _("User selects 1 option");?></option> <!-- min=1,max=1 -->
								<option value="M" title="<?echo _("User must select one or more options.");?>"><?echo _("User selects 1 or more options");?></option> <!-- min=1,max=-1 -->
								<option value="O" title="<?echo _("User can select zero or more options.");?>"><?echo _("User selects 0 or more options");?></option> <!-- min=0,max=-1 -->
							</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Single: When the user must pick only 1 option.<br/><br/>Multiple: When the user must pick 1 or more options.<br/><br/>Optional: when the user can pick 0 or multiple options.");?>"></i>
							<small class="error"><?echo _("Please choose a type");?></small>
						</td>
					</tr>
					<tr class="menuEdit hide" style="display:none;">
						<td class="menuTDName">
							<input type="text" name="oName[item0][m0][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required pattern="^.{0,99}$"/>
							<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
						</td>
						<td class="menuTDDesc">
						</td>
						<td class="menuTDPrice">
							<input type="text" name="oPrice[item0][m0][0]" class="menuField noEnterSubmit" value="<?echo _("&pound.&pound&pound");?>" required/>
							&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
						</td>
						<td class="menuTDQuant hide">
						</td>
						<td class="menuTDVisi hide">
							<div class="switch tiny"> 
								<input name="oVisi[item0][m0][0]" value="0" type="radio">
								<label><?echo _("No");?></label>

								<input name="oVisi[item0][m0][0]" value="1" type="radio" checked>
								<label><?echo _("Yes");?></label>

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
		?>
			<div class="moveSec">
				<div class="moveSecInner">
					<div id="menuSectionRow">
						<div class="row">
							<div class="large-12 columns menuSectionDiv">
								<input type="text" name="mSectionName[<?echo ($sKey+1);?>]" class="menuField menuSectionField noEnterSubmit section<?echo ($sKey+1);?>" value="<?echo $section['name'];?>" placeholder="<?echo _("Click to add a section name");?>" required pattern="^.{0,99}$"/>
								<small class="error smallerror"><?echo _("Please type a section name (max 100chars)");?></small>
							</div>
						</div>
						<div class="row">
							<div class="large-12 columns sectionTools">
								<button id="add_section<?echo ($sKey+1);?>" 	type="button" class="newItem" 					title="<?echo _("Add an item to this section");?>"	><i class="pd-add"></i></button> <?echo _("Add an item to this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
								<div class="showOnHover">
									<button 						type="button" class="sortSecHandle"								title="<?echo _("Move this section");?>"			><i class="pd-move"></i></button> <?echo _("Move this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
									<button id="delete_section<?echo ($sKey+1);?>" 	type="button" class="deleteSection secondary" 	title="<?echo _("Delete this section");?>"			><i class="pd-delete"></i></button> <?echo _("Delete this section");?>&nbsp;&nbsp;&nbsp;&nbsp;
								</div>
							</div>
						</div>
						<div class="row hasTableHeader">
							<table class="headerTable">
								<thead>
									<tr>
										<th class="menuTDName"><? echo _("Name");?></th>
										<th class="menuTDDesc"><? echo _("Description");?></th>
										<th class="menuTDPrice"><? echo _("Price (&pound;)");?></th>
										<!--<th class="menuTDQuant"><? echo _("Quantity");?></th>
										<th class="menuTDVisi"><? echo _("Visible?");?></th>-->
										<th class="menuTDTools"><? echo _("Tools");?></th>
									</tr>
								</thead>
							</table>
						</div>
						<div class="sortWithinDiv">
						<?foreach($section['items'] as $item){ 
						//again remember its all 1-indexed thats why we add +1 to the key
							if($item['mealDeal']) continue;	
						?>
							<table class="menuTable tablesection<?echo ($sKey+1);?>" id="item<?echo ($iKey+1)?>" style="background:transparent">
								<tbody>
									<tr class="savedInput itemTR">
										<td class="menuTDName">
											<input type="text" name="iName[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?echo $item['name'];?>" required readonly="readonly" pattern="^.{0,99}$"/>
											<small class="error"><?echo _("Please type an item name (max 100chars)");?></small>
										</td>
										<td class="menuTDDesc">
											<input type="text" name="iDesc[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?if(!empty($item['description'])) echo $item['description'];?>" placeholder="<?echo _("Optional description");?>"  readonly="readonly" pattern="^.{0,250}$"/>
											<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
										</td>
										<td class="menuTDPrice">
											<input type="text" name="iPrice[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" value="<?echo number_format($item['price'],2,'.','');?>" required  readonly="readonly"/>
											</td>
										<td class="menuTDQuant hide">
											<input type="text" name="iQuan[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" class="menuField noEnterSubmit" <?if($item['quantity']){?>value="<?echo $item['quantity']?>"<?}else{?>placeholder="<?echo _("Unlimited");}?>"  readonly="readonly"/>
										</td>
										<td class="menuTDVisi hide">
											<div class="switch tiny" title="<?echo _("This chooses whether you want to activate this food on the menu or not.");?>"> 
												<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="0" type="radio" <?if(!$item['visible']){?>checked<?}?>>
												<label><?echo _("No");?></label>

												<input name="iVisi[section<?echo ($sKey+1);?>][<?echo ($iKey+1);?>]" value="1" type="radio" <?if($item['visible']){?>checked<?}?>>
												<label><?echo _("Yes");?></label>

												<span></span>
											</div>
										</td>
										<td class="menuTDTools">
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
													<input type="text" name="iMod[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>]" style="background: #3AA2DC !important;color: #FFFFFF !important; font-size: 14px !important;" class="menuField noEnterSubmit hide" placeholder="<?echo _("Type or pick an option title");?>" value="<?echo $modifier['name'];?>" required pattern="^.{0,99}$"/>&nbsp;<i data-tooltip class="inline icon-question-sign preoTips has-tip tip-bottom" title="<? echo _("Eg. Pick a size, Choice of an option, Add some extras, Select a side");?>"></i><span class="showAChevy"><i class="pd-down"></i></span>
													<small class="error smallerror"><?echo _("Please type or pick a title");?></small>
												</td>
												<td class="modifierRow hide">
													<select class="menuField noEnterSubmit inline itemMenuSingleSelect" style="display:none;" name="iModType[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>]">
														<option value="S" title="<?echo _("User must select only one option.");?>" <?if($modifier['minChoices']==1 && $modifier['maxChoices']==1){?>selected="selected"<?}?> ><?echo _("User selects 1 option");?></option> <!-- min=1,max=1 -->
														<option value="M" title="<?echo _("User must select one or more options.");?>" <?if($modifier['minChoices']==1 && $modifier['maxChoices']==-1){?>selected="selected"<?}?>><?echo _("User selects 1 or more options");?></option> <!-- min=1,max=-1 -->
														<option value="O" title="<?echo _("User can select zero or more options.");?>" <?if($modifier['minChoices']==0 && $modifier['maxChoices']==-1){?>selected="selected"<?}?>><?echo _("User selects 0 or more options");?></option> <!-- min=0,max=-1 -->
													</select>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("Single: When the user must pick only 1 option.<br/><br/>Multiple: When the user must pick 1 or more options.<br/><br/>Optional: when the user can pick 0 or multiple options.");?>"></i>
													<small class="error"><?echo _("Please choose a type");?></small>
												</td>
											</tr>
											<tr class="menuEdit hide" style="display:none;"> <!-- This dummy is required! -->
												<td class="menuTDName">
													<input type="text" name="oName[item<?echo ($iKey+1);?>][m0][0]" class="menuField noEnterSubmit" value="<?echo _("Click to add an option name");?>" required pattern="^.{0,99}$"/>
													<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
												</td>
												<td class="menuTDDesc">
												</td>
												<td class="menuTDPrice">
													<input type="text" name="oPrice[item<?echo ($iKey+1);?>][m0][0]" class="menuField noEnterSubmit" value="<?echo _("&pound.&pound&pound");?>" required/>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
													</td>
												<td class="menuTDQuant hide">
												</td>
												<td class="menuTDVisi hide">
													<div class="switch tiny"> 
														<input name="oVisi[item<?echo ($iKey+1);?>][m0][0]" value="0" type="radio">
														<label><?echo _("No");?></label>

														<input name="oVisi[item<?echo ($iKey+1);?>][m0][0]" value="1" type="radio" checked>
														<label><?echo _("Yes");?></label>

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
														<input type="text" name="oName[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" class="menuField noEnterSubmit" value="<?echo $option['name'];?>" required  readonly="readonly" pattern="^.{0,99}$"/>
														<small class="error"><?echo _("Please type an option name (max 100chars)");?></small>
													</td>
													<td class="menuTDDesc">
													</td>
													<td class="menuTDPrice">
														<input type="text" name="oPrice[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" class="menuField noEnterSubmit" value="<?echo number_format($option['price'],2,'.','');?>" required  readonly="readonly"/>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("This will be in addition to the item price. If there is no price difference, put in 0.00.");?>"></i>
														</td>
													<td class="menuTDQuant hide">
													</td>
													<td class="menuTDVisi hide">
														<div class="switch tiny"> 
															<input name="oVisi[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" value="0" type="radio" <?if(!$option['visible']){?>checked<?}?>>
															<label><?echo _("No");?></label>

															<input name="oVisi[item<?echo ($iKey+1);?>][m<?echo ($modiKey+1);?>][<?echo ($oKey+1);?>]" value="1" type="radio" <?if($option['visible']){?>checked<?}?>>
															<label><?echo _("Yes");?></label>

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
			<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
				<!--<button id="menuSaveButtonE" type="submit"><?echo _("SAVE & CONTINUE EDITING");?></button> HIDDEN UNTIL PWA-116 -->
				<button id="menuSaveButton" type="submit"><?echo _("SAVE & FINISH");?></button>
			<?}else{?>
				<button id="menuSaveButton" type="submit"><?echo _("SAVE CHANGES");?></button>
			<?}?>
			<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
		</div>
	</div>
</form>

<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
<!-- Now we update progressBar tooltip, width and trigger mouseover -->
<script type="text/javascript">
$(document).ready(function() {
	$('.progressIndicator').css('width','200%');
	$('.progressIndicator').attr('title', "45% done, now for the fun bit!");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>