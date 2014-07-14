<? session_start(); ?>

<div class="flip-container">
	<div class="flipper">
		<div class="chart front">
			<div class="header-widget overflow">
				<a href="javascript:void(0)" id="removable_{{ chart.num }}" class="pull-left" ng-click="removeGrid(chart, $event)" ng-if='!noData'>
					<i class="fa fa-times"></i>
				</a>
					
				<span class="pull-left">{{ chart.title }}</span>

				<a ng-if="chart.showChart" href="javascript:void(0)" class="pull-right" ng-click="showOptions()" ng-if='!noData'>				
					<i class="fa fa-plus"></i>
				</a>

			</div>
			
			<div ng-if='noData'>
					<div class='noData'>
						<? echo _("No Data")?>
					</div>
			</div>
			<div ng-if='!noData'>

				<div ng-if="chart.showChart" class="content-chart">

					<div class="top-chart overflow" ng-if="chart.value.numberLeft || chart.value.numberRight">
						<div class="pull-left numberLeft" ng-if="chart.value.numberLeft">
							{{ getText(chart) }}
						</div>

						<div class="pull-right numberRight" ng-if="chart.value.numberRight" ng-bind-html="chart.value.numberRight">							
						</div>								
					</div>

					<div class="highcharts-content" >
						<highchart id="chart_{{ chart.num }}" config="chart.highcharts" class="chart_{{ chart.value.type }}"></highchart>
					</div>

					<div ng-if="chart.value.items">
						<select class="dropdown pdDropdown" ng-model="selectedItem" ng-change="changeItem( selectedItem )" ng-init="selectedItem = chart.value.items[0]" ng-options="item as item.name for item in chart.value.items">
						</select>				
					</div>

				</div>

				<div ng-if="!chart.showChart" class="content-chart" >
					<span class="largerNumber" ng-class="{medium:getText(chart).length>7,small:getText(chart).length>=9}" >{{ getText(chart) }}</span>
				</div>
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

				<div class="buttons"> 
				<!--FIXME I can't figure out a way to use a dynamic action on this form using javascript only. for some reason if we try to alter
									the action to use the correct account id, the form is not submitted. Find a way to do it correctly and replace this -->
					<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/pdfs/post' method='POST' ng-submit='exportPdf()'>
						<input name='data' value='{{pdfData}}' type='hidden'/>
							<button  type='submit'>
								<? echo _("PDF")?>
							</button>
					</form>
					<form action='/api/accounts/<? echo $_SESSION['account_id']?>/exports/csv/post' method='POST' ng-submit='exportCsv()'>						
						<input name='data' value='{{csvData}}' type='hidden'/>
							<button  type='submit'>
								<? echo _("CSV")?>
							</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>