angular.module('accountSettings.controllers')
 .controller('BillingCtrl', ['$scope', 'ACCOUNT_ID', 'AccountPayment', 
  function ($scope,ACCOUNT_ID,AccountPayment) {


		AccountPayment.query({accountId:ACCOUNT_ID},function(result){
      $scope.accountPayments = result;     
      console.log($scope.accountPayments);
    })  		

    

  }]);    
