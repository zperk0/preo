angular.module('accountSettings.resources').
  factory('AccountPayment', function($resource) {
    
    var AccountPayment = $resource('/api/accountPayment/:accountId',{accountId:"@accountId"},{
    		put:{
    			method:"PUT"
    		}
    });    

		return AccountPayment;

  });    