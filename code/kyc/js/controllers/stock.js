angular.module('kyc.controllers').controller('StockCtrl', ['$scope', '$AjaxInterceptor','OrderService', 'Export','ACCOUNT_ID',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID) {
	
	$scope.stock={};

  var allOrders = OrderService.getOrders();	
	$scope.selectAll = function() {

		angular.forEach($scope.stock,function(value, key){
			value.selected = $scope.all_options;
		});

	}	

	$scope.exportData = function(which){
		console.log('exporting data',which);
		var data = prepareExportData();
		switch (which){
			case 'pdf':
				// new Export.Pdf(data).$save({accountId:ACCOUNT_ID},function(res){
	   //        console.log('hoo',res);
	   //    });
				break;
			case 'csv':
			console.log('sending',data);
				new Export.Csv(data).$save({accountId:ACCOUNT_ID},function(res){
	          console.log('hoo',res);
	      });
				break;
		}
	}

	function prepareExportData(){
		var prepData = [["Stock"]];
			angular.forEach($scope.stock,function(item){
				console.log($scope.exportAll,$scope.exportAll === 1,item.selected);
					if ($scope.exportAll === "1" || item.selected === true){
							prepData.push([item.name,item.quantity]);
					}
			})
		return {
       data:prepData
    }
	}


	function prepareScopeStock(){
		if ( allOrders ){			
			angular.forEach(allOrders,function(row){			
		    var minTimestamp = $scope.search.start_date.getTime();
        var maxTimestamp = $scope.search.end_date.getTime();
        var orderData = new Date(row.created);        
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
	        	angular.forEach(row.items,function(item){
						var itemId  = item.menuItemId;
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
      		}
			});											
		}
		console.log($scope.stock);
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