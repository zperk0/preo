<h3><?echo _("Subscriptions")?></h3>

	
<section class='historyWrapper'>
	<header><? echo _("Billing History")?></header>
	<br/>
	<div>						
			<table>
					<th>
						<td><? echo _("Inv no.")?></td>
						<td><? echo _("Date")?></td>
						<td><? echo _("Status")?></td>
						<td><? echo _("Amount.")?></td>
						<td>&nbsp;</td>
					</th>
					<tr ng-repeat="accountPayment in accountPayments" >
						<td > <img src='/img/icon_off.png' /> </td>
						<td> {{accountFeature.invoiceId}} </td>
						<td> {{accountFeature.date | date:"MMM dd, yyyy" }} </td>				
						<td> {{accountFeature.status}} </td>				
						<td> {{accountFeature.ammount}}  </td>				
						<td >
								<span ng-click='updateStatus(accountFeature,"INSTALLED")'> <? echo _("Reinstall")?> </span>								
						</td>
					</tr>
				</table>	
	</div>	
</section>