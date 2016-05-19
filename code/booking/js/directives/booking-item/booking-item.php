<tr class="booking-info">
	<td class="booking-date">
		<span>{{booking.date}}</span>
	</td>
	<td class="booking-time">
		<span>{{booking.time}}</span>
	</td>
	<td class="booking-client">
		<span>{{booking.user.name}}</span>
	</td>
	<td class="booking-name">
		<span>{{booking.$promotionName}}</span>
	</td>
	<td class="booking-guests">
		<span>{{booking.people}}</span>
	</td>
	<td class="booking-page">
		<span ng-if="!booking.cancelled">
			<a href="{{ getWebOrdersUrl(booking) }}" target='_blank'>link</a>
		</span>
	</td>
	<td class="booking-orders">
		<span ng-if="!booking.cancelled">{{booking.ordersPlaced || 0}} <span translate>of</span> {{booking.people}}</span>
		<span ng-if="booking.cancelled" class="booking-cancelled">cancelled</span>
	</td>
</tr>
