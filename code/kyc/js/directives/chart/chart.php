<? session_start(); ?>

<div class="flip-container">
	<div class="flipper">
		<div class="chart front">
			<div class="header-widget overflow">
				<a href="javascript:void(0)" id="removable_{{ chart.num }}" class="pull-left" ng-click="removeGrid(chart, $event)">
					<i class="fa fa-remove-kyc"></i>
				</a>
					
				<span>{{ chart.title }}</span>
		
				<a ng-if="chart.showChart && !noData" href="javascript:void(0)" class="pull-right" ng-click="showOptions()">
					<i class="fa fa-plus-kyc"></i>
				</a>

			</div>
			
			<div ng-if='noData'>
				<div class='noData'>
					<? echo _("No Data")?>
				</div>
			</div>
			<div ng-if='!noData'>

				<div ng-if="chart.showChart" class="content-chart">

					<div class="top-chart overflow" ng-if="chart.value.numberLeft !== undefined">
						<div class="pull-left numberLeft" ng-if="chart.value.numberLeft !== undefined">
							{{ getText(chart) }}
						</div>
						
					</div>

					<div class="highcharts-content" >
						<highchart id="chart_{{ chart.num }}" config="chart.highcharts" class="chart_{{ chart.value.type }}"></highchart>
					</div>

					<div ng-if="chart.value.items" class="containerMultiSelect">
              <multi-select
              	class="dropdown pdDropdown multiSelectChart selectOutlet"
                  input-model="chart.value.items"
                  button-label="name"
                  item-label="name"
                  tick-property="selected"
                  default-label="{{chart.value.selectedItem}}"
                  selection-mode="single"
                  on-change="changeItem()"
              ></multi-select>						
					</div>

				</div>

				<div ng-if="!chart.showChart" class="content-chart" >
					<span class="largerNumber" ng-class="{medium:getText(chart).length>7,small:getText(chart).length>=9}" >{{ getText(chart) }}</span>
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
	<div class="content-actions invisibleBack">
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