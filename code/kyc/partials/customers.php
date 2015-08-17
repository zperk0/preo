<? session_start(); ?>
<div class="container container-partials row">
	<div class="flip-container flipRelative topSpacing">
		<div class="flipper reportPage">
			<div class="front" id="content-list">

				<div class="header-list overflow">
					<span translate>Customers</span>

					<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
						<i class="fa fa-plus"></i>
					</a>
				</div>

				<div id="content-table">
					<table class="table table-striped table-list">
					  <thead>
					  	<tr>
					  		<th width="10">
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="all_options" ng-change="selectAll()" id="all_options" />
							    <label for="all_options"></label>
							  </div>
					  		</th>
					  		<th ng-click=" setOrderBy('name');" translate>
					  			Name
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click=" setOrderBy('totalSpent');" translate>
					  			Total Spent
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click=" setOrderBy('emailAddress');" translate>
					  			Email address
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
					  	<tr ng-repeat="(key, customer) in customersList">
					  		<td>
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="customer.selected" id="check_{{ key }}" />
							    <label for="check_{{ key }}"></label>
							  </div>
					  		</td>
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
					<h4 translate>Export as...</h4>


						<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/pdfs/report' method='POST' ng-submit='exportPdf()' class="formLeft">
							<input name='data' value='{{pdfData}}' type='hidden'/>
								<button ng-click="exportData('pdf')" translate>
										PDF
								</button>
						</form>

						<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/csv/report' method='POST' ng-submit='exportCsv()'>
							<input name='data' value='{{csvData}}' type='hidden'/>
								<button ng-click="exportData('csv')" translate>
										CSV
								</button>
						</form>

						<div class="content-optionsExport">
							<div class="options optionsExport overflow">
							  <div class="checkbox checkboxStyle">
							  	<input type="radio" ng-model="exportAll" name="option" value="1" id="exportAll" />
							    <label for="exportAll" translate>All</label>
							  </div>
							  <div class="checkbox checkboxStyle">
							  	<input type="radio" ng-model="exportAll" name="option" value="0" id="exportSelected" />
							    <label for="exportSelected" translate>Selected</label>
							  </div>
							</div>
						</div>
				</div>
			</div>
</div>