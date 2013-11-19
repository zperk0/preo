<?if(!isset($_SESSION['event_edit_on'])) $_SESSION['event_edit_on']=0;?>
<form id="eventConfigForm" method="POST" data-abide>
	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h1><?echo _("Your events");?></h1>

			<!-- Hidden inputs here keep count of events -->
			<input type="hidden" id="eventCount"		name="eventCount" 		value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>
			<input type="hidden" id="eventCountAct" 	name="eventCountAct"	value="<?if($_SESSION['event_edit_on']) echo $eventCount; else echo "0";?>"/>

			<div class="row">
				<div class="large-12 columns">
					<button id="add_event" 	type="button" class="newEvent" title="<?echo _("Add a new event");?>"><i class="fi-plus"></i></button> <?echo _("Add a new event");?>
				</div>
			</div>

			<div class="row"> <!-- DUMMY -->
				<div class="large-12 columns">
					<table class="eventTable hide" id="event0" style="display:none;">
						<tbody>
							<tr class="eventEdit eventTR">
								<td class="eventTDName">
									<input type="hidden" name="eID[0]" value="e0" />
									<input type="text" name="eName[0]" class="eventField noEnterSubmit" value="<?echo _("Click to add an event name");?>" required/>
									<small class="error"><?echo _("Please type an event name");?></small>
								</td>
								<td class="eventTDDesc">
									<input type="text" name="eDesc[0]" class="eventField noEnterSubmit" placeholder="<?echo _("Click to add a description");?>"/>
									<small class="error"><?echo _("Please type a description");?></small>
								</td>
								<td class="eventTDDate">
									<input type="text" name="eDate[0]" class="eventField noEnterSubmit" value="<?echo _("DD/MM/YYYY");?>" required/>
									<small class="error"><?echo _("Date?");?></small>
								</td>
								<td class="eventTDTime">
									<input type="text" name="eTime[0]" class="eventField noEnterSubmit" value="<?echo _("HH:MM");?>" required/>
									<small class="error"><?echo _("Time?");?></small>
								</td>
								<td class="eventTDTime">
									<input type="text" name="eETime[0]" class="eventField noEnterSubmit" value="<?echo _("HH:MM");?>" required/>
									<small class="error"><?echo _("Time?");?></small>
								</td>
								
								<td class="eventTDVisi">
									<div class="switch tiny"> 
										<input name="eVisi[0]" value="0" type="radio">
										<label><?echo _("No");?></label>

										<input name="eVisi[0]" value="1" type="radio" checked>
										<label><?echo _("Yes");?></label>

										<span></span>
									</div>
								</td>
								<td class="eventTDTools">
									<button type="button" class="eventTableButtons eventSave"					title="<?echo _("Lock");?>"							><i class="icon-lock"></i></button>
									<button type="button" class="eventTableButtons eventTDEdit hide" 			title="<?echo _("Edit");?>"							><i class="fi-pencil"></i></button>
									<button type="button" class="eventTableButtons eventDuplicate" 				title="<?echo _("Duplicate");?>" id="dup0"			><i class="icon-copy"></i></button>
									<button type="button" class="eventTableButtons secondary eventDelete" 		title="<?echo _("Delete");?>"						><i class="fi-x"></i></button>
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
							<input type="text" name="eName[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo $event['name'];?>" required readonly="readonly"/>
							<small class="error"><?echo _("Please type an event name");?></small>
						</td>
						<td class="eventTDDesc">
							<input type="text" name="eDesc[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" <?if(!empty($event['description'])){?>value="<?echo $event['description'];?>"<?}?> placeholder="<?echo _("Click to add a description");?>" readonly="readonly"/>
							<small class="error"><?echo _("Please type a description");?></small>
						</td>
						<td class="eventTDDate">
							<input type="text" name="eDate[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('d/m/Y',strtotime($event['date']));?>" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required readonly="readonly"/>
							<small class="error"><?echo _("Date?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eTime[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('H:i',strtotime($event['starttime']));?>" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error"><?echo _("Time?");?></small>
						</td>
						<td class="eventTDTime">
							<input type="text" name="eETime[<?echo ($eKey+1);?>]" class="eventField noEnterSubmit" value="<?echo date('H:i',strtotime($event['endtime']));?>" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
							<small class="error"><?echo _("Time?");?></small>
						</td>
						
						<td class="eventTDVisi">
							<div class="switch tiny"> 
								<input name="eVisi[<?echo ($eKey+1);?>]" value="0" type="radio" <?if(!$event['visible']) echo "checked";?>>
								<label><?echo _("No");?></label>

								<input name="eVisi[<?echo ($eKey+1);?>]" value="1" type="radio"  <?if($event['visible']) echo "checked";?>>
								<label><?echo _("Yes");?></label>

								<span></span>
							</div>
						</td>
						<td class="eventTDTools">
							<button type="button" class="eventTableButtons eventSave hide" 			title="<?echo _("Lock");?>"										><i class="icon-lock"></i></button>
							<button type="button" class="eventTableButtons eventTDEdit" 			title="<?echo _("Edit");?>"										><i class="fi-pencil"></i></button>
							<button type="button" class="eventTableButtons eventDuplicate" 			title="<?echo _("Duplicate");?>" id="dup<?echo ($eKey+1);?>"	><i class="icon-copy"></i></button>
							<button type="button" class="eventTableButtons secondary eventDelete" 	title="<?echo _("Delete");?>"									><i class="fi-x"></i></button>
						</td>
					</tr>
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
			<button type="submit"><?echo _("SAVE CHANGES");?></button>
		</div>
	</div>
</form>