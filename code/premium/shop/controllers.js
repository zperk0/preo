
angular.module('shop.controllers',[]).
  controller('shopController', function($scope,$http,Resources,$q) {

  	 $scope.PremiumFeatures = [
        {
            name :"My Order App Assistant",
            description:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
            price:10,
            features:["Feature 1","Feature 2","Feature 3","Super Amazing Long Feature Taking Two Lines or looking very weird and different"]
        },
        {
            name :"My Order App Independent",
            description:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
            price:20,
            features:["Feature 1","Feature 2","Feature 3","Super Amazing Long Feature Taking Two Lines or looking very weird and different"]
        },
        {
            name :"My Order App Loyalty",
            description:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
            price:30,
            features:["Feature 1","Feature 2","Feature 3","Super Amazing Long Feature Taking Two Lines or looking very weird and different"]
        },
        {
            name :"Know Your Customers",
            description:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
            price:20,
            features:["Feature 1","Feature 2","Feature 3","Super Amazing Long Feature Taking Two Lines or looking very weird and different"]
        }
     ]

    
  });