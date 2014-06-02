
angular.module('accountSettings.resources').
  factory('AccountCard', function($resource) {
    
    var AccountCard = $resource('/api/accounts/:accountId/accountcard',{accountId:"@accountId"},{
    	put: {
    		method: "PUT"
    	}
    });

	return AccountCard
  });    