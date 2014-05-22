angular.module('app.resources',[]).
  factory('Venue', function($resource) {
    
    var Venue = $resource('/venues?action=:action',{action:"@action"}, {
      query: {
        method: 'GET'        
      },
      queryUpdate: {
        method: 'POST'
      }
    });
    
    return Venue;

  });