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
						<td class='capitalise'> {{invoice.status}} </td>				
						<td> &pound;{{invoice.accountPayment.ammount}}  </td>				
						<td >
							<a href='/api/invoices/{{invoice.id}}/pdf' target='_blank' download="invoice.pdf">
								<button type='button' class='preodayButton'> <? echo _("DOWNLOAD PDF")?> </button>								
							</a>
						</td>
					</tr>
				</table>	
	</div>	
</section>