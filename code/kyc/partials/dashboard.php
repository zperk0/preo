<div class="container-fluid">
	<div class="container">
		<div id="filterDashboard">
			<ul>
				<li ng-repeat="value in values" class='columns large-3 nopadding'>
				  <div class="checkbox checkboxStyle">
				  	<input type="checkbox" ng-change='changeVisibility(value)' ng-model="value.display" id="check_{{ value.num }}" />
				    <label for="check_{{ value.num }}" ng-class="{disabled: !value.display}">{{ value.title }}</label>
				  </div>
				</li>
				<li class='clearfix'></li>
			</ul>

		</div>


		<div id="dashboard">
			
      	<div id='sscontainer' class="sscontainer" shapeshift="shapeshifterConfig">
		        <div ng-repeat='value in values' class='widget' data-ss-colspan="{{value.showChart ? 2 : 1}}"> 
		        	<chart element="value"></chart>
		        </div>
		        
		    </div>		    	
		</div>		
	</div>
</div>