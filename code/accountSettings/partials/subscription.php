<h3><?echo _("Subscriptions")?></h3>

	
<section class='scheduleWrapper'>
	<header><? echo _("Billing Schedule")?></header>
	<br/>
	<div ng-show='card === false'>				
		<p><? echo _("Please add a payment method in order to subscribe to premium features")?></p>
		<button class='preodayButton'><? echo _("ADD PAYMENT METHOD") ?></button>
	</div>		
	<div ng-show='card !== false'>						
			<p><? echo _("Your account will be billed")?> <b>{{getTotalSubscription()}}</b> <? echo _("on") ?> <b>{{getFormattedBillingDate()}}</b> </p>			
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/paymentMethod')"><? echo _("CHANGE CARD") ?></button>
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/billingHistory')"><? echo _("BILLING HISTORY") ?></button>
	</div>	
</section>

<section class='activeFeaturesWrapper'>
	<div ng-show='subscriptions === undefined || subscriptions.length === 0' >
		<header><? echo _("Active Premium Features")?></header>
		<br/>
		<p><? echo _("You currently don't have any active Premium Features on your account.")?></p>		
		<p class='marginBottom100'><? echo _("Why not check out our")?> <a href='/shop' class='premiumFeatureColor'> Available Premium Features </a> <? echo _("and discover how they can start 
			adding further value to your business today")?></p>			
	</div>		


</section>
</div>