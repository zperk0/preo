<h3><?echo _("Payment")?></h3>
<div class='paymentWrapper' ng-cloak>
	<form novalidate name='paymentForm'>
	<div class='rowWrapper' ng-class="{'error': paymentForm.card.$invalid && triedSubmit }">
		<label><? echo _("Card Number")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>**** **** **** {{ card.number }}</span> 
		<input type='text' ng-show='isEditing' name='card' ng-model='card.number' placeholder='<?echo _("Credit Card Number")?>' required/>
		</div>		
	</div>
	<div class='rowWrapper' ng-class="{'error': paymentForm.name.$invalid && triedSubmit }">
		<label><? echo _("Name on card")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.name }}</span> 
		<input type='text' ng-show='isEditing' name='name' ng-model='card.name' placeholder='<?echo _("Credit Card Name")?>' required/>
		</div>		
	</div>
	<div class='rowWrapper' ng-show='isEditing' ng-class="{'error': paymentForm.ccv.$invalid && triedSubmit }">
		<label><? echo _("CCV")?></label>
		<div class='inputWrapper'>
		<input class='quarter' type='text' name='ccv' ng-model='card.ccv' placeholder='<?echo _("CCV")?>' required/>
		</div>		
	</div>
	<div class='rowWrapper' ng-class="{'error': (paymentForm.mm.$invalid || paymentForm.yy.$invalid  ) && triedSubmit }">
		<label><? echo _("Expires")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.expmonth }}/{{ card.expyear }}</span> 
		<input type='text' ng-show='isEditing' name='mm' ng-model='card.expmonth' placeholder='<?echo _("MM")?>' class='inlineWrapper' required/>		
		<input type='text' ng-show='isEditing' name='yy' ng-model='card.expyear' placeholder='<?echo _("YY")?>' class='inlineWrapper' required/>
		</div>		
	</div>
	<div class='rowWrapper' ng-class="{'error': (paymentForm.address1.$invalid || paymentForm.city.$invalid || paymentForm.postcode.$invalid  ) && triedSubmit }">
		<label><? echo _("Billing Address")?></label>
		<div class='inputWrapper billingAddress'>
		<span ng-show='!isEditing'>{{ card.address1}}<span ng-show='card.address1 && card.address1 != ""'>,<br/></span></span> 
		<input type='text' ng-show='isEditing' name='address1' ng-model='card.address1' placeholder='<?echo _("Address Line 1")?>' required/>
		<span ng-show='!isEditing'>{{ card.address2}}<span ng-show='card.address2 && card.address2 != ""'>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.address2' placeholder='<?echo _("Address Line 2")?>' />
		<span ng-show='!isEditing'>{{ card.address3}}<span ng-show='card.address3 && card.address3 != "" '>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.address3' placeholder='<?echo _("Address Line 3")?>' />
		<span ng-show='!isEditing'>{{ card.city}}<span ng-show='card.city && card.city != "" '>,<br/></span></span> 
		<input type='text' ng-show='isEditing' name='city' ng-model='card.city' placeholder='<?echo _("Town/City")?>' required/>
		<span ng-show='!isEditing' >{{ card.postcode}}<span ng-show='card.postcode && card.postcode != "" '><br/></span></span> 
		<input type='text' class='half' name='postcode' ng-show='isEditing' ng-model='card.postcode' placeholder='<?echo _("Postcode")?>' required/>
		</div>		
	</div>	
	<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
	<button ng-show="!isEditing" class='preodayButton' ng-click="startEditing()" type="button" ><?echo _("CHANGE DETAILS");?></button>
	<button ng-show="!isPosting && isEditing" class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE");?></button>	
	<button ng-show="isPosting && isEditing" class="secondary" type="button"><?echo _("SAVING...");?></button>
	<button ng-show="isEditing" class='preodayButton secondary' ng-click="cancelSaving()" ><?echo _("CANCEL");?></button>
	</form>
</div>