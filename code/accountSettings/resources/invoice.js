angular.module('accountSettings.resources').
  factory('Invoice', function($resource) {
    
    var Invoice = $resource('/api/invoices/:invoiceId',{invoiceId:"@invoiceId"},{
    		put:{
    			method:"PUT"
    		},
    		pdf:{
    			method:"GET",
    			url: '/api/invoices/:invoiceId/pdf'
    		}
    });    

		return Invoice;

  });    