<? session_start();?>

<div class="container-fluid" id="container-search">
	<div class="row formContainer" >  
	    <form class="navbar-form navbar-left columns large-7 small-12 nopadding" role="search" ng-submit="update()">
	      <div class='row nomargin'>
	        <div class="columns large-12 small-12 nopadding">              
	            <label>
	            <? echo _("Outlet:")?></label>
	            <div class='columns large-9 small-10 nopadding'>
	              <select>
	              	<option ng-repeat='report in reportsList'>{{report}}</option>
	              </select>
	             </div>
	             <div class='columns large-3 small-2'>
	              <button type="submit" class="button small"><? echo _("Update")?></button>            
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
						<span class="pull-left"><? echo _("Reports") ?></span>

						<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
							<i class="fa fa-plus"></i>
						</a>
					</div>

					<div id="content-table" >
						<table class="table table-striped table-list" ng-init="orderBy = 'Date Joined'; direction = false">
						  <thead>
						  	<tr>
						  		<th width="10">
						  			<input type="checkbox" ng-model="all_options" ng-change="selectAll()" />
						  		</th>					  		
						  		<th ng-repeat="title in selectedReport.titles" ng-click="setOrderBy(title)">
						  			{{getTitle(title)}}
						  			<div class="sort pull-right">
						  				<i class="fa fa-sort-up"></i>
						  				<i class="fa fa-sort-desc"></i>
						  			</div>		  			
						  		</th>
						  	</tr>
						  </thead>
						  <tbody>
						  	<tr ng-repeat="data in selectedReport.data | orderObjectBy:orderBy:direction">
						  		<td><input type="checkbox" ng-model="data.selected"></td>
						  		<td ng-if='data.dateJoined !== undefined'>{{ data.dateJoined | date:"dd/MM/yyyy" }}</td>
						  		<td ng-if='data.name !== undefined'>{{ data.name }}</td>
						  		<td ng-if='data.email !== undefined'>{{ data.email }}</td>
						  		<td ng-if='data.marketing !== undefined'> {{ data.marketing | marketing }}</td>					  		
						  	</tr>
						  </tbody>
						</table>		
					</div>

				</div>

				<div class="actions-chart back">
					<div class="header-chart overflow">
					
						<a href="javascript:void(0)" class="pull-left" ng-click="hideOptions()">
							<i class="fa fa-arrow-left icon-white"></i>
						</a>

					</div>
					<div class="content-actions">
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
	</div>
</div>