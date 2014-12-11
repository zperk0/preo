<h3><?echo _("Subscriptions")?></h3>

<section class='scheduleWrapper' >
	<header><? echo _("Billing Schedule")?></header>
	<br/>	
	<div ng-if='card === false && (!subscriptionInvoice || subscriptionInvoice.status !== "REJECTED")'>				
		<p><? echo _("Please add a payment method in order to subscribe to premium features")?></p>
		<button class='preodayButton' ng-click='navigateTo("/accountSettings#/paymentMethod")'><? echo _("ADD PAYMENT METHOD") ?></button>
	</div>		
	<div ng-if='card !== false'>						
			<div ng-if='subscriptionInvoice && subscriptionInvoice.status === "REJECTED" ' class='recurringPaymentFailed'>
				<p><strong><? echo _("You have an outstanding payment!")?> </strong></p>	
				<p><? echo _("Please update your card details within ")?> {{ diffInDays }}  <? echo _(" days to prevent your Premium Features from being deactivated.")?> </p>					
			</div>
			<div ng-if='!subscriptionInvoice || subscriptionInvoice.status !== "REJECTED"' class="contentMessageSubscription">			
				<p ng-if="account.billingDate !== null"  ><? echo _("Your account will be billed")?> <b class='helveticaneueWMedi'>&pound;{{getTotalSubscription()}}</b> <? echo _("on") ?> <b class='helveticaneueWMedi'>{{ account.billingDate | date:"MMM dd, yyyy" }}</b> </p>			
				<p ng-if="account.billingDate === null"><? echo _("You have no active subscriptions, your account will not be billed at this time.")?> </p>										
			</div>
			<div class='smallCard'>
				<img src='/img/credit-card.png' class='left'> 
				<div class='left'>
					<strong class='helveticaneueWMedi'>{{ card.type }}</strong>
					<p> Card ending {{card.number}}</p>
				</div>
				<div class='clearfix'></div>
			</div>
			<div class='calendar' ng-if='account.billingDate !== null'>
				<div class='month'>{{ account.billingDate | date:"MMM" }}</div>
				<div class='day'>{{ account.billingDate | date:"d" }}</div>
			</div>
			<div class='clearfix'></div>
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/paymentMethod')"><? echo _("CHANGE CARD") ?></button>
				<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/billingHistory')"><? echo _("BILLING HISTORY") ?></button>
	</div>	
</section>

<section class='activeFeaturesWrapper' ng-repeat="accountPackage in accountPackages">
	<header><? echo _("My Subscriptions")?></header>

	<section class='activeFeaturesWrapper'>
		<div class="blockSubscriptions" ng-if="isInstalled(accountPackage)">
			<p><?php echo _("You are currently subscribed to the ") ?> {{ accountPackage.preoPackage.name + _tr(" package.") }}</p>
			<p class="textGreen" ng-if="accountPackage.preoPackage.trialPeriod"><?php echo _("Your free trial of this subscription will end at midnight on ") ?> {{ getTrialPeriod(accountPackage) }}</p>
		</div>
		<div class="blockSubscriptions" ng-if="isUninstaled(accountPackage)">
			<p><?php echo _("Your subscription has been cancelled ") ?></p>
		</div>
		<div class="buttonsSubscriptions" ng-if="isInstalled(accountPackage)">
			<button class='preodayButton inlineButton' ng-click="showDialog('updatePackage', accountPackage)"><? echo _("UPGRADE") ?></button>		
			<button class='preodayButton inlineButton' ng-click="showDialog('cancelPackage', accountPackage)"><? echo _("CANCEL") ?></button>		
		</div>
		<div class="buttonsSubscriptions" ng-if="isUninstaled(accountPackage)">
			<button class='preodayButton inlineButton' ng-click="resubscribePackage(accountPackage)"><? echo _("RESUBSCRIBE") ?></button>		
		</div>
	</section>
</section>
</div>
