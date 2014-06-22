angular.module('kyc.controllers').controller('StockCtrl', ['$scope', function($scope) {

  	$scope.stock = {};

	$scope.$on('preoday.allData', function( event, data ) {
		$scope.allData = data.allData;
		prepareScopeStock();
	});

	function prepareScopeStock(){

		if ( $scope.allData ){
			angular.forEach($scope.allData,function(row){
				angular.forEach(row.items,function(item){
					var itemId  = item.id;
						if ($scope.stock[itemId] === undefined){						
							$scope.stock[itemId] = {
									name:item.name,
									quantity:item.qty
							}	
						}
						else{
								$scope.stock[itemId].quantity+=item.qty;
						};																			
				})					
			});
		}
	}

	prepareScopeStock();

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		
  }])