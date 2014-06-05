<h3><?echo _("Subscriptions")?></h3>

	
<section class='historyWrapper'>
	<header><? echo _("Billing History")?></header>
	<br/>
	<div>						
			<table>
					<tr>
						<th><? echo _("Inv no.")?></th>
						<th><? echo _("Date")?></th>
						<th><? echo _("Status")?></th>
						<th><? echo _("Amount.")?></th>	
						<th> </th>
					</tr>
					<tr ng-repeat="invoice in invoices" >						
						<td> {{invoice.id}} </td>
						<td> {{invoice.issueDate | date:"MMM dd, yyyy" }} </td>				
						<td> {{invoice.status}} </td>				
						<td> {{invoice.accountPayment.ammount}}  </td>				
						<td >
								<button ng-click='downloadPdf(invoice))' type='button' class='preodayButton'> <? echo _("DOWNLOAD PDF")?> </button>								
						</td>
					</tr>
				</table>	
	</div>	
</section>