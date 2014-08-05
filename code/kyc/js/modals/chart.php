<div class="content-modal flip-container">	
		<div class="flipper">
			<div class="front">
					<h4 class="title-modal-chart">{{ title }}</h4>

					<a class="close-reveal-modal" ng-click="cancel()">×</a>
					<i class="fa fa-plus-kyc" ng-click="showOptions()"></i>

					<div class="container-modal-chart " >
						<div ng-if="!noData">
							<div ng-if="chart.showChart" class="highcharts-content"> 
								<highchart id="chart_{{ chart.num }}" config="chart.highcharts"></highchart>
							</div>

							<div ng-if="!chart.showChart">
								<span class="largerNumber">{{ chart.value }}</span>
							</div>		
						</div>

						<div ng-if='noData'>
								<div class='noData'>
									<? echo _("No Data")?>
								</div>
						</div>		
					</div>
			</div>
			<div class="actions-chart back">				
			</div>
		</div>
		<div class="header-chart overflow invisibleBack">			
					<a href="javascript:void(0)" class="pull-left" ng-click="hideOptions()">
						<i class="fa fa-arrow-left-kyc icon-white"></i>
					</a>
		</div>			
		<div class="content-actions content-actionsModal invisibleBack">
					<h4><? echo _("Export as...") ?></h4>

					<div class="buttons"> 
						<form action="{{ '/api/accounts/' + ACCOUNT_ID + '/exports/pdfs/post' }}" method='POST' ng-submit='exportPdf()'>
							<input name='data' value='{{pdfData}}' type='hidden'/>
								<button  type='submit'>
									<? echo _("PDF")?>
								</button>
						</form>
						<form action="{{ '/api/accounts/' + ACCOUNT_ID + '/exports/csv/post' }}" method='POST' ng-submit='exportCsv()'>						
							<input name='data' value='{{csvData}}' type='hidden'/>
								<button  type='submit'>
									<? echo _("CSV")?>
								</button>
						</form>
					</div>
				</div>
</div>

<div class="options-modal  content-modal overflow" ng-if="chart.value.modal.options">
	<div class="content-options-modal">
		<div class="block-modal pull-left" ng-class="{ active: option.active }" ng-repeat="option in chart.value.modal.options">
			<div>
					<p class="title-option-modal">{{ option.name }}</p>
					<a href="javascript:void(0)" class="button-option" ng-click="selectOption( option )">{{ option.value }}</a>
			</div>					
		</div>
	</div>
</div>