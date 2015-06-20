<table class="eventTable" ng-repeat='event in eventsCtrl.events' id="event{{ $index + 1 }}" style='background: transparent;'>
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
					<option value=""  ><?echo _("All Locations")?></option>
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