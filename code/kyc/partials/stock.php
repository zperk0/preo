<? session_start(); ?>
<div class="container container-partials row">
	<div class="flip-container topSpacing">
		<div class="flipper reportPage">
			<div class="front" id="content-list">
				
				<div class="header-list overflow">
					<span class="pull-left"><? echo _("Menu items")?></span>

					<a href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
						<i class="fa fa-plus"></i>
					</a>
				</div>

				<div id="content-table">
					<table class="table table-striped table-list" ng-init="orderBy = 'name'; direction = false">
					  <thead>
					  	<tr>
					  		<th width="10">
					  			<input type="checkbox" ng-model="all_options" ng-change="selectAll()" />
					  		</th>
					  		<th ng-click="orderBy = 'name'; direction=!direction">
					  			<? echo _("Item") ?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>				  			
					  		</th>
					  		<th ng-click="orderBy = 'quantity'; direction=!direction">
					  			<? echo _("Quantity Ordered") ?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>				  			
					  		</th>
					  	</tr>
					  </thead>
					  <tbody>
					  	<tr ng-repeat="item in stock | orderObjectBy:orderBy:direction">
					  		<td><input type="checkbox" ng-model="item.selected" /></td>
					  		<td>{{ item.name }}</td>
					  		<td>{{ item.quantity }}</td>
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