angular.module('accountSettings.resources').
  factory('StripeCharge', function($resource) {
    
    var StripeCharge = $resource('/api/invoices/:invoiceId/pay',{invoiceId:"@invoiceId"});

		return StripeCharge;

  });    