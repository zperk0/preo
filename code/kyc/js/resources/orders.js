angular.module('kyc.resources').
  factory('Orders',['$resource', function($resource) {
    
    var Orders = $resource('/api/orders',{},{});

    return Orders;
}]);