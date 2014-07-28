<? session_start();?>

<div class="container-fluid" id="container-search">
	<div class="row formContainer" >  
	    <form class="navbar-form navbar-left columns large-7 small-12 nopadding custom" role="update">
	      <div class='row nomargin'>

	          <div class="columns large-12 small-12 nopadding">              
	              <label>
	              <? echo _("Choose preset:")?></label>
	              <div class='columns large-9 small-10 nopadding'>
	                <multi-select
	                    class="selectOutlet selectReport"    
	                    input-model="reports"    
	                    button-label="title"
	                    item-label="title"
	                    selection-mode="single"
	                    tick-property="selected"
	                    default-label="{{selectedReport.title}}"
	                ></multi-select>
	               </div>
                 <div class='columns large-3 small-2'>
                  	<button type="button" ng-click='selectReport()' class="preodayButton small "><? echo _("Update")?></button>            
                 </div>           
	          </div>	        
	      </div>
	    </form>        
	</div>
</div>
<div class='row'>
	<div class="container container-partials">
		<div class="flip-container topSpacing">
			<div class="flipper reportPage">
				<div class="front" id="content-list">
					
					<div class="header-list overflow">			
						<span>{{selectedReport.title}}</span> 
						<i class="icon-question-sign preoTips has-tip tip-bottom" tooltip-placement="bottom" 
						data-selector="tooltip617tigam7vi" tooltip="{{selectedReport.description}}" tooltip-append-to-body='true'
	tooltip-animation='false'>
						</i>

						<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
							<i class="fa fa-plus"></i>
						</a>
					</div>

					<div id="content-table" >
						<table class="table table-striped table-list">
						  <thead>
						  	<tr>
						  		<th width="10">
						  			<input type="checkbox" ng-model="all_options" ng-change="selectAll()" />
						  		</th>					  		
						  		<th ng-repeat="title in selectedReport.titles" ng-click="setOrderBy(title);">

						  			<div ng-if="isMarketingTitle(title)" marketing="{{title}}"></div> 
						  			<div ng-if="!isMarketingTitle(title)">
							  			{{getTitle(title)}}
							  			<div class="sort pull-right">
							  				<i class="fa fa-sort-up"></i>
							  				<i class="fa fa-sort-desc"></i>
							  			</div>		  									  			
						  			</div>
						  		</th>
						  	</tr>
						  </thead>
						  <tbody>
						  	<tr ng-repeat="data in reportsList | orderObjectBy:orderBy:direction">
						  		<td><input type="checkbox" ng-model="data.$selected"></td>
						  		<td ng-if='data.timeSlot !== undefined'>{{ data.timeSlot }}</td>
						  		<td ng-if='data.day !== undefined'>{{ data.day | date:"EEEE" }}</td>
						  		<td ng-if='data.date !== undefined'>{{ data.date | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.valueSold !== undefined'>{{ data.valueSold.toFixed(2) }}</td>
						  		<td ng-if='data.itemName !== undefined'>{{ data.itemName }}</td>
						  		<td ng-if='data.quantitySold !== undefined'>{{ data.quantitySold }}</td>
						  		<td ng-if='data.numberOfOrders !== undefined'>{{ data.numberOfOrders }}</td>
						  		<td ng-if='data.percentIncrease !== undefined'>{{ data.percentIncrease.toFixed(2) }}</td>
						  		<td ng-if='data.percentDecrease !== undefined'>{{ data.percentDecrease.toFixed(2) }}</td>
						  		<td ng-if='data.totalSpent !== undefined'>{{ data.totalSpent.toFixed(2) }}</td>
						  		<td ng-if='data.lastOrder !== undefined'>{{ data.lastOrder | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.dateJoined !== undefined'>{{ data.dateJoined | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.dateOfOrder !== undefined'>{{ data.dateOfOrder | date:"dd/MM/yyyy" }}</td>						  		
						  		<td ng-if='data.name !== undefined'>{{ data.name }}</td>
						  		<td ng-if='data.email !== undefined'>{{ data.email }}</td>
						  		<td ng-if='data.loyalty !== undefined' class='marketingTd'><img class='marketingOpt' ng-src="{{data.loyalty  | marketing }}"/></td>
					  			<td ng-if='data.offers !== undefined' class='marketingTd'><img class='marketingOpt' ng-src="{{data.offers  | marketing }}"/></td>
					  			<td ng-if='data.other !== undefined' class='marketingTd'><img class='marketingOpt' ng-src="{{data.other  | marketing }}"/></td>
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
</div>