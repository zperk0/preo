<table class="eventTable" ng-repeat='event in events track by $index' id="event{{ $index + 1 }}" style='background: transparent;'>
	<tbody>
		<tr class="savedInput eventTR">
			<td class="eventTDName">
				<input type="hidden" name="eID[{{ $index + 1 }}]" ng-value="event.id" />
				<input type="text" ng-click='expandOptions($event, event)' name="eName[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="event.name" placeholder="<?echo _("Click to add an event name");?>" pattern="^.{0,99}$" required readonly="readonly"/>
				<small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
			</td>
			<td class="eventTDDesc">
				<input type="text" ng-click='expandOptions($event, event)' name="eDesc[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="event.description" placeholder="<?echo _("Click to add a description");?>" readonly="readonly" pattern="^.{0,250}$"/>
				<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
			</td>
			<td class="eventTDDate">
				<input type="text" ng-click='expandOptions($event, event)' name="eDate[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.date' ng-value="formatDate(event.date)" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required readonly="readonly"/>
				<small class="error"><?echo _("Date?");?></small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event, event)' name="eTime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.starttime' ng-value="event.starttime" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
				<small class="error priceError"><?echo _("Time?");?></small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event, event)' name="eETime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.endtime' ng-value="event.endtime" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
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
				<button type="button" ng-click='collapseOptions($event)' class="eventTableButtons eventSave hide" 			title="<?echo _("Collapse");?>"										><i class="pd-up"></i></button>
				<button type="button" ng-click='expandOptions($event, event)' class="eventTableButtons eventTDEdit" 			title="<?echo _("Edit");?>"										><i class="pd-edit"></i></button>
				<button type="button" ng-click='duplicate(event, $event)' class="eventTableButtons eventDuplicate" 			title="<?echo _("Duplicate");?>" id="dup{{ $index + 1 }}"	><i class="pd-copy"></i></button>
				<button type="button" ng-click='delete(event)' class="eventTableButtons secondary eventDelete" 	title="<?echo _("Delete");?>"									><i class="pd-delete"></i></button>
			</td>
		</tr>
		<tr ng-if='outletLocations.length > 0' class="eventEdit optionTR savedInput" required style='display: none;'>
			<td class="eventTDOutletLocation">
				<select ng-model='event.outletLocationId' ng-options='outletLocation.id as outletLocation.name for outletLocation in outletLocations' name="eOutletLocation[{{ $index + 1 }}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectOutletLocation hide"> 
					<option value=""  ><?echo _("All Locations")?></option>
				</select>
			</td>
		</tr>
		<!-- slot directive -->
		<tr slot elements='event.cSlots' countevent='$index' class="slot-container eventEdit optionTR savedInput" required>
		</tr>
	</tbody>
</table>
