
angular.module('shop.controllers',[]).
  controller('shopController', function($scope,$http,Resources,FEATURES,$q) {


    $scope.PremiumFeatures = FEATURES;
    
  });