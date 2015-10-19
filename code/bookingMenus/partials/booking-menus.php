<div class='menus-container' ng-controller="MenusCtrl as menusCtrl">
	<div class="row">
		<div class="topSpacer"></div>
		<div class="large-12 columns">
			<h2 translate>Group Booking Menus</h2>
			<div class="date-range">
				<button class='new-menu-btn' ng-click='menusCtrl.createMenu()' type="button" title="{{'Create new menu' | translate}}">+ {{'CREATE NEW MENU' | translate}}</button>
			</div>
		</div>
	</div>
	<div class="row menus-row">
		<div class="large-12 columns">
			<table class='menus-table'>
				<thead>
					<tr>
						<th class="menu-name" translate>Name</th>
						<th class="menu-description" translate>Description</th>
						<th class="menu-promotions" translate>Assigned to these promotions</th>
						<th class="menu-tools" translate>Tools</th>
					</tr>
				</thead>
				<tbody>
					<tr menus-item ng-click='menusCtrl.toggleDetails($index)' ng-repeat='menu in menusCtrl.menusData' element='menu' remove-menu='menusCtrl.removeItemMenu' duplicate-menu='menusCtrl.duplicateItemMenu'></tr>
				</tbody>
			</table>
		</div>
	</div>
</div>