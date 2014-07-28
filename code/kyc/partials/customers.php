<? session_start(); ?>
<div class="container container-partials row">
	<div class="flip-container topSpacing">
		<div class="flipper reportPage">
			<div class="front" id="content-list">
				
				<div class="header-list overflow">			
					<span ><? echo _("Customers") ?></span>

					<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
						<i class="fa fa-plus"></i>
					</a>
				</div>

				<div id="content-table">
					<table class="table table-striped table-list">
					  <thead>
					  	<tr>
					  		<th width="10">
					  			<input type="checkbox" ng-model="all_options" ng-change="selectAll()" />
					  		</th>
					  		<th ng-click=" setOrderBy('name');">
					  			<? echo _("Name")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click=" setOrderBy('totalSpent');">
					  			<? echo _("Total Spent")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>
					  		<th ng-click=" setOrderBy('emailAddress');">
					  			<? echo _("Email address")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>					  		
					  		<th > <div marketing='loyalty'></div></th>
					  		<th><div marketing='offers'></div></th>
					  		<th ><div marketing='other'></div></th>
					  	</tr>
					  </thead>
					  <tbody>
					  	<tr ng-repeat="customer in customersList">
					  		<td><input type="checkbox" ng-model="customer.selected" /></td>
					  		<td>{{ customer.name }}</td>
					  		<td>{{ getCurrency()+customer.totalSpent.toFixed(2) }}</td>
					  		<td>{{ customer.emailAddress }}</td>
					  		<td class='marketingTd'><img class='marketingOpt' ng-src="{{customer.loyalty  | marketing }}"/></td>
					  		<td class='marketingTd'><img class='marketingOpt' ng-src="{{customer.offers  | marketing }}"/></td>
					  		<td class='marketingTd'><img class='marketingOpt' ng-src="{{customer.other  | marketing }}"/></td>
					  	</tr>
					  </tbody>
					</table>		
				</div>

				<div class="align-center">
					<pagination class="inlineBlock pagination" boundary-links="true" items-per-page="numPerPage" total-items="totalItems" page="currentPage" num-pages="numPages" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination>
				</div>				

			</div>

			<div class="actions-chart back">
				
		</div>
	</div>
	<div class="header-chart overflow invisibleBack">
				
					<a href="javascript:void(0)" class="pull-left" ng-click="hideOptions()">
						<i class="fa fa-arrow-left icon-white"></i>
					</a>

				</div>

							<div class="content-actions invisibleBack">
					<h4><? echo _("Export as...") ?></h4>


						<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/pdfs/report' method='POST' ng-submit='exportPdf()'>
							<input name='data' value='{{pdfData}}' type='hidden'/>
								<button ng-click="exportData('pdf')">
										<? echo _("PDF") ?>
								</button>
						</form>
						
						<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/csv/report' method='POST' ng-submit='exportCsv()'>
							<input name='data' value='{{csvData}}' type='hidden'/>
								<button ng-click="exportData('csv')">
										<? echo _("CSV") ?>
								</button>
						</form>
											
					<div class="options overflow">
						<label >
							<input type="radio" name="option" value="1" ng-model="exportAll"/>
							<? echo _("All") ?>
						</label>
						<label>
							<input type="radio" name="option" value="0" ng-model="exportAll"/>
							<? echo _("Selected") ?>
						</label>
					</div>
				</div>
			</div>
</div>