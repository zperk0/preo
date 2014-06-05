angular.module('accountSettings.resources').
  factory('Invoice', function($resource) {
    
    var Invoice = $resource('/api/accountPayment/:accountId',{accountId:"@accountId"},{
    		put:{
    			method:"PUT"
    		}
    });    

		return Invoice;

  });    