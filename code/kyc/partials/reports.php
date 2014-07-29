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
		<div class="flip-container flipRelative topSpacing">
			<div class="flipper reportPage">
				<div class="front" id="content-list">
					
					<div class="header-list overflow">			
						<span>{{selectedReport.title}}</span> 
						<i class="icon-question-sign preoTips has-tip tip-bottom" tooltip-placement="bottom" data-selector="tooltip617tigam7vi" tooltip="{{selectedReport.description}}">
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
								  <div class="checkbox checkboxStyle checkboxPartials">
								  	<input type="checkbox" ng-model="all_options" ng-change="selectAll()" id="all_options" />
								    <label for="all_options"></label>
								  </div>
						  		</th>					  		
						  		<th ng-repeat="title in selectedReport.titles" ng-click="setOrderBy(title);">
						  			{{getTitle(title)}}
						  			<div class="sort pull-right">
						  				<i class="fa fa-sort-up"></i>
						  				<i class="fa fa-sort-desc"></i>
						  			</div>		  									  			
						  		</th>
						  	</tr>
						  </thead>
						  <tbody>
						  	<tr ng-repeat="(key, data) in reportsList | orderObjectBy:orderBy:direction">
						  		<td>
								  <div class="checkbox checkboxStyle checkboxPartials">
								  	<input type="checkbox" ng-model="data.$selected" id="check_{{ key }}" />
								    <label for="check_{{ key }}"></label>
								  </div>						  			
						  		</td>
						  		<td ng-if='data.timeSlot !== undefined'>{{ data.timeSlot }}</td>
						  		<td ng-if='data.day !== undefined'>{{ data.day | date:"EEEE" }}</td>
						  		<td ng-if='data.date !== undefined'>{{ data.date | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.valueSold !== undefined'>{{ data.valueSold.toFixed(2) }}</td>
						  		<td ng-if='data.itemName !== undefined'>{{ data.itemName }}</td>
						  		<td ng-if='data.quantitySold !== undefined'>{{ data.quantitySold }}</td>
						  		<td ng-if='data.numberOfOrders !== undefined'>{{ data.numberOfOrders }}</td>
						  		<td ng-if='data.percentIncrease !== undefined'>{{ data.percentIncrease }}</td>
						  		<td ng-if='data.percentDecrease !== undefined'>{{ data.percentDecrease }}</td>
						  		<td ng-if='data.totalSpent !== undefined'>{{ data.totalSpent.toFixed(2) }}</td>
						  		<td ng-if='data.lastOrder !== undefined'>{{ data.lastOrder | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.dateJoined !== undefined'>{{ data.dateJoined | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.dateOfOrder !== undefined'>{{ data.dateOfOrder | date:"dd/MM/yyyy" }}</td>						  		
						  		<td ng-if='data.name !== undefined'>{{ data.name }}</td>
						  		<td ng-if='data.email !== undefined'>{{ data.email }}</td>
						  		<td ng-if='data.marketing !== undefined'> {{ data.marketing | marketing }}</td>					  		
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
</div>