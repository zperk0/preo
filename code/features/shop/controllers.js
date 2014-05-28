//shop
var appCtrls = angular.module('shop.controllers',[]);
  
appCtrls.controller('shopController', function($scope,$http,Resources,FEATURES) {    
    $scope.PremiumFeatures = FEATURES;

    $scope.setSelectedFeature = function(index){
        $scope.selectedFeature = {
            index:index,
            feature:$scope.PremiumFeatures[index]
        };
    }

    $scope.selectNextFeature = function(){
      var index = $scope.selectedFeature.index;
        if (index < $scope.PremiumFeatures.length-1){
          index++;
          $scope.selectedFeature = {
              index:index,
              feature:$scope.PremiumFeatures[index]
         };
      }
    }

    $scope.selectPreviousFeature = function(){
        var index = $scope.selectedFeature.index;
        if (index > 0){
          index--;
          $scope.selectedFeature = {
              index:index,
              feature:$scope.PremiumFeatures[index]
         };
      }
    }

});