angular.module('kyc.resources').
  factory('Outlet', function($resource) {
    
    var Outlet = $resource('/api/outlets',{},{});

    return Outlet;
  });