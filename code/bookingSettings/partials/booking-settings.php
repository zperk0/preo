<div class='settings-container' ng-class='{invalid: bookingSettingsCtrl.invalidForm}' ng-controller="BookingSettingsCtrl as bookingSettingsCtrl">
	<form ng-submit='bookingSettingsCtrl.save()'>
		<div class="row">
			<div class="topSpacer"></div>
			<div class="large-12 columns">
				<h1 translate>Group Booking Settings</h1>
				<div class="settings">
					<div>
						<label translate>Restaurant Name</label>
					</div>
					<div class='restaurant-name-container'>
						<input type="text" ng-model='bookingSettingsCtrl.settings.restaurantName' class='restaurant-field'>
						<small ng-show='!bookingSettingsCtrl.settings.restaurantName || bookingSettingsCtrl.settings.restaurantName == ""' class="error" translate>Enter a name</small>
					</div>
					<div class='reminder-container'>
						<div>
							<label translate>Auto reminder</label>
							&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'If a booking has outstanding orders, the event organiser will be sent a reminder' | translate}}"></i>
						</div>
						<div>
							<div class='reminder-field-container'>
								<input type="text" ng-model='bookingSettingsCtrl.settings.reminderDays' class='reminder-field'>
								<small ng-show='bookingSettingsCtrl.isInvalidNumber(bookingSettingsCtrl.settings.reminderDays)' class="error" translate>Enter a number</small>
							</div>
							<span class='reminder-label' translate>Days before the event</span>
						</div>
					</div>
					<div class='lock-container'>
						<div>
							<label translate>Lock ordering page</label>
							&nbsp;<i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'The event organiser can change their orders up until this time' | translate}}"></i>
						</div>
						<div>
							<div class='lock-field-container'>
								<input type="text" ng-model='bookingSettingsCtrl.settings.lockDays' class='lock-ordering-field'>
								<small ng-show='bookingSettingsCtrl.isInvalidNumber(bookingSettingsCtrl.settings.lockDays)' class="error" translate>Enter a number</small>
							</div>
							<span class='lock-label' translate>Days before the event</span>
						</div>
					</div>
				</div>
				<button type="submit" title="{{'Save changes' | translate}}">SAVE CHANGES</button>
			</div>
		</div>
	</form>
</div>