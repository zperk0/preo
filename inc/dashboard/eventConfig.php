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
				<?if(!$_SESSION['noPaymentFlag']){?>
					<a href="<?echo $_SESSION['path']?>/payment"><? echo _("Payment Method");?></a>
				<?}else{?>
					<a class="unavailable" href="#"><? echo _("Add a Payment");?></a>
				<?}?>
				
				<a class="unavailable" href="#"><? echo _("Done");?></a>
			</nav>
		<?}?>
		<div class="large-12 columns">
			<h1><?echo _("Your events");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("These show when you are open for ordering, such as performances or matches. They can be viewed from the front page of your app");?>"></i></h1>

			<!-- Hidden inputs here keep count of events -->
			<input type="hidden" id="eventCount"			name="eventCount" 				value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>
			<input type="hidden" id="eventCountAct" 		name="eventCountAct"			value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>
			<input type="hidden" id="event0_optionCount"	name="event0_optionCount" 		value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>
			<input type="hidden" id="event0_optionCountAct" name="event0_optionCountAct" 	value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>
			
			<input type="hidden" id="redirectFlag" value="<?echo $redirectFlag;?>"/>
			
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
									<small class="error smallerror"><?echo _("Time?");?></small>
								</td>
								<td class="eventTDTime">
									<input type="text" name="eETime[0]" class="eventField noEnterSubmit" value="<?echo _("HH:MM");?>" required/>
									<small class="error smallerror"><?echo _("Time?");?></small>
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
							<tr class="eventEdit optionTR">
								<td class="eventTDCollection">
									<label>&nbsp;</label>
									<select name="eColl[event0][0]" class="eventField noEnterSubmit inline" style="display:none;" required/> <!-- Dummy does not have eventMenuSingleSelect -->
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
								<td class="eventTDSpace">
									<span>&nbsp;</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
	<?if($_SESSION['event_edit_on']){
		foreach($events as $eKey=>$event){
		//again remember its all 1-indexed thats why we add +1 to the key
		?>
			<table class="eventTable" id="event<?echo ($eKey+1)?>" style="background:transparent">
				<tbody>
					<tr class="savedInput eventTR">
						<td class="eventTDName">
							<input type="hidden" name="eID[<?echo ($eKey+1);?>]" value="<?echo $event['id'];?>" />
							<input type="text" name="eName[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo $event['name'];?>"  pattern="^.{0,99}$" required readonly="readonly"/>
							<small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
						</td>
						<td class="eventTDDesc">
							<input type="text" name="eDesc[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" <?if(!empty($event['description'])){?>value="<?echo $event['description'];?>"<?}?> placeholder="<?echo _("Click to add a description");?>" readonly="readonly"  pattern="^.{0,250}$"/>
							<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
						</td>
						<td class="eventTDDate">
							<input type="text" name="eDate[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('d/m/Y',strtotime($event['date']));?>" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required readonly="readonly"/>
							<small class="error"><?echo _("Date?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eTime[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('H:i',strtotime($event['starttime']));?>" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error smallerror"><?echo _("Time?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eETime[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('H:i',strtotime($event['endtime']));?>" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error smallerror"><?echo _("Time?");?></small>
						</td>
						
						<td class="eventTDVisi hide">
							<div class="switch tiny"> 
								<input name="eVisi[<?echo ($eKey+1);?>]" value="0" type="radio" <?if(!$event['visible']) echo "checked";?>>
								<label><?echo _("No");?></label>

								<input name="eVisi[<?echo ($eKey+1);?>]" value="1" type="radio"  <?if($event['visible']) echo "checked";?>>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="eventTDTools">
							<button type="button" class="eventTableButtons eventSave hide" 			title="<?echo _("Collapse");?>"										><i class="pd-up"></i></button>
							<button type="button" class="eventTableButtons eventTDEdit" 			title="<?echo _("Edit");?>"										><i class="pd-edit"></i></button>
							<button type="button" class="eventTableButtons eventDuplicate" 			title="<?echo _("Duplicate");?>" id="dup<?echo ($eKey+1);?>"	><i class="pd-copy"></i></button>
							<button type="button" class="eventTableButtons secondary eventDelete" 	title="<?echo _("Delete");?>"									><i class="pd-delete"></i></button>
						</td>
					</tr>
					<?foreach($event['cSlots'] as $cKey=>$cSlot){?>
					<tr class="eventEdit optionTR savedInput" style="display:none;" required>
						<td class="eventTDCollection">
							<label>&nbsp;</label>
							<select name="eColl[event<?echo ($eKey+1);?>][<?echo ($cKey+1);?>]" class="eventField noEnterSubmit inline eventMenuSingleSelect hide"/>
								<option value="PRESHOW"  <?if($cSlot['collectionslot']=='PRESHOW'  ) echo "selected='selected'";?>><?echo _("Collection Slot: Pre-Show")?></option>
								<option value="PREGAME"  <?if($cSlot['collectionslot']=='PREGAME'  ) echo "selected='selected'";?>><?echo _("Collection Slot: Pre-Game")?></option>
								<option value="INTERVAL" <?if($cSlot['collectionslot']=='INTERVAL') echo "selected='selected'";?>><?echo _("Collection Slot: Interval")?></option>
								<option value="INTERVAL2"<?if($cSlot['collectionslot']=='INTERVAL2') echo "selected='selected'";?>><?echo _("Collection Slot: Second-Interval")?></option>
								<option value="HALFTIME" <?if($cSlot['collectionslot']=='HALFTIME' ) echo "selected='selected'";?>><?echo _("Collection Slot: Half-Time")?></option>
								<option value="POSTSHOW" <?if($cSlot['collectionslot']=='POSTSHOW' ) echo "selected='selected'";?>><?echo _("Collection Slot: Post-Show")?></option>
								<option value="POSTGAME" <?if($cSlot['collectionslot']=='POSTGAME' ) echo "selected='selected'";?>><?echo _("Collection Slot: Post-Game")?></option>
							</select>
							<small class="error"><?echo _("Please choose a slot.");?></small>
						</td>
						<td class="eventTDLead">
							<label><?echo _("Lead Time (mins)");?></label>
							<input type="text" name="eLead[event<?echo ($eKey+1);?>][<?echo ($cKey+1);?>]" class="eventField noEnterSubmit" value="<?echo $cSlot['leadtime'];?>" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
							<small class="error"><?echo _("Time?");?></small>
						</td>
						<td class="eventTDAddMore">
							<button type="button" class="newCollSlot" title="<?echo _("Add another slot");?>"><i class="pd-add"></i></button>
						</td>
						<td class="eventTDSpace">
							<span>&nbsp;</span>
						</td>
					</tr>
					<?}?>
				</tbody>
			</table>
			<script>
				$(document).ready(function() {
				//now we add datepicker
				$('input[name="eDate[<?echo ($eKey+1);?>]"]').fdatepicker({format:'dd/mm/yyyy'}); 
				
				//now we add timepicker
				$('input[name="eTime[<?echo ($eKey+1);?>]"]').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
				$('input[name="eETime[<?echo ($eKey+1);?>]"]').timepicker({'showDuration': true, 'timeFormat': 'H:i', 'step': 15 }); 
			});
			</script>
		<?
			$eKey++;
		}
	}?>
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
	$('.progressIndicator').attr('title', "75% done, almost there now...");
	setTimeout(function() { $('.progressIndicator').trigger("mouseover"); }, 1100);
	setTimeout(function() { $('.progressIndicator').trigger("mouseout"); }, 7500);
});
</script>
<?}?>