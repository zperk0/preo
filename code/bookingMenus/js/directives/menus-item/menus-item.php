<tr class="menu-info">
	<td class="menu-name">
		<span><b>{{menu.name}}</b></span>
	</td>
	<td class="menu-description">
		<span>{{menu.description}}</span>
	</td>
	<td class="menu-promotions">
		<div ng-class='{oneline: menu.promotions.length <= 2}'>
			<input type="text" size='' readonly='readonly' ng-repeat='promotion in menu.promotions' value='{{promotion.name}}'>
		</div>
	</td>
	<td class="menu-tools">
		<button type="button" ng-click='removeItem(menu)' class="eventTableButtons secondary eventDelete" 	title="{{'Delete' | translate}}"><i class="pd-delete"></i></button>
		<button type="button" ng-click='duplicateItem(menu, $event)' class="eventTableButtons eventDuplicate" title="{{'Duplicate' | translate}}"><i class="pd-copy"></i></button>
		<button type="button" ng-click='editItem(menu)' class="eventTableButtons eventTDEdit" title="{{'Edit' | translate}}"><i class="pd-edit"></i></button>
	</td>
</tr>