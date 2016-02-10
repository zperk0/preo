<h3 translate>Payment</h3>
<div class='paymentWrapper' ng-cloak>
	<form novalidate name='paymentForm'>
	<div class='rowWrapper' ng-class="{'error': paymentForm.card.$invalid && triedSubmit }">
		<label translate>Card Number</label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>**** **** **** {{ card.number }}</span>
		<input type='text' ng-show='isEditing' name='card' ng-model='card.number' placeholder='{{"Credit Card Number" | translate}}' required/>
		</div>
	</div>
	<div class='rowWrapper' ng-class="{'error': paymentForm.name.$invalid && triedSubmit }">
		<label translate>Name on card</label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.name }}</span>
		<input type='text' ng-show='isEditing' name='name' ng-model='card.name' placeholder='{{"Credit Card Name" | translate}}' required/>
		</div>
	</div>
	<div class='rowWrapper' ng-show='isEditing' ng-class="{'error': paymentForm.ccv.$invalid && triedSubmit }">
		<label translate>CCV</label>
		<div class='inputWrapper'>
		<input class='quarter' type='text' name='ccv' ng-model='card.ccv' placeholder='{{"CCV" | translate}}' required/>
		</div>
	</div>
	<div class='rowWrapper' ng-class="{'error': (paymentForm.mm.$invalid || paymentForm.yy.$invalid  ) && triedSubmit }">
		<label translate>Expires</label>
		<div class='inputWrapper'>
		<span ng-show='!isEditing'>{{ card.expmonth }}/{{ card.expyear }}</span>
		<input type='text' ng-show='isEditing' name='mm' ng-model='card.expmonth' placeholder='{{"MM" | translate}}' class='inlineWrapper' required/>
		<input type='text' ng-show='isEditing' name='yy' ng-model='card.expyear' placeholder='{{"YY" | translate}}' class='inlineWrapper' required/>
		</div>
	</div>
	<div class='rowWrapper'>
		<label translate>Billing Address</label>
		<div class='inputWrapper billingAddress'>
		<span ng-show='!isEditing'>{{ card.address1}}<span ng-show='card.address1 && card.address1 != ""'>,<br/></span></span>
		<input type='text' ng-class="{'error': (paymentForm.address1.$invalid)}"   ng-show='isEditing' name='address1' ng-model='card.address1' placeholder='{{"Address Line 1" | translate}}' required/>
		<span ng-show='!isEditing' class=''>{{ card.address2}}<span ng-show='card.address2 && card.address2 != ""'>,<br/></span></span>
		<input type='text' ng-show='isEditing' ng-model='card.address2' placeholder='{{"Address Line 2" | translate}}' />
		<span ng-show='!isEditing'>{{ card.address3}}<span ng-show='card.address3 && card.address3 != "" '>,<br/></span></span>
		<input type='text' ng-show='isEditing' ng-model='card.address3' placeholder='{{"Address Line 3" | translate}}' />
		<span ng-show='!isEditing'>{{ card.city}}<span ng-show='card.city && card.city != "" '>,<br/></span></span>
		<input type='text' ng-class="{'error': (paymentForm.city.$invalid)}" ng-show='isEditing' name='city' ng-model='card.city' placeholder='{{"Town/City" | translate}}' required/>
		<span ng-show='!isEditing' >{{ card.postcode}}<span ng-show='card.postcode && card.postcode != "" '><br/></span></span>
		<input type='text' class='half' name='postcode' ng-class="{'error': (paymentForm.postcode.$invalid)}" ng-show='isEditing' ng-model='card.postcode' placeholder='{{"Postcode" | translate}}' required/>
		</div>
	</div>
	<div class='rowWrapper errorMessage'>{{ errorMessage }}</div>
	<button ng-show="!isEditing" class='preodayButton' ng-click="startEditing()" type="button" translate>CHANGE DETAILS</button>
	<button ng-show="!isPosting && isEditing" class='preodayButton' ng-click="saveChanges()" type="submit" translate>SAVE</button>
	<button ng-show="isPosting && isEditing" class="secondary" type="button" translate>SAVING...</button>
	<button ng-show="isEditing" class='preodayButton secondary' ng-click="cancelSaving()" translate>CANCEL</button>
	</form>
</div>