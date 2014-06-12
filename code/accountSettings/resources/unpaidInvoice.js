angular.module('accountSettings.resources').
  factory('UnpaidInvoice', function($resource) {
    
    var UnpaidInvoice = $resource('/api/accounts/:accountId/invoices/unpaid',{accountId:"@accountId"},{});    

		return UnpaidInvoice;

  });    