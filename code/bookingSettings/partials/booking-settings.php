<div class='settings-container' ng-controller="BookingSettingsCtrl as bookingSettingsCtrl">
	<form ng-submit='bookingSettingsCtrl.save()'>
		<div class="row">
			<div class="topSpacer"></div>
			<div class="large-12 columns">
				<h2 translate>Group Booking Settings</h2>
				<div class="settings">
					<div>
						<label translate>Auto reminder</label>
						&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'If a booking has outstanding orders, the event organiser will be sent a reminder' | translate}}"></i>
					</div>
					<div>
						<input type="text" ng-model='bookingSettingsCtrl.reminderDays' class='reminder-field'>
						<span translate>Days before the event</span>
					</div>
					<div>
						<label translate>Lock ordering page</label>
						&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'The event organiser can change their orders up until this time' | translate}}"></i>
					</div>
					<div>
						<input type="text" ng-model='bookingSettingsCtrl.lockDays' class='lock-ordering-field'>
						<span translate>Days before the event</span>
					</div>
				</div>
				<button type="submit" title="{{'Save changes' | translate}}">SAVE CHANGES</button>
			</div>
		</div>
	</form>
</div>