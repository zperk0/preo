<tr class="booking-info">
	<td class="booking-name">
		<span>{{booking.promotion}}</span>
	</td>
	<td class="booking-client">
		<span>{{booking.user.name}}</span>
	</td>
	<td class="booking-date">
		<span>{{booking.date}}</span>
	</td>
	<td class="booking-time">
		<span>{{booking.time}}</span>
	</td>
	<td class="booking-guests">
		<span>{{booking.people}}</span>
	</td>
	<td class="booking-page">
		<span>
			<a href="{{'http://menus.preoday.com/' + permalink + '/booking/' + booking.reference + '/' + booking.user.lastName}}" target='_blank'>link</a>
		</span>
	</td>
	<td class="booking-orders">
		<span>{{booking.ordersPlaced}}</span>
	</td>
</tr>
