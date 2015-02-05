<? session_start(); ?>
<div class="container container-partials row">
	<div class="flip-container flipRelative topSpacing">
		<div class="flipper">
			<div class="front" id="content-list">
				
				<div class="header-list overflow">			
					<span><? echo _("Events")?></span>	

					<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
						<i class="fa fa-plus"></i>
					</a>								
				</div>
				<div id="content-table">
					<table class="table table-striped table-list table-stream table-condensed" ng-init="orderBy = 'updated'; direction = true">
					<thead>
					  	<tr>			
					  		<th width="10">
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="all_options" ng-change="selectAll()" id="all_options" />
							    <label for="all_options"></label>
							  </div>
					  		</th>					  	  	
					  		<th ng-if="eventsSelected.length > 1" ng-click="orderBy = 'eventName'; direction=!direction">
					  			<? echo _("Event")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>				  	  	
					  		<th ng-click="orderBy = 'user.name'; direction=!direction">
					  			<? echo _("Customer")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>
					  		<th ng-click="orderBy = 'user.email'; direction=!direction">
					  			<? echo _("Email")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>	
					  		<th ng-click="orderBy = 'order.phone'; direction=!direction">
					  			<? echo _("Phone Number")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>	
					  		<th ng-click="orderBy = 'itemString'; direction=!direction">
					  			<? echo _("Items")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>	
					  		<th ng-click="orderBy = 'total'; direction=!direction">
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
						<tr ng-repeat="order in orders | limitTo:numPerPage | orderObjectBy:orderBy:direction">
					  		<td>
							  <div class="checkbox checkboxStyle checkboxPartials">
							  	<input type="checkbox" ng-model="order.selected" id="check_{{ order.id }}" />
							    <label for="check_{{ order.id }}"></label>
							  </div>						  			
					  		</td>
					  		<td ng-if="eventsSelected.length > 1">{{ getEventName(order) }}</td>
					  		<td>{{ order.user.name }}</td>
					  		<td>{{ order.user.email }}</td>
					  		<td>{{ order.phone || order.user.phone }}</td>
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
							  	<input type="radio" ng-model="exportAll" name="option" value="1" id="exportAll" />
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