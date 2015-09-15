<div class='booking-container' ng-controller="BookingCtrl as bookingCtrl">
	<!-- <form ng-submit='bookingCtrl.save()'> -->
		<div class="row">
			<div class="topSpacer"></div>
			<div class="large-12 columns">
				<h2 translate>Bookings</h2>
				<div class="date-range">
					<label translate>Date range</label>
					<input type="text" ng-model='bookingCtrl.startDate' class='sched-start-date'>
					<span class='separator'>-</span>
					<input type="text" ng-model='bookingCtrl.endDate' class='sched-end-date'>
					<i class="calendar"></i>
					<button ng-click='bookingCtrl.generateReport()' type="button" title="{{'Generate report' | translate}}">GENERATE REPORT</button>
				</div>
				<!-- <table class="headerTable">

				</table> -->
			</div>
		</div>
		<div class="row booking-row">
			<div class="large-12 columns">
				<table class='booking-table'>
					<thead>
						<tr>
							<th class="booking-name" translate>Promotion</th>
							<th class="booking-client" translate>Client</th>
							<th class="booking-date" translate>Date</th>
							<th class="booking-time" translate>Time</th>
							<th class="booking-guests" translate>Guests</th>
							<th class="booking-page" translate>Booking page</th>
							<th class="booking-orders" translate>Orders placed</th>
						</tr>
					</thead>
					<tbody>
						<tr class='separator-thead'></tr>

						<tr booking-item ng-click='bookingCtrl.toggleDetails($index)' ng-repeat-start='booking in bookingCtrl.bookingData' element='booking' startDate='bookingCtrl.startDate' endDate='bookingCtrl.endDate'></tr>
						<tr booking-item-details element='booking'></tr>

						<tr class='separator' ng-repeat-end=''></tr>

						<tr ng-if='bookingCtrl.bookingData.length <= 0'>
							<td translate>No bookings at this period.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row">
		</div>
	<!-- </form> -->
</div>