
<div class="content-purchase">
  <div class="row">
    <p ng-repeat="item in invoiceItems">
      <span class="pull-left title">{{item.description}}</span>
      <span class="pull-right price">£{{ item.price.toFixed(2) }}</span>
    </p>    
  </div>
  <div class="row">
    <p>
      <span class="pull-left title"><? echo _("Subtotal")?></span>
      <span class="pull-right price">£{{ total.toFixed(2) }}</span>
    </p>
    <p>
      <span class="pull-left title"><? echo _("VAT @ 20%")?></span>
      <span class="pull-right price">£{{ vat.toFixed(2) }}</span>
    </p>
  </div>
  <div class="row">
    <p>
      <strong class="pull-left title"><? echo _("TOTAL")?></strong>
      <strong class="pull-right price">£{{ (vat + total).toFixed(2) }}</strong>
    </p>
  </div>
</div>
