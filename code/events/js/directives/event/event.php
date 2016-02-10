<table class="eventTable" ng-repeat='event in events track by $index' id="event{{ $index + 1 }}" style='background: transparent;'>
	<tbody>
		<tr class="savedInput eventTR">
			<td class="eventTDName">
				<input type="hidden" name="eID[{{ $index + 1 }}]" ng-value="event.id" />
				<input type="text" ng-click='expandOptions($event, event)' name="eName[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="event.name" placeholder="{{'Click to add an event name' | translate}}" pattern="^.{0,99}$" required readonly="readonly"/>
				<small class="error" translate>Please type an event name (max 100chars)</small>
			</td>
			<td class="eventTDDesc">
				<input type="text" ng-click='expandOptions($event, event)' name="eDesc[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model="event.description" placeholder="{{'Click to add a description' | translate}}" readonly="readonly" pattern="^.{0,250}$"/>
				<small class="error" translate>Please type a description (max 250chars)</small>
			</td>
			<td class="eventTDDate">
				<input type="text" ng-click='expandOptions($event, event)' name="eDate[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.date' ng-value="formatDate(event.date)" pattern="^\d\d\/\d\d\/\d\d\d\d$" placeholder="{{'DD/MM/YYYY' | translate}}" required readonly="readonly"/>
				<small class="error" translate>Date?</small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event, event)' name="eTime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.starttime' ng-value="event.starttime" pattern="\d\d:\d\d" placeholder="{{'HH:MM' | translate}}" required readonly="readonly"/>
				<small class="error priceError" translate>Time?</small>
			</td>
			<td class="eventTDTime">
				<input type="text" ng-click='expandOptions($event, event)' name="eETime[{{ $index + 1 }}]" class="eventField noEnterSubmit" ng-model='event.endtime' ng-value="event.endtime" pattern="\d\d:\d\d" placeholder="{{'HH:MM' | translate}}" readonly="readonly"/>
				<small class="error priceError" translate>Time?</small>
			</td>

			<td class="eventTDVisi hide">

				<div class="switch tiny">
					<input name="eVisi[{{ $index + 1 }}]" value="0" type="radio" ng-checked="event.visible">
					<label translate>Yes</label>

					<input name="eVisi[{{ $index + 1 }}]" value="0" type="radio" ng-checked="event.visible">
					<label translate>No</label>
				</div>

			</td>
			<td class="eventTDTools">
				<button type="button" ng-click='collapseOptions($event)' class="eventTableButtons eventSave hide" title="{{'Collapse' | translate}}"><i class="pd-up"></i></button>
				<button type="button" ng-click='expandOptions($event, event)' class="eventTableButtons eventTDEdit" title="{{'Edit' | translate}}"><i class="pd-edit"></i></button>
				<button type="button" ng-click='duplicate(event, $event)' class="eventTableButtons eventDuplicate" title="{{'Duplicate' | translate}}" id="dup{{ $index + 1 }}"	><i class="pd-copy"></i></button>
				<button type="button" ng-click='delete(event)' class="eventTableButtons secondary eventDelete" 	title="{{'Delete' | translate}}"><i class="pd-delete"></i></button>
			</td>
		</tr>
		<tr ng-if='outletLocations.length > 0' class="eventEdit optionTR savedInput" required style='display: none;'>
			<td class="eventTDOutletLocation">
				<select ng-model='event.outletLocationId' ng-options='outletLocation.id as outletLocation.name for outletLocation in outletLocations' name="eOutletLocation[{{ $index + 1 }}]" class="eventField noEnterSubmit inline eventMenuSingleSelect selectOutletLocation hide">
					<option value=""   translate>All Locations</option>
				</select>
			</td>
		</tr>
		<!-- slot directive -->
		<tr slot elements='event.cSlots' countevent='$index' class="slot-container eventEdit optionTR savedInput" required>
		</tr>
	</tbody>
</table>
