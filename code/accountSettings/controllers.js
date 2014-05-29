//shop
var appCtrls = angular.module('accountSettings.controllers',[]);


appCtrls.controller('MainCtrl', ['$scope', '$http',  
  function ($scope, $http) {
    console.log("mainCtrl");

  }]);    

appCtrls.controller('PhoneListCtrl', ['$scope', '$http',  
  function ($scope, $http) {
    console.log("phonecontrl");
    
  }]);

appCtrls.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log("phonedetailscontrol");
    $scope.phoneId = $routeParams.phoneId;
}]);