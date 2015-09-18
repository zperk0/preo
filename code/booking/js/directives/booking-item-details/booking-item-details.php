<tr class='booking-details'>
	<td colspan='7'>
		<div class="client-info clear">
			<div>
				<div>
					<span><b translate>Client contact:</b></span>
					<span>{{booking.user.name}}</span>
				</div>
				<div>
					<span><b translate>Contact no.:</b></span>
					<span>{{booking.user.phone}}</span>
				</div>
				<div>
					<span><b translate>Contact email:</b></span>
					<span>{{booking.user.email}}</span>
				</div>
			</div>
			<div class='pull-right ct-btn-print'>
				<form action='{{"/api/accounts/" + account_id + "/exports/csv/report"}}' method='POST' ng-submit='exportCsv()'>
                    <input name='data' value='{{csvData}}' type='hidden'/>
                    <button class='btn-print' ng-click='exportCsv()' translate>PRINT BOOKING</button>
                </form>
			</div>
		</div>
		<div class='dish-info clear'>
			<div class='dish-card' ng-repeat='section in booking.$sections'>
				<div class='list-header clear'>
					<span class='pull-left section-name'>
						{{section[0].sectionName}}
					</span>
					<span class='pull-right'>
						{{section.length}}
					</span>
				</div>
				<div class='dish-list clear' ng-repeat='item in section'>
					<ul>
						<li class='clear'>
							<span class='pull-left item-name'>{{item.item.name}}</span>
							<span class='pull-right'>{{item.item.qty}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</td>
</tr>