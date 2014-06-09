angular.module('accountSettings.controllers')
 .controller('BillingCtrl', ['$scope', 'ACCOUNT_ID', 'Invoice', 
  function ($scope,ACCOUNT_ID,Invoice) {

		$scope.setSelected($scope.Views.billingHistory);
		Invoice.query({accountId:ACCOUNT_ID},function(result){
      $scope.invoices = result;     
      console.log($scope.invoices);
      $scope.finishLoading();
    })  		

    
    $scope.downloadPdf = function(invoice){
    	
    }

  }]);    
