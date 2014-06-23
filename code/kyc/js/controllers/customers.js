angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope', function($scope) {

	$scope.customers = {};

	$scope.$on('preoday.allData', function( event, data ) {
		$scope.allData = data.allData;
		prepareScopeCustomers();
	});


	function prepareScopeCustomers(){
		
		if ( $scope.allData ) {
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
		}
	}
	
	prepareScopeCustomers();



    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }	
}])