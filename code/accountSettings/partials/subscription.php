<h3><?echo _("Subscriptions")?></h3>

<section class='scheduleWrapper' >
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
				<p ng-show="account.billingDate !== null"  ><? echo _("Your account will be billed")?> <b class='helveticaneueWMedi'>&pound;{{getTotalSubscription()}}</b> <? echo _("on") ?> <b class='helveticaneueWMedi'>{{ account.billingDate | date:"MMM dd, yyyy" }}</b> </p>			
				<p ng-show="account.billingDate === null"><? echo _("You have no active subscriptions, your account will not be billed at this time.")?> </p>										
			</div>
			<div class='smallCard'>
				<img src='/img/credit-card.png' class='left'> 
				<div class='left'>
					<strong class='helveticaneueWMedi'>{{ card.type }}</strong>
					<p> Card ending {{card.number}}</p>
				</div>
			</div>
			<div class='calendar' ng-show='account.billingDate !== null'>
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
						<td ng-show="accountFeature.status === 'INSTALLED'"> &pound;{{accountFeature.feature.upfrontPrice}}/month </td>				
						<td ng-show="accountFeature.status === 'UNINSTALLED'">  <? echo _("Pending removal") ?> </td>				
						<td ng-switch='accountFeature.status'>
								<span ng-switch-when="INSTALLED" ng-click='openConfirmDialog(accountFeature)' class='positiveButton'> <? echo _("Uninstall")?></span>
								<span ng-switch-when="UNINSTALLED" ng-click='updateStatus(accountFeature,"INSTALLED")' class='negativeButton'> <? echo _("Cancel")?></span>
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
					<tr ng-repeat="accountFeature in accountFeatures | filter:{ status:'CANCELED'}" class="disabled" >
						<td > <img src='/img/icon_off.png' /> </td>
						<td> {{accountFeature.feature.name}} </td>
						<td> &pound;{{accountFeature.feature.upfrontPrice}}/month </td>				
						<td >
								<span ng-click='reinstallAccountFeature(accountFeature)' class='positiveButton'> <? echo _("Reinstall")?> </span>&nbsp;
								<span ng-click='removeAccountFeature(accountFeature)' class='negativeButton'> <? echo _("Remove")?> </span>
						</td>
					</tr>
				</table>	
			</div>

	</section>
</div>

<!-- start feature modal -->
 <div id="confirmationDialog" class="reveal-modal small featureDialog" data-reveal>
      <p><? echo _("This Premium Feature will remain active on your account until the end of the current billing cycle. You can cancel this uninstall at any time. If you wish to reinstall this Premium Feature after it has been deactivated, simply click on the <span>reinstall</span> option.")?></p>
      <p><b> <? echo _("Are you sure you want to uninstall this Premium Feature?")?></b></p>
      <button class='positiveDismiss preodayButton' ng-click="dialogConfirm('confirmationDialog')" ><? echo _("UNINSTALL")?></button>
      <button class='negativeDismiss preodayButton' ng-click="dialogCancel('confirmationDialog')" ><? echo _("CANCEL")?></button>
  </div>
  <!-- end feature modal -->

  <!-- start feature modal -->
 <div id="reinstallDialog" class="reveal-modal small featureDialog" data-reveal>
      <p><? echo _("This Premium Feature is currently canceled. A new charge will be made to your card before reinstalling this feature.")?></p>
      <p><b> <? echo _("Are you sure you want to reinstall this Premium Feature?")?></b></p>
      <button class='positiveDismiss preodayButton' ng-click="dialogConfirm('reinstallDialog')" ><? echo _("REINSTALL")?></button>
      <button class='negativeDismiss preodayButton' ng-click="dialogCancel('reinstallDialog')" ><? echo _("CANCEL")?></button>
  </div>
  <!-- end feature modal -->

   <div id="errorDialog" class="reveal-modal medium featureDialog" data-reveal>
      <p><? echo _("Please add a payment method to your account in order to subscribe to Premium Features")?></p>
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/paymentMethod')" ><? echo _("ADD PAYMENT METHOD")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dialogCancel('errorDialog')" ><? echo _("RETURN TO ACCOUNT SETTINGS")?></button>
</div>

<div id="successDialog" class="reveal-modal medium featureDialog" data-reveal>
      <b><? echo _("Your new Premium Feature is now live!")?></b><br/>
      <p><? echo _("You can manage subscriptions from your account settings page")?></p>      
      <button class='positiveDismiss preodayButton' ng-click="dialogCancel('successDialog')"><? echo _("RETURN TO ACCOUNT SETTINGS")?></button>
</div>