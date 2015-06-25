<div ng-controller="EventsCtrl as eventsCtrl">
	<form ng-submit='eventsCtrl.save()' id="eventConfigForm" method="POST" data-abide>
		<div class="row">
			<div class="topSpacer"></div>
			<div class="large-12 columns">
				<h1><?echo _("Your events");?>&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("These show when you are open for ordering, such as performances or matches. They can be viewed from the front page of your app");?>"></i></h1>
				<div class="row">
					<div class="large-12 columns">
						<button ng-click='eventsCtrl.addEvent()' id="add_event" type="button" class="newEvent" title="<?echo _("Add a new event");?>"><i class="pd-add"></i></button> <?echo _("Add a new event");?>
					</div>
				</div>
				<table class="headerTable">
					<thead>
						<tr>
							<th class="eventTDName" ><?php echo _("Name"); ?></th>
							<th class="eventTDDesc" ><?php echo _("Description"); ?></th>
							<th class="eventTDDate" ><?php echo _("Start Date"); ?></th>
							<th class="eventTDTime" ><?php echo _("Start Time"); ?></th>
							<th class="eventTDTime" ><?php echo _("End Time"); ?></th>
							<th class="eventTDVisi hide" ><?php echo _("Visible?"); ?></th>
							<th class="eventTDTools"><?php echo _("Tools"); ?></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="large-12 columns dynamicDataTable"> <!-- This is where the dynamic data goes into -->
			<event elements='eventsCtrl.events' outlet='eventsCtrl.outletLocations'></event>
			<!-- <div class="hide firstEventDiv"></div> <!-- Dummy hook -->
		</div>
		<div class="row">
			<div class="small-12 large-4 columns">
				<button ng-hide='eventsCtrl.isSaving' id="eventSubButton" type="submit"><?echo _("SAVE CHANGES");?></button>
				<button ng-show='eventsCtrl.isSaving' id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
			</div>
		</div>
	</form>
</div>