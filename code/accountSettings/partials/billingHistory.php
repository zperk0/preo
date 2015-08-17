<h3 translate>Subscriptions</h3>


<section class='historyWrapper'>
	<header translate>Billing History</header>
	<br/>
	<div>
			<table>
					<tr>
						<th translate>Inv no.</th>
						<th translate>Date</th>
						<th translate>Status</th>
						<th translate>Amount</th>
						<th> </th>
					</tr>
					<tr ng-repeat="invoice in invoices" >
						<td> {{invoice.id}} </td>
						<td> {{invoice.issueDate | date:"MMM dd, yyyy" }} </td>
						<td class='capitalise'> {{invoice.status}} </td>
						<td> &pound;{{invoice.getTotal()}}  </td>
						<td >
							<form action='{{getExportInvoice(invoice.id)}}' method='GET'>
									<button type='submit' class='preodayButton' translate>DOWNLOAD PDF</button>
							</form>
						</td>
					</tr>
				</table>
	</div>
</section>