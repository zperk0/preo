angular.module('kyc.resources').
  factory('Outlet',['$resource', function($resource) {
    
    var Outlet = $resource('/api/outlets',{},{});

    return Outlet;
  }]);