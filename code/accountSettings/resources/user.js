
angular.module('accountSettings.resources').
  factory('User', function($resource) {
    
    var User = $resource('/api/users/:id',{id:"@id"}, {
    	put:{
          method: "PUT"
        }
    });

	return User
  });