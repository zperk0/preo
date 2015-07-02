<tr ng-repeat='slot in slots track by $index' style='display: none'>
	<td class="eventTDCollection">
		<label>&nbsp;</label>
		<select ng-model='slot.name' name="eColl[event{{ event_index + 1 }}][{{ $index + 1}}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectCollectionSlot hide" style='display: none'>
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
		<input type="text" name="eLead[event{{ event_index + 1 }}][{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="slot.leadTime" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
		<small class="error"><?echo _("Time?");?></small>
	</td>
	<td class="eventTDStart">
		<label><?echo _("Start (mins)");?></label>
		<input type="text" name="eStart[event{{ event_index + 1 }}][{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="slot.start" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
		<small class="error"><?echo _("Time?");?></small>
	</td>
	<td class="eventTDEnd">
		<label><?echo _("End (mins)");?></label>
		<input type="text" name="eEnd[event{{ event_index + 1 }}][{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="slot.end" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
		<small class="error"><?echo _("Time?");?></small>
	</td>
	<td class="eventTDStep">
		<label><?echo _("Step (mins)");?></label>
		<input type="text" name="eStep[event{{ event_index + 1 }}][{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="slot.step" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
		<small class="error"><?echo _("Time?");?></small>
	</td>
	<td class="eventTDAddMore">
		<button ng-click='add()' ng-if='$index == 0' type="button" class="newCollSlot" title="<?echo _("Add another slot");?>"><i class="pd-add"></i></button>
		<button ng-click='delete(slot)' ng-if='$index != 0' type="button" class="delCollSlot secondary" title="Delete this slot"><i class="pd-delete"></i></button>
	</td>
</tr>