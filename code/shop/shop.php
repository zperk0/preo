<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 


<div ng-app="shop" ng-controller="shopController" ng-cloak class='shopWrapper'>
  <div class='loader' ng-show="!finishedLoading">      
      <img src='/img/spinner.gif'/>
  </div>  
  <div ng-show="finishedLoading">  
  
    <div class='shopHeader'>
      <div class='row'>
        <h1><small>my order app </small><br/>Premium Features</h1>
        <p><?echo _("At Preoday we believe that businesses such as yours should not pay to receive mobile orders. Our business model is simple: we charge no commission on orders you receive through the app.  Instead, we offer services that bring new value and insight to your business.") ?></p>
        </div>
    </div>
    <div class='row'>
    <div class='shopContent'>

        <div class='premiumFeatureWrapper small-6 large-4 columns' ng-repeat="feature in PremiumFeatures" >      
            <div class='premiumFeatureTop' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">
                <div class='titleWrapper'><h4>{{feature.name}}</h4></div>
                <img ng-src='{{feature.icon}}'/>
            </div>
            <div class='premiumFeatureBottom'>
                <h4  ng-click="setSelectedFeature($index)" data-reveal-id="featureModal"><span ng-show='feature.showAppTitle' > My order app </span>{{feature.name}}</h4>
                <p>{{feature.shortDescription}}</p> 
                <div class='priceWrapper' ng-show="feature.active && (feature.trialPeriod == 0 || getExpiryDate(feature) != 0) && !isFeatureOwned(feature) ">
                  <div class='price '>£{{feature.subscriptionPrice}}/month</div>                
                  <ul>
                    <li ng-show="feature.upfrontPrice>0">+ &pound;{{feature.upfrontPrice}} <?= _("one-off payment")?></li>
                    <li>+ <?= _("VAT")?></li>
                  </ul>
                  <button ng-show="!isFeatureInstalled(feature)" class='preodayButton' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal" >BUY</button>
                  <button ng-show="isFeatureInstalled(feature)" class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">INSTALLED</button>
                </div>
                <div class='priceWrapper' ng-show="isFeatureInstalled(feature) && getFeatureStatus(feature) != 'TRIAL' ">
                  <div class='price'>£{{feature.subscriptionPrice}}/month</div>                
                  <ul>
                    <li ng-show="feature.upfrontPrice>0">+ &pound;{{feature.upfrontPrice}} <?= _("one-off payment")?></li>
                    <li>+ <?= _("VAT")?></li>
                  </ul>
                  <button ng-show="isFeatureInstalled(feature)" class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">INSTALLED</button>
                </div>
                <div class='comingSoon' ng-show="!feature.active">
                  <button ng-show="!isFeatureOwned(feature)" class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal" >COMING SOON</button>
                </div>
                <div class='comingSoon' ng-show="feature.active && feature.trialPeriod > 0 && getExpiryDate(feature) === 0">
                  <button ng-show="!isFeatureOwned(feature)" class='preodayButton' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal" >FREE {{feature.trialPeriod}} DAY TRIAL</button>
                </div>
                <div class='comingSoon' ng-show="feature.trialPeriod > 0 && getFeatureStatus(feature) == 'TRIAL'">
                  <button class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal" > TRIAL EXPIRES IN {{ getExpiryDate(feature) }} DAYS </button>
                </div>
            </div>
        </div>
        <div class='clearfix'></div>
    </div>
  </div>

  <div id="featureModal" class="reveal-modal medium animatable slide-in-bottom" data-reveal>
    <div class='header'>
      <div class='leftWrapper'>
        <img ng-src='{{selectedFeature.feature.icon}}'/>      
        <h4>{{selectedFeature.feature.name}}</h4>
      </div>
      <div class='rightWrapper priceWrapper' ng-show="selectedFeature.feature.active && (selectedFeature.feature.trialPeriod == 0 || getExpiryDate(selectedFeature.feature) != 0)  && !isFeatureOwned(feature)  ">
        <div class='price'>£{{selectedFeature.feature.subscriptionPrice}}/month</div>                
        <ul>
          <li ng-show="selectedFeature.feature.upfrontPrice>0">+ &pound;{{selectedFeature.feature.upfrontPrice}} <?= _("one-off payment")?></li>
          <li>+ <?= _("VAT")?></li>
        </ul>
        <button ng-show="!isFeatureInstalled(selectedFeature.feature)" class='preodayButton' data-reveal-id="startPurchaseDialog">BUY</button>
        <button ng-show="isFeatureInstalled(selectedFeature.feature)" class='preodayButton secondary noclick' >INSTALLED</button>        
      </div>
      <div class='comingSoon' ng-show="!selectedFeature.feature.active">
          <button ng-show="!isFeatureOwned(feature)" class='preodayButton secondary noclick' >COMING SOON</button>
      </div>
      <div class='comingSoon' ng-show="selectedFeature.feature.active && selectedFeature.feature.trialPeriod > 0 && getExpiryDate(selectedFeature.feature) == 0">
        <button ng-show="!isFeatureOwned(feature)" class='preodayButton' data-reveal-id="startTrialDialog">FREE {{selectedFeature.feature.trialPeriod}} DAY TRIAL</button>
      </div> 
      <div class='comingSoon' ng-show="selectedFeature.feature.trialPeriod > 0 && getFeatureStatus(selectedFeature.feature) == 'TRIAL'">
        <button class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal" > TRIAL EXPIRES IN {{ getExpiryDate(selectedFeature.feature) }} DAYS </button>
      </div>       
                
                
                
      <div class='clearfix'></div>
    </div>
    <div class='content'>
        <img ng-show="currentScreenshot<selectedFeature.feature.promoImgs.length-1"  class='chevron chevronRight' ng-click="showNextScreenshot()" src='/img/chevron-right.png'/>
        <img ng-show="currentScreenshot>0"  class='chevron chevronLeft' ng-click="showPreviousScreenshot()" src='/img/chevron-left.png'/>
        <img ng-src='{{getScreenshot()}}' class='screenshot'/>
        <h6><?echo _("Features")?></h6>
        <ul>
          <li ng-repeat='descriptionFeature in selectedFeature.feature.descriptionFeatures'> {{descriptionFeature}}</li>
        </ul>
        <h6><?echo _("Description")?></h6>
        <div class='description'>{{selectedFeature.feature.description}}</div>
    </div>
    <a class="close-reveal-modal">&#215;</a>

  </div>


 <div id="noPaymentDialog" class="reveal-modal medium featureDialog" data-reveal>
      <p><? echo _("Please add a payment method to your account in order to subscribe to Premium Features")?></p>
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/paymentMethod')" ><? echo _("ADD PAYMENT METHOD")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('noPaymentDialog')" ><? echo _("RETURN TO STORE")?></button>
</div>

