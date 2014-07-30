  <form name="deliveryForm" id="deliveryForm" ng-submit="processForm()" novalidate>
    <div class='row deliveryHeader'> <h1 class="alignHeader"><?echo _("Delivery Settings")?></h1>
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
  <div class='row delivery-tab-holder'>
  <div class='delivery-tab-content'>
      <div class='controlWrapper largeMarginBottom' ng-class="{'error': deliveryForm.deliveryZone.$invalid && triedSubmit }">
        <label class='colorLabel' for='deliveryZone'> <?echo _("Delivery Areas")?> </label>      
        <input type='text' id='deliveryZone' name='deliveryZone' ng-model="venueSettings.deliveryZone" ng-maxlength=200 placeholder='<? echo _('eg. "NW1, NW2..."')?>' ng-disabled="venue.deliverFlag==0"/>      
        <small  ng-show="deliveryForm.deliveryZone.$invalid && triedSubmit" class="error"><?echo _("Please type a delivery zone (max 200chars)");?></small>
      </div>
      <div class='controlWrapper largeMarginBottom' ng-class="{'error': deliveryForm.telephone.$invalid && triedSubmit }">
        <label class='colorLabel' for='telephone'> <?echo _("In case of customer queries contact:")?> </label>
        <input type='text' id='telephone' name='telephone' ng-model="venueSettings.deliveryPhone" placeholder='+44 (0) 12345678' ng-disabled="venue.deliverFlag==0" ng-required="true"/>
        <small  ng-show="deliveryForm.telephone.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid telephone number");?></small>  
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.minValueOrder.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='minValueOrder'> <?echo _("Minimum order value to qualify for delivery")?></label>
        <input class='inlineInput' placeholder="0.00" type='text' id='minValueOrder' name='minValueOrder' ng-model="venueSettings.deliveryOrderMin" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0" currency>      
        <small  ng-show="deliveryForm.minValueOrder.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 20.52)");?></small>  
      </div>      
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryCharge.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryCharge'> <?echo _("Delivery charge")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryCharge' name='deliveryCharge' ng-model="venueSettings.deliveryCharge" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0" currency/>
        <small  ng-show="deliveryForm.deliveryCharge.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryBelow.$invalid && triedSubmit }">
        <label class='colorLabel inlineLabel' for='deliveryChargeBelow'> <?echo _("Free delivery for orders above")?></label>
        <input class='inlineInput'  placeholder="0.00" type='text' id='deliveryChargeBelow' name='deliveryChargeBelow' ng-model="venueSettings.deliveryChargeBelow" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/" ng-disabled="venue.deliverFlag==0" currency/>
        <small  ng-show="deliveryForm.deliveryChargeBelow.$invalid && triedSubmit" class="error"><?echo _("Please enter a valid number (e.g. 3.25)");?></small>
      </div>
      <div class='controlWrapper inlineControl' ng-class="{'error': deliveryForm.deliveryLeadTime.$invalid && triedSubmit }">      
      <label class='colorLabel inlineLabel' for='deliveryLeadTime'> <?echo _("Default delivery time (minutes)")?> </label>
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
  
  </div>
  </div>
  <div class='row deliverySubmitHolder'>
      <button ng-show="!isPosting" id="deliverySave" ng-class="{'grayedOut':venue.deliverFlag==0}"   type="submit" ><?echo _("SAVE CHANGES");?></button>
      <button ng-show="isPosting" class="secondary" type="button"><?echo _("SAVING...");?></button>
    </div>        
  </form>