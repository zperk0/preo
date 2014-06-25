angular.module('kyc.controllers').controller('StockCtrl', ['$scope', '$AjaxInterceptor','OrderService', function($scope, $AjaxInterceptor,OrderService) {
	
 
 
	$scope.stock={};

  var allOrders = OrderService.getOrders();	
	$scope.selectAll = function() {

		angular.forEach($scope.stock,function(value, key){
			value.selected = $scope.all_options;
		});

	}	

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

		$AjaxInterceptor.complete();		
	}

	prepareScopeStock();

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }		
  }])