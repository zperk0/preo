<div class="content-modal">
	<h4 class="title-modal-chart">{{ title }}</h4>

	<a class="close-reveal-modal" ng-click="cancel()">×</a>
	<i class="fa fa-plus-kyc" ng-click="flipChart()"></i>

	<div class="container-modal-chart">
		<div ng-if="!noData">
			<div ng-if="chart.showChart">
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

<div class="options-modal content-modal overflow" ng-if="chart.value.modal.options">
	<div class="content-options-modal">
		<div class="block-modal pull-left" ng-class="{ active: option.active }" ng-repeat="option in chart.value.modal.options">
			<div ng-switch="optionHasData(option)">
				<div ng-switch-when="1">
					<p class="title-option-modal">{{ option.name }}</p>
					<a href="javascript:void(0)" class="button-option" ng-click="selectOption( option )">{{ option.value }}</a>
				</div>
				<div ng-switch-when="0">
					 <p class="title-option-modal">{{ option.name }}</p>
					 <a href="javascript:void(0)" class="button-option" ng-click="setNoData(option)"> - </a>
				</div>
			</div>
		</div>
	</div>
</div>