
angular.module('accountSettings.resources').
  factory('Account', function($resource) {
    
    var Account = $resource('/api/accounts/:id',{id:"@id"}, {
    	put:{
          method: "PUT"
        }    	
    });

	return Account
  });