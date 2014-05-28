
angular.module('shop.controllers',[]).
  controller('shopController', function($scope,$http,Resources,$q) {


    $scope.PremiumFeatures = Resources.Feature.query({},function(result){                
        console.log(arguments)
    },function(err){ 
        console.log("error",arguments)
    });   
    
  });