<div id="paymentErrorDialog" class="reveal-modal medium featureDialog" data-reveal>
      <p><? echo _("Your payment failed. The error message we have is:")?></p>
      <p>{{paymentFailedMessage}}</p>
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/paymentMethod')" ><? echo _("ALTER PAYMENT METHOD")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('paymentErrorDialog')" ><? echo _("RETURN TO STORE")?></button>
</div>

<div id="successDialog" class="reveal-modal medium featureDialog" data-reveal>
      <b><? echo _("Your new Premium Feature is now live!")?></b><br/>
      <p><? echo _("You can manage subscriptions from your account settings page")?></p>      
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/subscription')"><? echo _("ACCOUNT SETTINGS")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('successDialog')" ><? echo _("RETURN TO STORE")?></button>
</div>
<div id="startTrialDialog" class="reveal-modal medium featureDialog" data-reveal>
      <b>{{selectedFeature.feature.name}} - {{selectedFeature.feature.trialPeriod}} <? echo _("DAY FREE TRIAL")?></b><br/>
      <p><? echo _("Your card will not be charged for this translaction. You may cancel this trial at any time from your account settings page.")?></p>      
      <p>
        <label>
          <input type="checkbox" ng-model="acceptTerm"/>  
            I have read the <a href='#'>Terms and Conditions</a>
        </label>
      </p>  
      <button ng-class="{secondary:!acceptTerm,noclick:!acceptTerm}" class='positiveDismiss preodayButton' ng-click="startTrial(selectedFeature)"><? echo _("BEGIN TRIAL")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('successDialog')" ><? echo _("CANCEL")?></button>
</div>
  <div id="startPurchaseDialog" class="reveal-modal medium featureDialog" data-reveal>
      <b>{{selectedFeature.feature.name}}</b><br/>
      <p><? echo _("Your card will be charged ")?> <b>&pound;{{selectedFeature.feature.upfrontPrice}}</b>  <? echo _(" for this transaction. You may cancel this Premium Feature at any time from your account settings page.")?></p>      
      <p>
        <label>
          <input type="checkbox" ng-model="acceptTerm"/>  
            I have heard the <a href='#'>Terms and Conditions</a>
        </label>
      </p>  
      <button ng-class="{secondary:!acceptTerm,noclick:!acceptTerm}" class='positiveDismiss preodayButton' ng-click="clickBuy(selectedFeature.feature)"><? echo _("BUY")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('successDialog')" ><? echo _("CANCEL")?></button>
</div>

</div>
</div> <!-- End app -->
  <script src="/js/angular_all.min.js"></script>  
  <script type="text/javascript" src="/code/shop/app.js"></script>

  <script type="text/javascript">
      angular.module('shop').constant('ACCOUNT_ID', <? echo $_SESSION['account_id']?>);
  </script>
  <script type="text/javascript" src="/code/shop/resource.js"></script>
  <script type="text/javascript" src="/code/shop/controllers.js"></script>
  <script type="text/javascript" src="/code/shop/services/notification.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


