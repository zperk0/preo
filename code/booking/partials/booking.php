<div class='booking-container' ng-controller="BookingCtrl as bookingCtrl">
	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h1 translate>Bookings</h1>
			<div class="date-range">
				<label translate>Date range</label>
				<input type="text" ng-model='bookingCtrl.startDate' class='sched-start-date'>
				<span class='separator'>-</span>
				<input type="text" ng-model='bookingCtrl.endDate' class='sched-end-date'>
				<i class="calendar"></i>
				<button ng-click='bookingCtrl.getBookings()' type="button" title="{{'Submit' | translate}}">SUBMIT</button>
				<div class="pull-right">
					<form submit-form='generateReportTrigger' action='/bookingsReport' method='POST'>
	                    <input name='data' value='{{bookingCtrl.bookingData}}' type='hidden'/>
	                </form>
	                <button title="{{'Generate report' | translate}}" ng-click='bookingCtrl.prepareData()'>GENERATE REPORT</button>
				</div>
			</div>
		</div>
	</div>
	<div class="row booking-row">
		<div class="large-12 columns">
			<table class='booking-table'>
				<thead>
					<tr>
						<th class="booking-date" translate>Date</th>
						<th class="booking-time" translate>Time</th>
						<th class="booking-client" translate>Client</th>
						<th class="booking-name" translate>Promotion</th>
						<th class="booking-guests" translate>Guests</th>
						<th class="booking-page" translate>Booking page</th>
						<th class="booking-orders" translate>Orders placed</th>
					</tr>
				</thead>
				<tbody>
					<tr class='separator-thead'></tr>

					<tr booking-item ng-click='bookingCtrl.toggleDetails($index, booking)' ng-repeat-start='booking in bookingCtrl.bookingsToShow' element='booking' startDate='bookingCtrl.startDate' endDate='bookingCtrl.endDate'></tr>
					<tr booking-item-details element='booking'></tr>

					<tr class='separator' ng-repeat-end=''></tr>

					<tr ng-if='bookingCtrl.bookingData.length <= 0'>
						<td class='no-bookings' translate  colspan='7'>No bookings at this period.</td>
					</tr>
				</tbody>
			</table>
			<div class="pagination-container">
				<pagination
					total-items='bookingCtrl.bookingData.length'
					items-per-page='bookingCtrl.maxItemsPerPage'
					page='bookingCtrl.currentPage'
					max-size='10'
					previous-text='{{"Previous" | translate}}'
					next-text='{{"Next" | translate}}'
					on-select-page='bookingCtrl.changePage(page)'>
				</pagination>
			</div>
		</div>
	</div>
</div>