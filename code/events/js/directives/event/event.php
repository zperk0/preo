<table class="eventTable" ng-repeat='event in events' id="event{{ $index + 1 }}" style='background: transparent;'>
	<tbody>
		<tr class="savedInput eventTR">
			<td class="eventTDName">
				<input type="hidden" name="eID[{{ $index + 1 }}]" ng-value="event.id" />
				<input type="text" ng-click='expandOptions($event)' name="eName[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="event.name"  pattern="^.{0,99}$" required readonly="readonly"/>
				<small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
			</td>
			<td class="eventTDDesc">
				<input type="text" ng-click='expandOptions($event)' name="eDesc[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="event.description" placeholder="<?echo _("Click to add a description");?>" readonly="readonly" pattern="^.{0,250}$"/>
				<small class="error"><?echo _("Please type a description (max 250chars)");?></small>
			</td>
			<td class="eventTDDate">
				<input type="text" ng-click='expandOptions($event)' name="eDate[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="formatDate(event.date)" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="<?echo _("DD/MM/YYYY");?>" required readonly="readonly"/>
				<small class="error"><?echo _("Date?");?></small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event)' name="eTime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="formatTime(event.starttime)" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
				<small class="error priceError"><?echo _("Time?");?></small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event)' name="eETime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-value="formatTime(event.endtime)" pattern="\d\d:\d\d" placeholder="<?echo _("HH:MM");?>" required readonly="readonly"/>
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
				<button type="button" ng-click='expandOptions($event)' class="eventTableButtons eventTDEdit" 			title="<?echo _("Edit");?>"										><i class="pd-edit"></i></button>
				<button type="button" class="eventTableButtons eventDuplicate" 			title="<?echo _("Duplicate");?>" id="dup{{ $index + 1 }}"	><i class="pd-copy"></i></button>
				<button type="button" class="eventTableButtons secondary eventDelete" 	title="<?echo _("Delete");?>"									><i class="pd-delete"></i></button>
			</td>
		</tr>
		<tr ng-if='outletLocations.length > 0' class="eventEdit optionTR savedInput" required style='display: none;'>
			<td class="eventTDOutletLocation">
				<select name="eOutletLocation[{{ $index + 1 }}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectOutletLocation hide"> 
					<option value=""  ><?echo _("All Locations")?></option>
					<option ng-repeat='outletLocation in outletLocations' ng-value="outletLocation.id" ng-selected="event.id == outletLocation.id">{{outletLocation.name}}</option>											
				</select>
			</td>
		</tr>
		<!-- slot directive -->
		<tr slot elements='event.cSlots' countevent='$parent.$index' class="eventEdit optionTR savedInput" required>
		</tr>
	</tbody>
</table>
