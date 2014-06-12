angular.module('accountSettings.controllers')
 .controller('BillingCtrl', ['$scope', 'ACCOUNT_ID', 'Invoice', 'AccountInvoice',
  function ($scope,ACCOUNT_ID,Invoice,AccountInvoice) {

		$scope.setSelected($scope.Views.billingHistory);
		
    AccountInvoice.query({accountId:ACCOUNT_ID},function(result){
      $scope.invoices = result;     
      console.log($scope.invoices);
      $scope.finishLoading();
    })  		

    
  

  }]);    
