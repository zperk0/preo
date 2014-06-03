<h3><?echo _("Subscriptions")?></h3>

	
<section class='scheduleWrapper'>
	<header><? echo _("Billing Schedule")?></header>
	<br/>
	<div ng-show='card === false'>				
		<p><? echo _("Please add a payment method in order to subscribe to premium features")?></p>
		<button class='preodayButton'><? echo _("ADD PAYMENT METHOD") ?></button>
	</div>		
	<div ng-show='card !== false'>						
			<p ng-show="account.billingDate !== null"><? echo _("Your account will be billed")?> <b>{{getTotalSubscription()}}</b> <? echo _("on") ?> <b>{{ account.billingDate | date:"MMM dd, yyyy" }}</b> </p>			
			<p ng-show="account.billingDate === null"><? echo _("You have no active subscriptions, your account will not be billed at this time.")?> </p>						
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/paymentMethod')"><? echo _("CHANGE CARD") ?></button>
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/billingHistory')"><? echo _("BILLING HISTORY") ?></button>
	</div>	
</section>

<section class='activeFeaturesWrapper'>
	<header><? echo _("Active Premium Features")?></header>
	<br/>
	<div ng-show='accountFeatures === undefined || accountFeatures.length === 0' >		
		<p><? echo _("You currently don't have any active Premium Features on your account.")?></p>		
		<p class='marginBottom100'><? echo _("Why not check out our")?> <a href='/shop' class='premiumFeatureColor'> Available Premium Features </a> <? echo _("and discover how they can start 
			adding further value to your business today")?></p>			
	</div ng-show='accountFeatures !== undefined && accountFeatures.length > 0'>
			<table>
				<tr ng-repeat="accountFeature in accountFeatures" ng-class='{"disabled":accountFeature.status === "UNINSTALLED" }'>
						<td > <img src='{{accountFeature.feature.icon}}' /> </td>
						<td> {{accountFeature.feature.name}} </td>
						<td> {{accountFeature.feature.price}}/month </td>				
						<td ng-switch='accountFeature.status'>
								<span ng-switch-when="INSTALLED" ng-click='updateStatus(accountFeature,"UNINSTALLED")'>Uninstall</span>
								<span ng-switch-when="UNINSTALLED" ng-click='updateStatus(accountFeature,"INSTALLED")'>Cancel</span>
						</td>
				</tr>
			</table>
	<div>
		
	</div>		


</section>
</div>