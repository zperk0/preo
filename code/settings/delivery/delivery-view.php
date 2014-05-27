<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/authentication.php');  
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 
<!DOCTYPE html>
<html>
<head>
  <title>Delivery Settings</title>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular/angular.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-route/angular-route.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/angular-resource/angular-resource.js"></script>
  <script src="<?echo $_SESSION['path']?>/bower_components/jquery/dist/jquery.min.js"></script>
  <script> 
  //FIXME not sure if this is a problem. How to expose only on controller scope?
  //expose sesion to get the values we need
  var phpSession = JSON.parse('<? echo json_encode($_SESSION) ?>') ;
  console.log("session",phpSession);    
  </script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/resource.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/controllers.js"></script>


</head>
<body ng-app="delivery" ng-controller="deliveryController">
  <form name="deliveryForm" id="deliveryForm" ng-submit="processForm()" novalidate>  
  <div class='row'> <h1>Delivery Details</h1></div>
  <div>
    <ul class='row delivery-tabs'>
      <li ng-class="{'selected': selected==1}" ><a href ng:click="selected=1"><?echo _("General Settings")?></a></li>
      <li ng-class="{'selected': selected==2}"><a href ng:click="selected=2"><?echo _("Order Status Alerts")?></a></li>
      <li ng-class="{'selected': selected==3}"><a href ng:click="selected=3"><?echo _("Order Rejection Alerts")?></a></li>
    </ul>
  <div class='row delivery-tab-holder'>
  <div ng:show="selected == 1" class='delivery-tab-content'>
      <div class='controlWrapper largeMarginBottom' ng-class="{'error': deliveryForm.deliveryZone.$invalid && triedSubmit }">
        <label class='colorLabel' for='deliveryZone'> <?echo _("Delivery Zone")?> </label>      
        <input type='text' id='deliveryZone' name='deliveryZone' ng-model="venueSettings.deliveryZone" ng-maxlength=200 placeholder='<? echo _('eg. "5 miles" or "NW1, NW2..."')?>'/>      
        <small  ng-show="deliveryForm.deliveryZone.$invalid && triedSubmit" class="error"><?echo _("Please type a delivery zone (max 200chars)");?></small>
      </div>
      <div class='controlWrapper largeMarginBottom'>
        <label class='colorLabel' for='telephone'> <?echo _("In case of customer queries contact:")?> </label>
        <input type='text' id='telephone' name='telephone' ng-model="venueSettings.deliveryPhone" placeholder='+44 (0) 12345678' />        
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.minValueOrder.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='minValueOrder'> <?echo _("Min. value order (£)")?></label>
        <input class='inlineInput' placeholder="0.00" type='text' id='minValueOrder' name='minValueOrder' ng-model="venueSettings.deliveryOrderMin" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/">      
        <small  ng-show="deliveryForm.minValueOrder.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 20.52)");?></small>  
      </div>      
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryCharge.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryCharge'> <?echo _("Delivery charge (£)")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryCharge' name='deliveryCharge' ng-model="venueSettings.deliveryCharge" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/"/>
        <small  ng-show="deliveryForm.deliveryCharge.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryBelow.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryChargeBelow'> <?echo _("Free delivery for orders above (£)")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryChargeBelow' name='deliveryChargeBelow' ng-model="venueSettings.deliveryChargeBelow" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/"/>
        <small  ng-show="deliveryForm.deliveryChargeBelow.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryLeadTime.$invalid && triedSubmit }">      
      <label class='colorLabel inlineLabel' for='deliveryLeadTime'> <?echo _("Default lead time for delivery (mins)")?></label>
      <input class='inlineInput'  placeholder="20" type='text' id='deliveryLeadTime' name='deliveryLeadTime' ng-model="venueSettings.deliveryLeadTime" ng-pattern="/^[0-9]+$/"/>
      <small  ng-show="deliveryForm.deliveryLeadTime.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid time interval in minutes (e.g. 20)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryDiscount.$invalid && triedSubmit }">      
      <label class='colorLabel inlineLabel' for='deliveryDiscount'> <?echo _("Discount offered for delivery orders")?></label>
      <input class='inlineInput'  placeholder="5" type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="venueSettings.deliveryDiscount" ng-pattern="/^(0?[0-9]?[0-9]|100)$/"/>
      <small  ng-show="deliveryForm.deliveryDiscount.$invalid && triedSubmit" class="error"><?echo _("Please provide a discount percentage (between 0 and 100)");?></small>
      </div>
      <div class='clearfix'></div>
  </div>

  <div ng:show="selected == 2" class='delivery-tab-content'>
      <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'>Preset customer notifications, sent by email and push alert</div>
          <div class='messageCol-2'>Short name</div>
          <div class='messageCol-3'>Active?</div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.notify" >      
          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("notify",$index).content}}"' ng-required='validateMessage(message)'/>
            <small class="error" ng-show="validateMessage(message)" ><?echo _("Please enter both the notification and a short name.");?></small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name" placeholder='eg."{{getPlaceholder("notify",$index).name}}"' ng-required='validateMessage(message)'/>
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" > 
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="no">No</label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="yes">Yes</label>
            <span></span>
          </div>                
      </div>
  </div>

  <div ng:show="selected == 3" class='delivery-tab-content'>
     <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'>Preset order rejection notifications, sent by email and push alert</div>
          <div class='messageCol-2'>Short name</div>
          <div class='messageCol-3'>Active?</div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.reject" >      

          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("reject",$index).content}}"' ng-required='validateMessage(message)'/>
            <small class="error" ng-show="validateMessage(message)" ><?echo _("Please enter a message and a short name or remove this notification.");?></small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name"    placeholder='eg."{{getPlaceholder("reject",$index).name}}"' ng-required='validateMessage(message)'/>
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" > 
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="no">No</label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="yes">Yes</label>
            <span></span>
          </div>          
        </div>
  </div>
    <div>
      <button id="deliverySave" type="submit" ><?echo _("SAVE CHANGES");?></button>
      <button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
    </div>      
  </div>
  </div>  
  </form>
</body>
</html>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


