angular.module('kyc.resources').
  factory('VenueCustomers',['$resource', function($resource) {
    
    var VenueCustomers = $resource('/api/venues/:id/customers',{id:"@id"},{});

    return VenueCustomers;
}]);