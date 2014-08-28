
<div class="content-purchase">
  <div class="row">
    <p ng-if="upfrontPrice">
      <span class="pull-left title"><? echo _("One-off payment") ?></span>
      <span class="pull-right price">£{{ upfrontPrice.toFixed(2) }}</span>      
    </p>
    <p ng-if="subscriptionPrice">
      <span class="pull-left title"><? echo _("Monthly charge") ?><span ng-if="contractMonths">*</span> </span>
      <span class="pull-right price">£{{ subscriptionPrice.toFixed(2) }}</span>      
      <small ng-if="contractMonths" class='clearfix pull-right'><i ><? echo _("*minimum ")?> {{contractMonths}}<? echo _(" months contract")?></i></small>
    </p>
  </div>
  <div class="row">
    <p>
      <span class="pull-left title"><? echo _("Subtotal")?></span>
      <span class="pull-right price">£{{ subtotal.toFixed(2) }}</span>
    </p>
    <p>
      <span class="pull-left title"><? echo _("VAT @ 20%")?></span>
      <span class="pull-right price">£{{ vat.toFixed(2) }}</span>
    </p>
    <p ng-if="discount"><i>
      <span class="pull-left title"><? echo _("Discount")?></span>
      <span class="pull-right price">£{{ discount.toFixed(2) }}</span>
    </i></p>    
    <p>
      <strong class="pull-left title"><? echo _("TOTAL")?></strong>
      <strong class="pull-right price">£{{ total.toFixed(2) }}</strong>
    </p>
  </div>
  <div class="discountRow">
    <p><? echo _("Have a discount code?")?></p>
    <input type='text' ngModel='discountCode' name='discountCode'/>
    <button type='button' class='preodayButton' ng-click="validateDiscountCode()"><? echo _("APPLY") ?></button>
  </div>
</div>
