angular.module('accountSettings.resources').
  factory('StripeCharge', function($resource) {
    
    var StripeCharge = $resource('/api/accountPayment/charge/:accountId/:invoiceId',{accountId:"@accountId",invoiceId:"@invoiceId"},{});

		return StripeCharge;

  });    