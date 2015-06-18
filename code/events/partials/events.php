<div class='event-view' ng-controller="EventsCtrl as eventsCtrl">
	<?if(!isset($_SESSION['event_edit_on'])) $_SESSION['event_edit_on']=0;?>
	<form id="eventConfigForm" method="POST" data-abide>
		<div class="row">
			<div class="topSpacer"></div>
			<?if(isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag']){ ?>
				<nav class="breadcrumbs row--space1d">
					<a href="<?echo $_SESSION['path']?>/settings"><? echo _("Venue Information");?></a>
					<a href="<?echo $_SESSION['path']?>/homescreen"><? echo _("App Styling 1/2");?></a>
					<a href="<?echo $_SESSION['path']?>/menuscreen"><? echo _("App Styling 2/2");?></a>
					<a href="<?echo $_SESSION['path']?>/menus/<?echo $_SESSION['menus'][0]['id'];?>?r=1"><? echo _("Menu Creation");?></a>
					<?if(isset($_SESSION['venue_eventFlag']) && $_SESSION['venue_eventFlag']){?><a class="current" href="#"><? echo _("Events");?></a>
					<?}else{?><a class="current" href="#"><? echo _("Opening Hours");?></a><?}?>
					<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
					
					<a class="unavailable" href="#"><? echo _("Done");?></a>
				</nav>
			<?}?>
			<div class="large-12 columns">
				<h1><?echo _("Your events");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("These show when you are open for ordering, such as performances or matches. They can be viewed from the front page of your app");?>"></i></h1>

				<!-- Hidden inputs here keep count of events -->
				<input type="hidden" id="eventCount"			name="eventCount" 				ng-value="<?php if($_SESSION['event_edit_on']) echo "eventsCtrl.length"; else echo "0";?>"/>
				<input type="hidden" id="eventCountAct" 		name="eventCountAct"			ng-value="<?php if($_SESSION['event_edit_on']) echo "eventsCtrl.length"; else echo "0";?>"/>
				<input type="hidden" id="event0_optionCount"	name="event0_optionCount" 		ng-value="<?php if($_SESSION['event_edit_on']) echo "eventsCtrl.length"; else echo "0";?>"/>
				<input type="hidden" id="event0_optionCountAct" name="event0_optionCountAct" 	ng-value="<?php if($_SESSION['event_edit_on']) echo "eventsCtrl.length"; else echo "0";?>"/>
				
				<input type="hidden" id="redirectFlag" ng-value="eventsCtrl.redirectFlag"/>
				
				<?if($_SESSION['event_edit_on']) :
					foreach($events as $eKey=>$event)
					{
						//we have to keep this 1-indexed for consistency
						?>
						<input type="hidden" id="event<?echo ($eKey+1)?>_optionCount" 	 name="event<?echo ($eKey+1)?>_optionCount"	   value="<?echo $event['collectionCount'];?>"/>
						<input type="hidden" id="event<?echo ($eKey+1)?>_optionCountAct" name="event<?echo ($eKey+1)?>_optionCountAct" value="<?echo $event['collectionCount'];?>"/>
						<?
					}
				endif; ?>

				<div class="row">
					<div class="large-12 columns">
						<button id="add_event" 	type="button" class="newEvent" title="<?echo _("Add a new event");?>"><i class="pd-add"></i></button> <?echo _("Add a new event");?>
					</div>
				</div>
				
				<table class="headerTable">
					<thead>
						<tr>
							<th class="eventTDName" ><? echo _("Name");?></th>
							<th class="eventTDDesc" ><? echo _("Description");?></th>
							<th class="eventTDDate" ><? echo _("Start Date");?></th>
							<th class="eventTDTime" ><? echo _("Start Time");?></th>
							<th class="eventTDTime" ><? echo _("End Time");?></th>
							<th class="eventTDVisi hide" ><? echo _("Visible?");?></th>
							<th class="eventTDTools"><? echo _("Tools");?></th>
						</tr>
					</thead>
				</table>

				<div class="row"> <!-- DUMMY -->
					<div class="large-12 columns">
						<table class="eventTable hide" id="event0" style="display:none;">
							<tbody>
								<tr class="eventEdit eventTR">
									<td class="eventTDName">
										<input type="hidden" name="eID[0]" value="e0" />
										<input type="text" name="eName[0]" class="eventField noEnterSubmit" value="<?echo _("Click to add an event name");?>"  pattern="^.{0,99}$" required/>
										<small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
									</td>
									<td class="eventTDDesc">
										<input type="text" name="eDesc[0]" class="eventField noEnterSubmit" placeholder="<?echo _("Click to add a description");?>"  pattern="^.{0,250}$"/>
										<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
									</td>
									<td class="eventTDDate">
										<input type="text" name="eDate[0]" class="eventField noEnterSubmit" value="<?echo _("DD/MM/YYYY");?>" required/>
										<small class="error"><?echo _("Date?");?></small>
									</td>
									<td class="eventTDTime">
										<input type="text" name="eTime[0]" class="eventField noEnterSubmit" value="<?echo _("HH:MM");?>" required/>
										<small class="error priceError"><?echo _("Time?");?></small>
									</td>
									<td class="eventTDTime">
										<input type="text" name="eETime[0]" class="eventField noEnterSubmit" value="<?echo _("HH:MM");?>" required/>
										<small class="error priceError"><?echo _("Time?");?></small>
									</td>
									
									<td class="eventTDVisi hide">
										<div class="switch tiny"> 
											<input name="eVisi[0]" value="0" type="radio">
											<label><?echo _("No");?></label>

											<input name="eVisi[0]" value="1" type="radio" checked>
											<label><?echo _("Yes");?></label>

											<span></span>
										</div>
									</td>
									<td class="eventTDTools">
										<button type="button" class="eventTableButtons eventSave"					title="<?echo _("Collapse");?>"							><i class="pd-up"></i></button>
										<button type="button" class="eventTableButtons eventTDEdit hide" 			title="<?echo _("Edit");?>"							><i class="pd-edit"></i></button>
										<button type="button" class="eventTableButtons eventDuplicate" 				title="<?echo _("Duplicate");?>" id="dup0"			><i class="pd-copy"></i></button>
										<button type="button" class="eventTableButtons secondary eventDelete" 		title="<?echo _("Delete");?>"						><i class="pd-delete"></i></button>
									</td>
								</tr>
								<tr ng-if='eventsCtrl.outletLocations.length > 0' class="eventEdit optionTR savedInput" required>
									<td class="eventTDOutletLocation">
										<select name="eOutletLocation[0]" class="eventField noEnterSubmit inline"/> 
											<option value=""  ><?= _("All Locations")?></option>
											<option ng-repeat='outletLocation in eventsCtrl.outletLocations' ng-value="outletLocation.id">{{ outletLocation.name }}</option>
										</select>
									</td>								
								</tr>
								<tr class="eventEdit optionTR ">
									<td class="eventTDCollection">
										<label>&nbsp;</label>
										<select name="eColl[event0][0]" class="eventField noEnterSubmit inline" style="display:none;" required> <!-- Dummy does not have eventMenuSingleSelect -->
											<option value="PRESHOW"  ><?echo _("Collection Slot: Pre-Show")?></option>
											<option value="PREGAME"  ><?echo _("Collection Slot: Pre-Game")?></option>
											<option value="INTERVAL" ><?echo _("Collection Slot: Interval")?></option>
											<option value="INTERVAL2"><?echo _("Collection Slot: Second-Interval")?></option>
											<option value="HALFTIME" ><?echo _("Collection Slot: Half-time")?></option>
											<option value="POSTSHOW" ><?echo _("Collection Slot: Post-Show")?></option>
											<option value="POSTGAME" ><?echo _("Collection Slot: Post-Game")?></option>
										</select>
										<small class="error"><?echo _("Please choose a slot.");?></small>
									</td>
									<td class="eventTDLead">
										<label><?echo _("Lead Time (mins)");?></label>
										<input type="text" name="eLead[event0][0]" class="eventField noEnterSubmit" value="<?echo _("30");?>" required pattern="^\d+$"/>
										<small class="error"><?echo _("Time?");?></small>
									</td>
									<td class="eventTDAddMore">
										<button type="button" class="newCollSlot" title="<?echo _("Add another slot");?>"><i class="pd-add"></i></button>
									</td>								
								</tr>							
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
			<table class="eventTable" ng-repeat='event in eventsCtrl.events' id="event{{ $index + 1 }}">
				<tbody>
					<tr class="savedInput eventTR">
						<td class="eventTDName">
							<input type="hidden" name="eID[{{ $index + 1 }}]" ng-value="event.id" />
							<input type="text" name="eName[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="event.name"  pattern="^.{0,99}$" required readonly="readonly"/>
							<small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
						</td>
						<td class="eventTDDesc">
							<input type="text" name="eDesc[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="event.description" placeholder="<?echo _("Click to add a description");?>" readonly="readonly" pattern="^.{0,250}$"/>
							<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
						</td>
						<td class="eventTDDate">
							<input type="text" name="eDate[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="eventsCtrl.formatDate(event.date)" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required readonly="readonly"/>
							<small class="error"><?echo _("Date?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eTime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="eventsCtrl.formatTime(event.starttime)" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error priceError"><?echo _("Time?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eETime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="eventsCtrl.formatTime(event.endtime)" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error priceError"><?echo _("Time?");?></small>
						</td>
						
						<td class="eventTDVisi hide">

							<div class="switch tiny"> 
								<input name="eVisi[{{ $index + 1 }}]" value="0" type="radio" ng-checked="event.visible">
								<label><?echo _("Yes");?></label>
								
								<input name="eVisi[{{ $index + 1 }}]" value="0" type="radio" ng-checked="event.visible">
								<label><?echo _("No");?></label>
							</div>

						</td>
						<td class="eventTDTools">
							<button type="button" class="eventTableButtons eventSave hide" 			title="<?echo _("Collapse");?>"										><i class="pd-up"></i></button>
							<button type="button" class="eventTableButtons eventTDEdit" 			title="<?echo _("Edit");?>"										><i class="pd-edit"></i></button>
							<button type="button" class="eventTableButtons eventDuplicate" 			title="<?echo _("Duplicate");?>" id="dup{{ $index + 1 }}"	><i class="pd-copy"></i></button>
							<button type="button" class="eventTableButtons secondary eventDelete" 	title="<?echo _("Delete");?>"									><i class="pd-delete"></i></button>
						</td>
					</tr>
					<tr ng-if='eventsCtrl.outletLocations.length > 0' class="eventEdit optionTR savedInput" style="display:none;" required>
						<td class="eventTDOutletLocation">
							<select name="eOutletLocation[{{ $index + 1 }}]" ng-model='event.outletLocationId' class="eventField noEnterSubmit inline" class="eventField noEnterSubmit inline eventMenuSingleSelect selectOutletLocation hide"> 
								<option value=""  ><?= _("All Locations")?></option>
								<option ng-repeat='outletLocation in eventsCtrl.outletLocations' ng-value="outletLocation.id">{{outletLocation.name}}</option>											
							</select>
						</td>
					</tr>

					<tr ng-repeat='slot in event.cSlots' class="eventEdit optionTR savedInput" style="display:none;" required>
						<td class="eventTDCollection">
							<label>&nbsp;</label>
							<select ng-model='slot.collectionslot' name="eColl[event{{ $parent.$index + 1 }}][{{$index + 1}}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectCollectionSlot hide">
								<option value="PRESHOW"><?echo _("Collection Slot: Pre-Show")?></option>
								<option value="PREGAME"><?echo _("Collection Slot: Pre-Game")?></option>
								<option value="INTERVAL"><?echo _("Collection Slot: Interval")?></option>
								<option value="INTERVAL2"><?echo _("Collection Slot: Second-Interval")?></option>
								<option value="HALFTIME"><?echo _("Collection Slot: Half-Time")?></option>
								<option value="POSTSHOW"><?echo _("Collection Slot: Post-Show")?></option>
								<option value="POSTGAME"><?echo _("Collection Slot: Post-Game")?></option>
							</select>
							<small class="error"><?echo _("Please choose a slot.");?></small>
						</td>
						<td class="eventTDLead">
							<label><?echo _("Lead Time (mins)");?></label>
							<input type="text" name="eLead[event{{ $parent.$index + 1 }}][{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="slot.leadtime" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
							<small class="error"><?echo _("Time?");?></small>
						</td>
						<td class="eventTDAddMore">
							<button ng-if='$index == 0' type="button" class="newCollSlot" title="<?echo _("Add another slot");?>"><i class="pd-add"></i></button>
							<button ng-if='$index != 0' type="button" class="delCollSlot secondary" title="Delete this slot"><i class="pd-delete"></i></button>
						</td>						
					</tr>			
				</tbody>
			</table>
			<div class="hide firstEventDiv"></div> <!-- Dummy hook -->
		</div>
				
		<div class="row">
			<div class="small-12 large-4 columns">
				<button id="eventSubButton" type="submit"><?echo _("SAVE CHANGES");?></button>
				<button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
			</div>
		</div>
	</form>
	<?if((isset($_SESSION['signupWizFlag']) && $_SESSION['signupWizFlag'])){?>
	<script type="text/javascript">
	$(document).ready(function() {

		$('.progressIndicator').css('width','350%');
		$('.progressIndicator').attr('title', <? echo json_encode(_("75&#37 done, almost there now...")) ?>) ;
		setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
		setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
	});
	</script>
	<?}?>
</div>