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
  <style>
  .delivery-tabs{    
    list-style: none;    
  }
  .delivery-tabs li{    
    display:inline-block;
    background:gray;
    padding:10px 0;
    width:33%;
    text-align: center;
    -webkit-border-top-left-radius: 10px;
    -webkit-border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

  }
  .delivery-tabs li a {
    font-size:1.2em;    
    color:white; 
    font-family:"Co Text W01 Light";
  }
  .delivery-tab-content{
    background:white;
    padding:0 30px 20px 30px;
    
  }

  .delivery-tabs li.selected{
      background:white;      
  }
  .delivery-tabs li.selected a{
      color:#2e70b7;
  }
  .delivery-tab-holder {
    background:white;
    width:100%;
    padding:0;
  }  


  .inlineLabel {    
    width:auto;
    display:inline-block;
    line-height:2.3125em;
  }

  .delivery-tab-content input.inlineInput {
    display: block;
    float: left;
    width: 10%;
    margin-right: 10px;
    margin-bottom: 12px;
  }
  
  .clearfix{
    clear:both;
  }

  #telephone{
    width:30%;
    display:block;
  }

  .messageRow .messageCol-1{
    display:block;
    float:left;
    width:50%;
    margin-right:2%;  
  }
  .messageRow .messageCol-2{
    display:block;
    float:left;
    width:30%;
    margin-right:2%;
  }
  .messageRow .messageCol-3{
    display:block;
    float:left;
    width:8%;
    min-width:90px;
    max-width:100px;
  }

  .messageRowHeader{
    margin-top:25px !important;
    display:block;
    margin-bottom:10px !important;
  }

  .switch .no {
  visibility: collapse;
  }
  .switch.off .no {
    visibility: visible;
  }
  
  .switch.disabled label{
    color: #aaa !important; 
  }
  .switch.disabled span {
    opacity:0.6;
  }

  .switch input:disabled:hover{
    cursor:default !important;
  }
  </style>  
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/app.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/resource.js"></script>
  <script type="text/javascript" src="<?echo $_SESSION['path']?>/code/settings/delivery/controllers.js"></script>


</head>
<body ng-app="delivery" ng-controller="deliveryController">
  <form id="delivery-form" ng-submit="processForm()"> 
  <div class='row'> <h1>Delivery Details</h1></div>
  <div>
    <ul class='row delivery-tabs'>
      <li ng-class="{'selected': selected==1}" ><a href ng:click="selected=1">General Settings</a></li>
      <li ng-class="{'selected': selected==2}"><a href ng:click="selected=2">Order Status Alerts</a></li>
      <li ng-class="{'selected': selected==3}"><a href ng:click="selected=3">Order Rejection Alerts</a></li>
    </ul>
  <div class='row delivery-tab-holder'>
  <div ng:show="selected == 1" class='delivery-tab-content columns'>
      <label class='colorLabel' for='deliveryZone'> <?echo _("Delivery Zone")?> </label>      
      <input type='text' id='deliveryZone' name='deliveryZone' ng-model="venueSettings.deliveryZone"/>      
      
      <label class='colorLabel' for='telephone'> <?echo _("In case of customer queries contact:")?> </label>
      <input type='text' id='telephone' name='telephone' ng-model="venueSettings.deliveryPhone" />
      
      <label class='colorLabel inlineLabel' for='minValueOrder'> <?echo _("Min. value order (£)")?></label>
      <input class='inlineInput' type='text' id='minValueOrder' name='minValueOrder' ng-model="venueSettings.deliveryOrderMin"/>      
      <div class='clearfix'></div>
      <label class='colorLabel inlineLabel' for='deliveryCharge'> <?echo _("Delivery charge (£)")?></label>
      <input class='inlineInput' type='text' id='deliveryCharge' name='deliveryCharge' ng-model="venueSettings.deliveryCharge"/>
      <div class='clearfix'></div>
      <label class='colorLabel inlineLabel' for='deliveryChargeBelow'> <?echo _("Free delivery for orders above (£)")?></label>
      <input class='inlineInput' type='text' id='deliveryChargeBelow' name='deliveryChargeBelow' ng-model="venueSettings.deliveryChargeBelow"/>
      <div class='clearfix'></div>
      <label class='colorLabel inlineLabel' for='deliveryLeadTime'> <?echo _("Default lead time for delivery (mins)")?></label>
      <input class='inlineInput' type='text' id='deliveryLeadTime' name='deliveryLeadTime' ng-model="venueSettings.deliveryLeadTime"/>
      <div class='clearfix'></div>
      <label class='colorLabel inlineLabel' for='deliveryDiscount'> <?echo _("Discount offered for delivery orders")?></label>
      <input class='inlineInput' type='text' id='deliveryDiscount' name='deliveryDiscount' ng-model="venueSettings.deliveryDiscount"/>
      <div class='clearfix'></div>
  </div>

  <div ng:show="selected == 2" class='delivery-tab-content columns'>
      <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'>Preset customer notifications, sent by email and push alert</div>
          <div class='messageCol-2'>Short name</div>
          <div class='messageCol-3'>Active?</div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages" >      
       <div ng-if='message.type == "PUSH_NOTIFY"'>      
          <input class='messageCol-1' type='text'  ng-model="message.content" placeholder='eg."{{message.placeholder.content}}"'/>
          <input class='messageCol-2' type='text'  ng-model="message.name"    placeholder='eg."{{message.placeholder.name}}"'/>
          
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':message.content==='' || message.name==='' }" > 
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="message.content==='' || message.name===''">
            <label class="no">No</label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="message.content==='' || message.name===''">
            <label class="yes">Yes</label>
            <span></span>
          </div>
          
        </div>
      </div>
  </div>

  <div ng:show="selected == 3" class='delivery-tab-content columns'>
  <div class="row messageRow messageRowHeader">
          <div class='messageCol-1'>Preset order rejection notifications, sent by email and push alert</div>
          <div class='messageCol-2'>Short name</div>
          <div class='messageCol-3'>Active?</div>
      </div>
       <div class='row messageRow' ng-repeat="message in messages" >                
       <div ng-if='message.type == "PUSH_REJECT"'>      
          <input class='messageCol-1' type='text' ng-model="message.content" placeholder='eg."{{message.placeholder.content}}"'/>
          <input class='messageCol-2' type='text' ng-model="message.name"    placeholder='eg."{{message.placeholder.name}}"'/>          
          <div class="switch messageCol-3" ng-class="{'off': message.active==0}" > 
            <input  value="0" type="radio" ng-model="message.active">
              <label class="no">No</label>
            <input value="1" type="radio" ng-model="message.active">
              <label class="yes">Yes</label>
              <span></span>
            </div>          
          </div>
        </div>
  </div>  
  
  <div class="small-12 large-12 columns">
        <button id="venueSave" type="submit" tabindex=36><?echo _("SAVE CHANGES");?></button>
        <button id="savingButton" class="hide secondary" type="button"><?echo _("SAVING...");?></button>
      </div>      
    </div>
    </div>  
  </form>
</body>
</html>

<? require($_SERVER['DOCUMENT_ROOT'].$_SESSION['path'].'/inc/shared/f.php'); ?> 


