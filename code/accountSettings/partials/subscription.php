<h3><?echo _("Subscriptions")?></h3>

<section class='scheduleWrapper'>
	<header><? echo _("Billing Schedule")?></header>
	<br/>	
	<div ng-show='card === false'>				
		<p><? echo _("Please add a payment method in order to subscribe to premium features")?></p>
		<button class='preodayButton'><? echo _("ADD PAYMENT METHOD") ?></button>
	</div>		
	<div ng-show='card !== false'>						
			<div ng-show='diffInDays > 0' class='recurringPaymentFailed'>
				<p><strong><? echo _("Your recurring payment has failed!")?> </strong></p>	
				<p><? echo _("Please update your card details within ")?> {{ diffInDays }}  <? echo _(" days to prevent your Premium Features from being deactivated.")?> </p>					
			</div>
			<div ng-show='diffInDays <= 0'>			
				<p ng-show="account.billingDate !== null"><? echo _("Your account will be billed")?> <b>{{getTotalSubscription()}}</b> <? echo _("on") ?> <b>{{ account.billingDate | date:"MMM dd, yyyy" }}</b> </p>			
				<p ng-show="account.billingDate === null"><? echo _("You have no active subscriptions, your account will not be billed at this time.")?> </p>										
			</div>
			<div class='smallCard'>
				<img src='/img/credit-card.png' class='left'> 
				<div class='left'>
					<strong>{{ card.type }}</strong>
					<p> Card ending {{card.number}}</p>
				</div>
			</div>
			<div class='calendar'>
				<div class='month'>{{ account.billingDate | date:"MMM" }}</div>
				<div class='day'>{{ account.billingDate | date:"d" }}</div>
			</div>
			<div class='clearfix'></div>
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/paymentMethod')"><? echo _("CHANGE CARD") ?></button>
				<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/billingHistory')"><? echo _("BILLING HISTORY") ?></button>
	</div>	
</section>

<section class='activeFeaturesWrapper'>
	<header><? echo _("Active Premium Features")?></header>
	<br/>
	<div ng-show='activeFeaturesCount == 0' >		
		<p><? echo _("You currently don't have any active Premium Features on your account.")?></p>		
		<p class='marginBottom100'><? echo _("Why not check out our")?> <a href='/shop' class='premiumFeatureColor'>  <? echo _("Available Premium Features")?> </a> <? echo _("and discover how they can start 
			adding further value to your business today")?></p>			
	</div ng-show='activeFeaturesCount >= 1'>
			<table>
				<tr ng-repeat="accountFeature in accountFeatures | filter:{ status:'INSTALLED'}" ng-class='{"disabled":accountFeature.status === "UNINSTALLED" }'>
						<td > <img ng-src="{{accountFeature.status === 'INSTALLED' && accountFeature.feature.icon || '/img/icon_off.png'}}" /> </td>
						<td> <span class='featureAppTitle' ng-show="accountFeature.feature.showAppTitle"> my order app </span> {{accountFeature.feature.name}} </td>
						<td> {{accountFeature.feature.price}}/month </td>				
						<td ng-switch='accountFeature.status'>
								<span ng-switch-when="INSTALLED" ng-click='updateStatus(accountFeature,"UNINSTALLED")'> <? echo _("Uninstall")?></span>
								<span ng-switch-when="UNINSTALLED" ng-click='updateStatus(accountFeature,"INSTALLED")'> <? echo _("Cancel")?></span>
						</td>
				</tr>
			</table>
	<div>
		
	</div>		
</section>

	<section class='deactivatedFeaturesWrapper' ng-show="hasCancelledFeatures()">
			<header><? echo _("Deactivated Premium Features")?></header>
			<br/>
			<div>
				<table>
					<tr ng-repeat="accountFeature in accountFeatures | filter:{ status:'CANCELLED'}" class="disabled" >
						<td > <img src='/img/icon_off.png' /> </td>
						<td> {{accountFeature.feature.name}} </td>
						<td> {{accountFeature.feature.price}}/month </td>				
						<td >
								<span ng-click='updateStatus(accountFeature,"INSTALLED")'> <? echo _("Reinstall")?> </span>								
						</td>
					</tr>
				</table>	
			</div>

	</section>
</div>