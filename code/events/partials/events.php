<div ng-controller="EventsCtrl as eventsCtrl">
	<form ng-submit='eventsCtrl.save()' id="eventConfigForm" method="POST" data-abide novalidate>
		<div class="row">
			<div class="topSpacer"></div>
			<div class="large-12 columns">
				<h1>{{'Your events' | translate}} &nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'These show when you are open for ordering, such as performances or matches. They can be viewed from the front page of your app' | translate}}"></i></h1>
				<div class="row">
					<div class="large-12 columns">
						<button ng-click='eventsCtrl.addEvent()' id="add_event" type="button" class="newEvent" title="{{'Add a new event' | translate}}"><i class="pd-add"></i></button> {{'Add a new event' | translate}}
					</div>
				</div>
				<table class="headerTable">
					<thead>
						<tr>
							<th class="eventTDName" translate>Name</th>
							<th class="eventTDDesc" translate>Description</th>
							<th class="eventTDDate" translate>Start Date</th>
							<th class="eventTDTime" translate>Start Time</th>
							<th class="eventTDTime" translate>End Time</th>
							<th class="eventTDVisi hide" translate>Visible?</th>
							<th class="eventTDTools" translate>Tools</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="large-12 columns dynamicDataTable">
			<!-- This is where the dynamic data goes into -->
			<event elements='eventsCtrl.events' outlet='eventsCtrl.outletLocations'></event>
		</div>
		<div class="row">
			<!-- <div class="small-12 large-4 columns">
				<button ng-hide='eventsCtrl.isSaving' id="eventSubButton" type="submit" translate>SAVE CHANGES</button>
				<button ng-show='eventsCtrl.isSaving' id="savingButton" class="secondary" type="button" translate>SAVING...</button>
			</div> -->
		</div>
	</form>
</div>