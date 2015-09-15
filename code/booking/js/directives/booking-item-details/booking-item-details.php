<tr class='booking-details'>
	<td colspan='7'>
		<div class="client-info clear">
			<div>
				<div>
					<span><b>Client contact:</b></span>
					<span>{{booking.clientData.name}}</span>
				</div>
				<div>
					<span><b>Contact no.:</b></span>
					<span>{{booking.clientData.phone}}</span>
				</div>
				<div>
					<span><b>Contact email:</b></span>
					<span>{{booking.clientData.email}}</span>
				</div>
			</div>
			<div class='pull-right ct-btn-print'>
				<!-- <button class='btn-print' ng-click='exportCsv()'>PRINT BOOKING</button> -->
				<form action='{{"/api/accounts/" + account_id + "/exports/csv/report"}}' method='POST' ng-submit='exportCsv()'>
                    <input name='data' value='{{csvData}}' type='hidden'/>
                    <button class='btn-print' ng-click='exportCsv()'>PRINT BOOKING</button>
                </form>
			</div>
		</div>
		<div class='dish-info clear'>
			<div class='dish-card' ng-repeat='order in booking.orders'>
				<div class='list-header clear'>
					<span class='pull-left'>
						{{order.name}}
					</span>
					<span class='pull-right'>
						{{getTotalOrders(order.dishes)}}
					</span>
				</div>
				<div class='dish-list clear' ng-repeat='dish in order.dishes'>
					<ul>
						<li class='clear'>
							<span class='pull-left'>{{dish.name}}</span>
							<span class='pull-right'>{{dish.qty}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</td>
</tr>