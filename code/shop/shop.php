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
  <div>  
    <div class='shopHeader'>
      <div class='row'>
        <h1><?= _("Premium Features")?></h1>
        <p><?echo _("At Preoday we believe that businesses such as yours should not pay to receive mobile orders. Our business model is simple: we charge no commission on orders you receive through the app.  Instead, we offer services that bring new value and insight to your business.") ?></p>
        </div>
    </div>
    <div class='row'>
    <div class='shopContent'>

        <div class='premiumFeatureWrapper small-6 large-4 columns' ng-repeat="feature in PremiumFeatures" >      
            <div class='premiumFeatureTop' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal">
                <div class='titleWrapper'><h4>{{feature.name}}</h4></div>
                <img ng-src='{{feature.icon}}'/>
            </div>
            <div class='premiumFeatureBottom'>
                <h4  ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal"><span ng-show='feature.showAppTitle' > My order app </span>{{feature.name}}</h4>
                <p>{{feature.shortDescription}}</p> 
                <hr class="lineFeature" />
                <div class='comingSoon  priceWrapperList' ng-if="!feature.active">
                  <button  class='preodayButton secondary' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal" ><?echo _("COMING SOON")?></button>
                </div>
                <div class='comingSoon priceWrapperList' ng-if="feature.getInTouch">
                  <button class='preodayButton' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal" ><?echo _("GET IN TOUCH")?></button>
                </div>
              
                <div class='priceWrapper priceWrapperList' ng-if="feature.active && !feature.getInTouch">                  
                  <div class="contentInformationPrice">
                    <div class='price '>£{{feature.subscriptionPrice}}/<?= _("month")?></div>                
                    <ul>
                      <li><span ng-show="feature.upfrontPrice>0">+ &pound;{{feature.upfrontPrice}} <?= _("one-off payment")?></span> + <?= _("VAT")?></li>
                    </ul>
                  </div>
                  <div class='comingSoon'>
                    <button ng-if="feature.trialPeriod > 0 && getFeatureStatus(feature) === false" class='preodayButton' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal" ><?echo _("FREE")?> {{feature.trialPeriod}} <?echo _("DAY TRIAL")?></button>
                    <button ng-if="feature.trialPeriod > 0  && getFeatureStatus(feature) ===  'TRIAL'" class='preodayButton secondary' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal" ><?echo _("TRIAL EXPIRES IN")?> {{ getExpiryDate(feature) }} <?echo _("DAYS")?> </button>
                  </div>
                  <button ng-if="getFeatureStatus(feature) === 'REMOVED' || getFeatureStatus(feature) === 'CANCELED' || (feature.trialPeriod === 0 && getFeatureStatus(feature) === false) || getFeatureStatus(feature) === 'EXPIRED'"  class='preodayButton' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal" ><?echo _("BUY<")?>/button>
                  <button ng-if="getFeatureStatus(feature) === 'UNINSTALLED' || getFeatureStatus(feature) === 'INSTALLED'"   class='preodayButton secondary' ng-click="setSelectedFeature(feature.id)" data-reveal-id="featureModal"><?echo _("INSTALLED")?></button>
                </div>                           
                
            </div>
        </div>
        <div class='clearfix'></div>
    </div>
  </div>

  <div id="featureModal" class="reveal-modal large animatable slide-in-bottom" data-reveal>
    <div class='header'>
      <div class='leftWrapper'>                
          <img ng-src='{{selectedFeature.feature.icon}}'/>
          <div class="titleModal" ng-class="{fullHeight:!selectedFeature.feature.active || selectedFeature.feature.getInTouch}" >{{selectedFeature.feature.name}}</div>
          <div class="titlePrice" ng-if="selectedFeature.feature.active && !selectedFeature.feature.getInTouch">          
            + &pound;{{selectedFeature.feature.subscriptionPrice}}/<?= _("month")?>
            <small><br class='ifSmall'/>(
              <span ng-show="selectedFeature.feature.upfrontPrice>0">+ &pound;{{selectedFeature.feature.upfrontPrice}} <?= _("one-off payment")?></span>
               + <?= _("VAT")?>
              )
            </small> 
          </div>        
      </div>
      <div class='clearfix'></div>    
      <div ng-if="!selectedFeature.feature.active">
          <button class='comingSoon preodayButton secondary noclick' disabled><?echo _("COMING SOON")?></button>
      </div>  
      <div ng-if="selectedFeature.feature.active && (selectedFeature.feature.trialPeriod == 0 || getExpiryDate(selectedFeature.feature) != 0) && getFeatureStatus(selectedFeature.feature) !== 'TRIAL'">
        <button ng-if="getFeatureStatus(selectedFeature.feature) === 'REMOVED' || getFeatureStatus(selectedFeature.feature) === 'CANCELED' || getFeatureStatus(selectedFeature.feature) === false || getFeatureStatus(selectedFeature.feature) === 'EXPIRED'" class='preodayButton smallButton' ng-click='clickBuy()'><?echo _("BUY")?></button>
        <button ng-if="getFeatureStatus(selectedFeature.feature) === 'UNINSTALLED' || getFeatureStatus(selectedFeature.feature) === 'INSTALLED'" class='preodayButton secondary noclick smallButton' ><?echo _("INSTALLED")?></button>              
      </div>            
      <div ng-if="selectedFeature.feature.active && selectedFeature.feature.trialPeriod > 0 && getExpiryDate(selectedFeature.feature) === 0">
        <button class='comingSoon preodayButton' ng-click='dismissAndShowDialog("trial")'><?echo _("FREE")?> {{selectedFeature.feature.trialPeriod}} <?echo _("DAY TRIAL")?></button>
      </div>            
      <div ng-if="selectedFeature.feature.getInTouch">
        <button class='comingSoon preodayButton' ng-click='clickGetInTouch()'><?echo _("GET IN TOUCH")?></button>
      </div> 
      <div ng-if="selectedFeature.feature.trialPeriod > 0 && getFeatureStatus(selectedFeature.feature) == 'TRIAL'">
        <button class='comingSoon preodayButton secondary' disabled> <?echo _("TRIAL EXPIRES IN")?> {{ getExpiryDate(selectedFeature.feature) }} <?echo _("DAYS")?> </button>
      </div>       
                  
                
                
      <div class='clearfix'></div>
    </div>
    <div class='content'>
      <div class='topContent' ng-if="selectedFeature.feature.promoImgs && selectedFeature.feature.promoImgs.length">
        <img ng-show="currentScreenshot<selectedFeature.feature.promoImgs.length-1"  class='chevron chevronRight' ng-click="showNextScreenshot()" src='/img/chevron-right.png'/>
        <img ng-show="currentScreenshot>0"  class='chevron chevronLeft' ng-click="showPreviousScreenshot()" src='/img/chevron-left.png'/>
        <img ng-src='{{getScreenshot()}}' class='screenshot'/>
      </div>
        <h6><?echo _("Features")?></h6>
        <ul>
          <li ng-repeat='descriptionFeature in selectedFeature.feature.descriptionFeatures'> {{descriptionFeature}}</li>
        </ul>
        <h6><?echo _("Description")?></h6>
        <div class='description'>{{selectedFeature.feature.description}}</div>
    </div>
    <a class="close-reveal-modal">&#215;</a>

  </div>
  
</div>
  
  <div class="loading" ng-show="requests">
    <div class="background-loading"></div>
    <div class="loading-content">
      <div class="spinner">
        <div class="b1 se"></div>
        <div class="b2 se"></div>
        <div class="b3 se"></div>
        <div class="b4 se"></div>
        <div class="b5 se"></div>
        <div class="b6 se"></div>
        <div class="b7 se"></div>
        <div class="b8 se"></div>
        <div class="b9 se"></div>
        <div class="b10 se"></div>
        <div class="b11 se"></div>
        <div class="b12 se"></div>
      </div>
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
  <script type="text/javascript" src="/code/notification/notification.js"></script>
  <script type="text/javascript" src="/code/loader/ajaxInterceptor.js"></script>
<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


