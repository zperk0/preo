
<div class="content-purchase">
  <div class="row">
    <p ng-if="upfrontPrice">
      <span class="pull-left title"><? echo _("One-off payment") ?></span>
      <span class="pull-right price">£{{ upfrontPrice.toFixed(2) }}</span>
    </p>
    <p ng-if="subscriptionPrice">
      <span class="pull-left title"><? echo _("Monthly charge") ?></span>
      <span class="pull-right price">£{{ subscriptionPrice.toFixed(2) }}</span>
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
  </div>
  <div class="row">
    <p>
      <strong class="pull-left title"><? echo _("TOTAL")?></strong>
      <strong class="pull-right price">£{{ total.toFixed(2) }}</strong>
    </p>
  </div>
</div>
