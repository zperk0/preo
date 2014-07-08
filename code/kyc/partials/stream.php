<div class="container container-partials">
	<div class="flip-container topSpacing">
		<div class="flipper">
			<div class="front" id="content-list">
				
				<div class="header-list overflow">			
					<span class="pull-left"><? echo _("Live Stream")?></span>				
				</div>
				<div id="content-table">
					<table class="table table-striped table-list table-stream table-condensed">
					<thead>
					  	<tr>					  		
					  		<th ng-click="orderBy = 'status'; direction=!direction">
					  			<? echo _("Status")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>
					  		<th ng-click="orderBy = 'total'; direction=!direction">
					  			<? echo _("Total")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>
					  		<th ng-click="orderBy = 'customer'; direction=!direction">
					  			<? echo _("Customer")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>					  	
					  		<th ng-click="orderBy = 'order'; direction=!direction">
					  			<? echo _("Order")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>
					  		<th ng-click="orderBy = 'time'; direction=!direction">
					  			<? echo _("Time")?>
					  			<div class="sort pull-right">
					  				<i class="fa fa-sort-up"></i>
					  				<i class="fa fa-sort-desc"></i>
					  			</div>		  			
					  		</th>					  						  	
					  	</tr>
					  </thead>
					  <tbody ng-repeat="order in orders | filter:outletFilter " ng-switch on="order.active" >
					  	<tr ng-click="activeStream(order)" ng-class="{active: order.active}">
					  		<td width="15">
					  			<span class="block-status {{ getStatusColor(order.status) }}">{{ getStatusName(order.status) }}</span>
					  		</td>
					  		<td width="100" valign="middle" class='streamPrice'>{{ currencySymbol+order.total }}</td>
					  		<td valign="middle" class='streamCustomer'>{{ order.user.firstName + " " + order.user.lastName }}</td>
					  		<td width="300" valign="middle" class='streamOrder'>{{ getOrderItems(order).join(",") }}</td>
					  		<td width="200" valign="middle" class='streamUpdated'>{{ order.updated | timeAgo }} ago </td>
					  	</tr>
					  	<tr ng-switch-when="true" class="result">
					  		<td colspan="2" class="padding information">
					  			<p class="code"><b>#{{ order.id }}</b></p>
					  			<p>{{ order.user.firstName + " " + order.user.lastName }}</p>
					  			<p>{{order.created | date:'EEEE dd MMMM' }}</p>
					  			<p>{{order.created | date:'HH:mm:ss' }}</p>
					  			<br />
					  			<!-- <p>{{order. ****4580}}</p> //TODO where will this come from?-->
					  			<p class="text-status {{ getStatusColor(order.status) }}">{{getStatusName(order.status)}}</p>
					  		</td>
					  		<td colspan="3">
					  			<table class="table-max">
					  				<tbody>
					  					<tr ng-repeat="item in order.items">
					  						<td colspan="3">{{ item.qty +" x "+item.name}}</td>
					  						<td width="200">{{ currencySymbol+item.total.toFixed(2) }}</td>
					  					</tr>
					  					<tr ng-show="order.discount && order.discount>0" class='streamDiscount'>
					  						<td colspan="3"><? echo _("Discount")?></td>
					  						<td width="200">-{{ currencySymbol+order.discount.toFixed(2) }}</td>
					  					</tr>
					  					<tr class='streamTotal'>
					  						<td colspan="3"><b><? echo _("TOTAL")?></b></td>
					  						<td width="200"><b>{{ currencySymbol+order.total.toFixed(2) }}</b></td>
					  					</tr>
					  				</tbody>
					  			</table>
					  		</td>
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
				
		</div>
	</div>
</div>