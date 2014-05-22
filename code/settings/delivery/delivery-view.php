<?  session_start();
  require_once($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/lang.php'); //need this for multi-language support
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/api_vars.php');  //API config file
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/callAPI.php');   //API calling function
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/code/shared/kint/Kint.class.php');   //kint
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/meta.php'); 
  require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/h.php'); 
?> 
<!DOCTYPE html>
<html>
<head>
  <title>F-1 Feeder</title>
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
  <style>
  .delivery-tabs{    
    list-style: none;    
  }
  .delivery-tabs li{    
    display:inline-block;
    background:white;
    padding:20px 10px;
    width:33%;
    text-align: center;
  }
  .delivery-tab-content{
    background:white;
  }


  </style>  
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/resource.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/controllers.js"></script>


</head>
<body ng-app="delivery" ng-controller="deliveryController">
  <form id="delivery-form" ng-submit="processForm()"> 
  <div class='row'> <h1>Delivery Details</h1></div>
  <div class='row'>
  <ul class='row delivery-tabs'>
    <li><a href ng:click="selected=1">General Settings</a></li>
    <li><a href ng:click="selected=2">Order Status Alerts</a></li>
    <li><a href ng:click="selected=3">Order Rejection Alerts</a></li>
  </ul>

  <div ng:show="selected == 1" class='delivery-tab-content'>
      <label for='deliveryZone'> <?echo _("Delivery Zone")?>
        <input type='text' id='deliveryZone' name='deliveryZone' ng-model="venueSettings.deliveryZone"/>
      </label>  
      <label for='telephone'> <?echo _("In case of customer queries contact:")?>
        <input type='text' id='telephone' name='telephone' ng-model="venueSettings.deliveryPhone"/>
      </label>
      <label class='inlineLabel' for='minValueOrder'> <?echo _("Min. value order (£)")?>
        <input type='text' id='minValueOrder' name='minValueOrder' ng-model="venueSettings.deliveryOrderMin"/>
      </label>
      <label class='inlineLabel' for='deliveryCharge'> <?echo _("Delivery charge (£)")?>
        <input type='text' id='deliveryCharge' name='deliveryCharge' ng-model="venueSettings.deliveryCharge"/>
      </label>
      <label class='inlineLabel' for='deliveryChargeBelow'> <?echo _("Free delivery for orders above (£)")?>
        <input type='text' id='deliveryChargeBelow' name='deliveryChargeBelow' ng-model="venueSettings.deliveryChargeBelow"/>
      </label>
      <label class='inlineLabel' for='deliveryLeadTime'> <?echo _("Default lead time for delivery (mins)")?>
        <input type='text' id='deliveryLeadTime' name='deliveryLeadTime' ng-model="venueSettings.deliveryLeadTime"/>
      </label>
      <label class='inlineLabel' for='deliveryDiscount'> <?echo _("Discount offered for delivery orders")?>
        <input type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="venueSettings.deliveryDiscount"/>
      </label>      
  </div>

  <div ng:show="selected == 2">
      <div class='row' ng-repeat="message in venueMessages" >
      <div ng-if='message.type == "PUSH_NOTIFY"'>
        <label class='inlineLabel' for='deliveryDiscount'>
          <input type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="message.content"/>
          <input type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="message.name"/>
          <div class="small-switch columns">
            <div class="switch small large-12 columns notificationActiveFlag float-right"> 
            <input  value="0" type="radio">
              <label class="no">No</label>
            <input value="1" type="radio">
              <label class="yes">Yes</label>
              <span></span>
            </div>
          </div>
        </label>    
        </div>
      </div>
  </div>

  <div ng:show="selected == 3">
       <div class='row' ng-repeat="message in venueMessages" >
       <div ng-if='message.type == "PUSH_REJECT"'>
        <label class='inlineLabel' for='deliveryDiscount'>
          <input type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="message.content"/>
          <input type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="message.name"/>
          <div class="small-switch columns">
            <div class="switch small large-12 columns notificationActiveFlag float-right"> 
            <input  value="0" type="radio">
              <label class="no">No</label>
            <input value="1" type="radio">
              <label class="yes">Yes</label>
              <span></span>
            </div>
          </div>
        </label>    
        </div>
      </div>
  </div>  
  </div>
  <div class="small-12 large-12 columns">
        <button id="venueSave" type="submit" tabindex=36><?echo _("SAVE CHANGES");?></button>
        <button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
      </div>      
  </form>
</body>
</html>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


