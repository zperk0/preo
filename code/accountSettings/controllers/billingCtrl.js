angular.module('accountSettings.controllers')
 .controller('BillingCtrl', ['$scope', 'ACCOUNT_ID', 'AccountInvoice',
  function ($scope,ACCOUNT_ID,AccountInvoice) {

		$scope.setSelected($scope.Views.billingHistory);
		
    $scope.invoices  = AccountInvoice.query({accountId:ACCOUNT_ID},function(result){      
      $scope.finishLoading();
    })  	    
  

    $scope.getExportInvoice = function(id){
      return "/api/invoices/"+id+"/pdf"
    }
  }]);    
