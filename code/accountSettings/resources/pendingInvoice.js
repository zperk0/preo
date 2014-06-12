angular.module('accountSettings.resources').
  factory('PendingInvoice', function($resource) {
    
    var PendingInvoice = $resource('/api/accounts/:accountId/invoices/pending',{accountId:"@accountId"},{});    

		return PendingInvoice;

  });    