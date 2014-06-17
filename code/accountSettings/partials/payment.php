<h3><?echo _("Payment")?></h3>
<div class='paymentWrapper' ng-cloak>
	
	<div class='rowWrapper'>
		<label><? echo _("Card Number")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>**** **** **** {{ card.number }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.number' placeholder='<?echo _("Credit Card Number")?>'/>
		</div>		
	</div>
	<div class='rowWrapper' ng-show='isEditing'>
		<label><? echo _("CCV")?></label>
		<div class='inputWrapper'>
		<input class='quarter' type='text' ng-model='card.ccv' placeholder='<?echo _("CCV")?>'/>
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("Expires")?></label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.expmonth }}/{{ card.expyear }}</span> 
		<input type='text' ng-show='isEditing' ng-model='card.expmonth' placeholder='<?echo _("MM")?>' class='inlineWrapper'/>		
		<input type='text' ng-show='isEditing' ng-model='card.expyear' placeholder='<?echo _("YY")?>' class='inlineWrapper'/>
		</div>		
	</div>
	<div class='rowWrapper'>
		<label><? echo _("Billing Address")?></label>
		<div class='inputWrapper billingAddress'>
		<span ng-show='!isEditing'>{{ card.address1}}<span ng-show='card.address1 && card.address1 != ""'>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.address1' placeholder='<?echo _("Address Line 1")?>' />
		<span ng-show='!isEditing'>{{ card.address2}}<span ng-show='card.address2 && card.address2 != ""'>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.address2' placeholder='<?echo _("Address Line 2")?>' />
		<span ng-show='!isEditing'>{{ card.address3}}<span ng-show='card.address3 && card.address3 != "" '>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.address3' placeholder='<?echo _("Address Line 3")?>' />
		<span ng-show='!isEditing'>{{ card.city}}<span ng-show='card.city && card.city != "" '>,<br/></span></span> 
		<input type='text' ng-show='isEditing' ng-model='card.city' placeholder='<?echo _("Town/City")?>' />
		<span ng-show='!isEditing' >{{ card.postcode}}<span ng-show='card.postcode && card.postcode != "" '><br/></span></span> 
		<input type='text' class='half' ng-show='isEditing' ng-model='card.postcode' placeholder='<?echo _("Postcode")?>' />
		</div>		
	</div>	
	<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
	<button ng-show="!isEditing" class='preodayButton' ng-click="startEditing()" type="button" ><?echo _("CHANGE DETAILS");?></button>
	<button ng-show="!isPosting && isEditing" class='preodayButton' ng-click="saveChanges()" type="submit" ><?echo _("SAVE CHANGES");?></button>
	<button ng-show="isPosting && isEditing" class="secondary" type="button"><?echo _("SAVING...");?></button>

</div>