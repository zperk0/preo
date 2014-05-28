<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 

  <div class="row">
    <div class="topSpacer"></div>
  </div>

  <div  ng-app="delivery" ng-controller="deliveryController" ng-cloak>
    <div class='loader' ng-show="!finishedLoading">      
      <img src='/img/spinner.gif'/>
    </div>
    <form name="deliveryForm" id="deliveryForm" ng-submit="processForm()" novalidate ng-show="finishedLoading">  
    <div class='row deliveryHeader'> <h1 class="alignHeader"><?echo _("Delivery Details")?></h1>
    <div class='deliverySwitch'> <a href='#'><?echo _("Enable delivery services")?></a>
        <div class="switch small" ng-class="{'off': venue.deliverFlag==0}" > 
          <input ng-change="onChangeDeliverFlag()"  value="0" type="radio" ng-model="venue.deliverFlag" tabindex=-1>
            <label class="no"><?echo _("No")?></label>
          <input ng-change="onChangeDeliverFlag()" value="1" type="radio" ng-model="venue.deliverFlag" tabindex=-1>
            <label class="yes"><?echo _("Yes")?></label>
            <span></span>
          </div>          

    </div>
    </div>
  <div class='deliveryWrapper' ng-class="{'opaque':venue.deliverFlag==0}">
    <ul class='row delivery-tabs'>
      <li ng-class="{'selected': selected==1}" ><a href ng:click="selected=1"><?echo _("General Settings")?></a></li>
      <li ng-class="{'selected': selected==2}" ><a href ng:click="selected=2"><?echo _("Order Status Alerts")?></a></li>
      <li ng-class="{'selected': selected==3}" ><a href ng:click="selected=3"><?echo _("Order Rejection Alerts")?></a></li>
    </ul>
  <div class='row delivery-tab-holder'>
  <div ng:show="selected == 1" class='delivery-tab-content'>
      <div class='controlWrapper largeMarginBottom' ng-class="{'error': deliveryForm.deliveryZone.$invalid && triedSubmit }">
        <label class='colorLabel' for='deliveryZone'> <?echo _("Delivery Zone")?> </label>      
        <input type='text' id='deliveryZone' name='deliveryZone' ng-model="venueSettings.deliveryZone" ng-maxlength=200 placeholder='<? echo _('eg. "5 miles" or "NW1, NW2..."')?>' ng-disabled="venue.deliverFlag==0"/>      
        <small  ng-show="deliveryForm.deliveryZone.$invalid && triedSubmit" class="error"><?echo _("Please type a delivery zone (max 200chars)");?></small>
      </div>
      <div class='controlWrapper largeMarginBottom'>
        <label class='colorLabel' for='telephone'> <?echo _("In case of customer queries contact:")?> </label>
        <input type='text' id='telephone' name='telephone' ng-model="venueSettings.deliveryPhone" placeholder='+44 (0) 12345678' ng-disabled="venue.deliverFlag==0"/>        
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.minValueOrder.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='minValueOrder'> <?echo _("Minimum order value to qualify for delivery")?></label>
        <input class='inlineInput' placeholder="0.00" type='text' id='minValueOrder' name='minValueOrder' ng-model="venueSettings.deliveryOrderMin" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0">      
        <small  ng-show="deliveryForm.minValueOrder.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 20.52)");?></small>  
      </div>      
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryCharge.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryCharge'> <?echo _("Delivery charge ")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryCharge' name='deliveryCharge' ng-model="venueSettings.deliveryCharge" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0"/>
        <small  ng-show="deliveryForm.deliveryCharge.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryBelow.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryChargeBelow'> <?echo _("Free delivery for orders above ")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryChargeBelow' name='deliveryChargeBelow' ng-model="venueSettings.deliveryChargeBelow" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0"/>
        <small  ng-show="deliveryForm.deliveryChargeBelow.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryLeadTime.$invalid && triedSubmit }">      
      <label class='colorLabel inlineLabel' for='deliveryLeadTime'> <?echo _("Default lead time for delivery (minutes) ")?> <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("The time it takes to prepare your order.");?>"></i></label>
      <input class='inlineInput'  placeholder="20" type='text' id='deliveryLeadTime' name='deliveryLeadTime' ng-model="venueSettings.deliveryLeadTime" ng-pattern="/^[0-9]+$/" ng-disabled="venue.deliverFlag==0"/>
      <small  ng-show="deliveryForm.deliveryLeadTime.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid time interval in minutes (e.g. 20)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryDiscount.$invalid && triedSubmit && !isPosting }">      
      <label class='colorLabel inlineLabel' for='deliveryDiscount'> <?echo _("Discount offered for delivery orders (%)")?></label>
      <input class='inlineInput'  placeholder="5" type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="venueSettings.deliveryDiscount" ng-pattern="/(^0\.[0-9]{1,2})|^[0-1]$/" ng-disabled="venue.deliverFlag==0" percent/>
      <small  ng-show="deliveryForm.deliveryDiscount.$invalid && triedSubmit && !isPosting" class="error"><?echo _("Please provide a discount percentage (between 0 and 100)");?></small>
      </div>
      <div class='clearfix'></div>
  </div>

  <div ng:show="selected == 2" class='delivery-tab-content'>
      <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'><?echo _("Preset customer notifications, sent by email and push alert")?></div>
          <div class='messageCol-2'><?echo _("Short name")?></div>
          <div class='messageCol-3'><?echo _("Active?")?></div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.notify" >      
          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("notify",$index).content}}"' ng-required='validateMessage(message)' ng-disabled="venue.deliverFlag==0"/>
            <small class="error" ng-show="validateMessage(message)" ><?echo _("Please enter both the notification and a short name.");?></small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name" placeholder='eg."{{getPlaceholder("notify",$index).name}}"' ng-required='validateMessage(message)' ng-disabled="venue.deliverFlag==0"/>
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" > 
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message) || venue.deliverFlag==0" tabindex=-1>
            <label class="no"><?echo _("No")?></label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message) || venue.deliverFlag==0" tabindex=-1>
            <label class="yes"><?echo _("Yes")?></label>
            <span></span>
          </div>                
      </div>
  </div>

  <div ng:show="selected == 3" class='delivery-tab-content'>
     <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'><?echo _("Preset order rejection notifications, sent by email and push alert")?></div>
          <div class='messageCol-2'><?echo _("Short name")?></div>
          <div class='messageCol-3'><?echo _("Active?")?></div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.reject" >      

          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("reject",$index).content}}"' ng-required='validateMessage(message)' ng-disabled="venue.deliverFlag==0"/>
            <small class="error" ng-show="validateMessage(message)" ><?echo _("Please enter a message and a short name or remove this notification.");?></small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name"    placeholder='eg."{{getPlaceholder("reject",$index).name}}"' ng-required='validateMessage(message)'ng-disabled="venue.deliverFlag==0"/>
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" > 
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message) || venue.deliverFlag==0" tabindex=-1>
            <label class="no"><?echo _("No")?></label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message) || venue.deliverFlag==0" tabindex=-1>
            <label class="yes"><?echo _("Yes")?></label>
            <span></span>
          </div>          
        </div>
  </div>    
  </div>
  </div>
  <div class='row deliverySubmitHolder'>
      <button ng-show="!isPosting" id="deliverySave" ng-class="{'grayedOut':venue.deliverFlag==0}"   type="submit" ><?echo _("SAVE CHANGES");?></button>
      <button ng-show="isPosting" class="secondary" type="button"><?echo _("SAVING...");?></button>
    </div>        
  </form>
</div>


  <script src="/js/angular_all.min.js"></script>


  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/resource.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/controllers.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/directive.js"></script>
  <script> 
    angular.module('delivery').constant('VENUE_ID', <? echo json_encode($_SESSION['venue_id']) ?>)
  </script>


<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


