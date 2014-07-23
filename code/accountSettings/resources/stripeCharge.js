angular.module('accountSettings.resources').
  factory('StripeCharge', ['$resource',function($resource) {
    
    var StripeCharge = $resource('/api/invoices/:invoiceId/pay',{invoiceId:"@invoiceId"});

		return StripeCharge;

  }]);    