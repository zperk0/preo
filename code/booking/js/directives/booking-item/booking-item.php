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
		<span>
			<a href="{{'https://menus-demo.preoday.com/' + permalink + '?overrideLock=true#/booking/' + booking.reference + '/' + booking.user.lastName}}" target='_blank'>link</a>
			<!-- TODO: change url to prod -->
			<!-- <a href="{{'https://menus-demo.preoday.com/' + permalink + '?overrideLock=true#/booking/' + booking.reference + '/' + booking.user.lastName}}" target='_blank'>link</a> -->
		</span>
	</td>
	<td class="booking-orders">
		<span>{{getOrdensPlaced()}} <span translate>of</span> {{booking.people}}</span>
	</td>
</tr>
