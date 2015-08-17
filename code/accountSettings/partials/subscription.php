<h3 translate>Subscriptions</h3>

<section class='scheduleWrapper' >
	<header translate>Billing Schedule</header>
	<br/>
	<div ng-if='card === false'>
		<p translate>Please add a payment method to keep your account active</p>
		<button class='preodayButton' ng-click='navigateTo("/accountSettings#/paymentMethod")' translate>ADD PAYMENT METHOD</button>
	</div>
	<div ng-if='card !== false'>
			<div ng-if='subscriptionInvoice && subscriptionInvoice.status === "REJECTED" ' class='recurringPaymentFailed'>
				<p><strong translate>You have an outstanding payment! </strong></p>
				<p translate>_tr("Please update your card details within ") + {{ diffInDays }} + _tr("days to prevent your account from being deactivated.")</p>
			</div>
			<div ng-if='!subscriptionInvoice || subscriptionInvoice.status !== "REJECTED"' class="contentMessageSubscription">

				<p ng-if="account.billingDate !== null && getTotalSubscription()>0" translate>Your account will be billed <b class='helveticaneueWMedi'>&pound;{{getTotalSubscription()}} (+VAT)</b> <b class='helveticaneueWMedi'>{{ account.billingDate | date:"MMM dd, yyyy" }}</b> </p>
				<p ng-if="account.billingDate !== null && getTotalSubscription()==0" translate>Your account will be deactivated on  <b class='helveticaneueWMedi'>{{ account.billingDate | date:"MMM dd, yyyy" }}</b>  </p>
				<p ng-if="account.billingDate === null" translate>You have no active subscriptions, your account will not be billed at this time. </p>
			</div>
			<div class='smallCard'>
				<img src='/img/credit-card.png' class='left'>
				<div class='left'>
					<strong class='helveticaneueWMedi'>{{ card.type }}</strong>
					<p translate> Card ending {{card.number}}</p>
				</div>
				<div class='clearfix'></div>
			</div>
			<div class='calendar' ng-if='account.billingDate !== null'>
				<div class='month'>{{ account.billingDate | date:"MMM" }}</div>
				<div class='day'>{{ account.billingDate | date:"d" }}</div>
			</div>
			<div class='clearfix'></div>
			<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/paymentMethod')" translate>CHANGE CARD</button>
				<button class='preodayButton inlineButton' ng-click="navigateTo('/accountSettings#/billingHistory')" translate>BILLING HISTORY</button>
	</div>
</section>

<section class='activeFeaturesWrapper' ng-repeat="accountPackage in accountPackages">
	<header translate>My Subscriptions</header>

	<section class='activeFeaturesWrapper'>
		<div class="blockSubscriptions" ng-if="isInstalled(accountPackage)">
			<p>{{_tr("You are currently subscribed to the") + accountPackage.preoPackage.name + _tr(" package.") }}</p>
			<p class="textGreen" ng-if="accountPackage.status == 'TRIAL'">{{_tr("Your free trial of this subscription will end at midnight on") + getTrialPeriod(accountPackage) }}</p>
		</div>
		<div class="blockSubscriptions" ng-if="isUninstaled(accountPackage)">
			<p>{{_tr("Your subscription has been cancelled")}} <span ng-if='!card' translate>. Please add a credit card to resubscribe.</span></p>
		</div>
		<div class="buttonsSubscriptions" ng-if="isInstalled(accountPackage)">
			<button class='preodayButton inlineButton' ng-click="showDialog('updatePackage', accountPackage)" translate>UPGRADE</button>
			<button class='preodayButton inlineButton' ng-click="showDialog('cancelPackage', accountPackage)" translate>CANCEL</button>
		</div>
		<div class="buttonsSubscriptions" ng-if="isUninstaled(accountPackage)">
			<button class='preodayButton inlineButton' ng-if="card" ng-click="resubscribePackage(accountPackage)" translate>RESUBSCRIBE</button>
			<button class='preodayButton inlineButton disabled' ng-if="!card" translate>RESUBSCRIBE</button>
		</div>
	</section>
</section>
</div>
