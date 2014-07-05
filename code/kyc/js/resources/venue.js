angular.module('kyc.resources').
  factory('Venue', function($resource) {
    
    var Venue = $resource('/api/venues/:id', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });    

    return Venue;

  });