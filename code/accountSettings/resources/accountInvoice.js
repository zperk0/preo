angular.module('accountSettings.resources').
  factory('AccountInvoice', function($resource) {
    
    var Invoice = $resource('/api/accounts/:accountId/invoices/:invoiceId',{accountId:"@accountId",invoiceId:"@invoiceId"},{});    

		return Invoice;

  });    