<? session_start(); ?>
<div class="container container-partials row">
	<div class="flip-container flipRelative topSpacing">
		<div class="flipper">
			<div class="front" id="content-list">

				<div class="header-list overflow">
					<span><? echo _("Orders")?></span>

					<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				<div id="content-table">
					<table class="table table-striped table-list table-stream table-condensed" ng-init="direction = true;">
					<thead>
					  	<tr>
					  		<th width="10">
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="all_options" ng-change="selectAll()" id="all_options" />
							    <label for="all_options"></label>
							  </div>
					  		</th>
					  		<th ng-click="direction=!direction; setOrderBy('dateTimeStamp');">
                                <? echo _("Date/Time")?>
                                <div class="sort pull-right">
                                    <i class="fa fa-sort-up"></i>
                                    <i class="fa fa-sort-desc"></i>
                                </div>
                            </th>
					  		<th ng-click="direction=!direction; setOrderBy('outletName');" ng-if="$parent.getSelectedOutlets().length > 1 || $parent.getSelectedOutlets().length == 0">
					  			<? echo _("Outlet")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click="direction=!direction; setOrderBy('user.name');">
					  			<? echo _("Customer")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click="direction=!direction; setOrderBy('itemString');" class="colItems">
					  			<? echo _("Items")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th ng-click="direction=!direction; setOrderBy('total');">
					  			<? echo _("Order Total")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>
					  		</th>
					  		<th> <div marketing='loyalty'></div></th>
					  		<th><div marketing='offers'></div></th>
					  		<th ><div marketing='other'></div></th>
					  	</tr>
					  </thead>
					  <tbody>
						<tr ng-repeat="order in orders | limitTo:numPerPage">
					  		<td>
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="order.selected" id="check_{{ order.id }}" />
							    <label for="check_{{ order.id }}"></label>
							  </div>
					  		</td>
					  		<td>{{ order.dateTime }}</td>
					  		<td ng-if="$parent.getSelectedOutlets().length > 1 || $parent.getSelectedOutlets().length == 0">{{ order.outletName }}</td>
					  		<td>
					  			{{ order.user.name }} <br />
					  			{{ order.user.email }} <br />
					  			{{ order.phone || order.user.phone }}
					  		</td>
					  		<td ng-bind-html="getItemsAsString(order)"></td>
					  		<td>{{ getCurrency() + order.total.toFixed(2) }}</td>
					  		<td class='marketingTd' width="40"><img class='marketingOpt' ng-src="{{order.user.optinLoyalty  | marketing }}"/></td>
					  		<td class='marketingTd' width="40"><img class='marketingOpt' ng-src="{{order.user.optinOffers  | marketing }}"/></td>
					  		<td class='marketingTd' width="40"><img class='marketingOpt' ng-src="{{order.user.optinOther  | marketing }}"/></td>
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


						<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/pdfs/report' method='POST' ng-submit='exportPdf()' class="formLeft">
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

						<div class="content-optionsExport">
							<div class="options optionsExport overflow">
							  <div class="checkbox checkboxStyle">
							  	<input type="radio" ng-model="exportAll" name="option" value="1" id="exportAll"/>
							    <label for="exportAll"><? echo _("All") ?></label>
							  </div>
							  <div class="checkbox checkboxStyle">
							  	<input type="radio" ng-model="exportAll" name="option" value="0" id="exportSelected" />
							    <label for="exportSelected"><? echo _("Selected") ?></label>
							  </div>
							</div>
						</div>
				</div>
	</div>
</div>