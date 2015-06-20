<tr class="eventEdit optionTR savedInput" style="display:none;" required>
	<td class="eventTDCollection">
		<label>&nbsp;</label>
		<select ng-model='slot.collectionslot' name="eColl[event{{ event_index + 1 }}][{{slot_index + 1}}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectCollectionSlot hide">
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
		<input type="text" name="eLead[event{{ event_index + 1 }}][{{ slot_index + 1 }}]" class="eventField noEnterSubmit" ng-value="slot.leadtime" placeholder="<?echo _("eg. 30");?>" required pattern="^\d+$"/>
		<small class="error"><?echo _("Time?");?></small>
	</td>
	<td class="eventTDAddMore">
		<button ng-if='slot_index == 0' type="button" class="newCollSlot" title="<?echo _("Add another slot");?>"><i class="pd-add"></i></button>
		<button ng-if='slot_index != 0' type="button" class="delCollSlot secondary" title="Delete this slot"><i class="pd-delete"></i></button>
	</td>
</tr>