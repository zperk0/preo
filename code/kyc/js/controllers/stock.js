angular.module('kyc.controllers').controller('StockCtrl', ['$scope','OrderService', function($scope,OrderService) {

  $scope.stock = {};	
  var allOrders = OrderService.getOrders();
	
	function prepareScopeStock(){
		if ( allOrders ){
			angular.forEach(allOrders,function(row){
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