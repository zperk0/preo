angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope', function($scope) {


	function prepareScopeCustomers(){
		$scope.customers = {};

		
		angular.forEach($scope.allData,function(row){
					var customerId  = row.userId;
					if ($scope.customers[customerId] === undefined){
						$scope.customers[customerId] = {
								name:row.user.firstName+" "+row.user.lastName,
								totalSpent:row.total,
								emailAddress:row.user.username
						}	
					}
					else{
							$scope.customers[customerId].totalSpent+=row.total;
					};																			
		});
		console.log($scope.customers);
	}
	
	prepareScopeCustomers();
}])