<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 


<div ng-app="shop" ng-controller="shopController" ng-cloak>
  <div class='loader' ng-show="!finishedLoading">      
      <img src='/img/spinner.gif'/>
  </div>  
  <div ng-show="finishedLoading">  
  
    <div class='shopHeader'></div>
    <div class='row'>
    <div class='shopContent'>

        <div class='premiumFeatureWrapper small-4 large-4 columns' ng-repeat="feature in PremiumFeatures" >      
            <div class='premiumFeatureTop'>
                <h4  ><small ng-show='feature.showAppTitle' > my order app <br/></small>{{feature.name}}</h4>
                <img ng-src='{{feature.icon}}'/>
            </div>
            <div class='premiumFeatureBottom'>
                <h4 class='helveticaneueWMedi'><span ng-show='feature.showAppTitle' > My order app </span>{{feature.name}}</h4>
                <p>{{feature.description}}</p>
                <span class='price helveticaneueWMedi' >£{{feature.price}}/month</span class='price'>                
                <button ng-show="!isFeatureOwned(feature)" class='preodayButton' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">BUY</button>
                <button ng-show="isFeatureOwned(feature)" class='preodayButton secondary' ng-click="setSelectedFeature($index)" data-reveal-id="featureModal">VIEW</button>
            </div>
        </div>
        <div class='clearfix'></div>
    </div>
  </div>

  <div id="featureModal" class="reveal-modal medium" data-reveal>
    <div class='header'>
      <div class='leftWrapper'>
        <img ng-src='{{selectedFeature.feature.icon}}'/>
        <span>my order app</span>
        <h4>{{selectedFeature.feature.name}}</h4>
      </div>
      <div class='rightWrapper '>
          <span class='price helveticaneueWMedi' >£{{selectedFeature.feature.price}}/month</span class='price'>
          <button ng-show="!isFeatureOwned(selectedFeature.feature)" class='preodayButton' ng-click="clickBuy(selectedFeature.feature)" data-reveal-id="myModal">BUY</button>
          <button ng-show="isFeatureOwned(selectedFeature.feature)" class='preodayButton secondary noclick'>OWNED</button>
      </div>
      <div class='clearfix'></div>
    </div>
    <div class='content'>
        <span class='chevron chevronRight' ng-click="selectNextFeature()">&gt;</span>
        <span class='chevron chevronLeft' ng-click="selectPreviousFeature()">&lt;</span>
        <img ng-src='{{selectedFeature.feature.promoImg}}'/>
        <h6><?echo _("Features")?></h6>
        <ul>
          <li ng-repeat='descriptionFeature in selectedFeature.feature.descriptionFeatures'> {{descriptionFeature}}</li>
        </ul>
        <h6><?echo _("Description")?></h6>
        <div class='description'>{{selectedFeature.feature.description}}</div>
    </div>
    <a class="close-reveal-modal">&#215;</a>

  </div>


 <div id="errorDialog" class="reveal-modal medium featureDialog" data-reveal>
      <p><? echo _("Please add a payment method to your account in order to subscribe to Premium Features")?></p>
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/paymentMethod')" ><? echo _("ADD PAYMENT METHOD")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('errorDialog')" ><? echo _("RETURN TO STORE")?></button>
</div>

<div id="successDialog" class="reveal-modal medium featureDialog" data-reveal>
      <b><? echo _("Your new Premium Feature is now live!")?></b><br/>
      <p><? echo _("You can manage subscriptions from your account settings page")?></p>      
      <button class='positiveDismiss preodayButton' ng-click="navigateTo('/accountSettings#/subscription')"><? echo _("ACCOUNT SETTINGS")?></button>
      <button class='negativeDismiss preodayButton secondary' ng-click="dismissDialog('successDialog')" ><? echo _("RETURN TO STORE")?></button>
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
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


