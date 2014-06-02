<h3><?echo _("Payment")?></h3>
<div class='paymentWrapper' ng-cloak>
	
	<div class='rowWrapper'>
		<label><? echo _("Card Number")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>**** **** **** {{ card.number }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.number' placeholder='<?echo _("Credit Card Number")?>'/>
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("CCV")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.ccv }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.ccv' placeholder='<?echo _("Card Security Code")?>'/>
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("Expiry Date")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.expmonth }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.expmonth' placeholder='<?echo _("MM")?>' />
		<span ng-show='!isEditing'>{{ card.expyear }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.expyear' placeholder='<?echo _("YY")?>' />
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("Billing Address")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.address1 }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.address1' placeholder='<?echo _("Address Line 1")?>' />
		<span ng-show='!isEditing'>{{ card.address2 }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.address2' placeholder='<?echo _("Address Line 2")?>' />
		<span ng-show='!isEditing'>{{ card.address3 }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.address3' placeholder='<?echo _("Address Line 3")?>' />
		<span ng-show='!isEditing'>{{ card.city }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.city' placeholder='<?echo _("Address Line 3")?>' />
		<span ng-show='!isEditing'>{{ card.postcode }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.postcode' placeholder='<?echo _("Address Line 3")?>' />
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("Cardholder Name")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.name }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.name' placeholder='<?echo _("Cardholder Name")?>'/>
		</div>		
	</div>
	<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
	<button ng-show="!isEditing" class='preodayButton' ng-click="startEditing()" type="button" ><?echo _("CHANGE DETAILS");?></button>
	<button ng-show="!isPosting && isEditing" class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE CHANGES");?></button>
	<button ng-show="isPosting && isEditing" class="secondary" type="button"><?echo _("SAVING...");?></button>

</div>