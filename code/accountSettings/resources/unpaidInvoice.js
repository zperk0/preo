angular.module('accountSettings.resources').
  factory('UnpaidInvoice', function($resource) {
    
    var UnpaidInvoice = $resource('/api/accountPayment/:accountId/unpaidInvoice/',{accountId:"@accountId"},{});    

		return UnpaidInvoice;

  });    