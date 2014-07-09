angular.module('kyc.controllers').controller('StockCtrl', ['$scope', '$AjaxInterceptor','OrderService', 'Export','ACCOUNT_ID',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID) {

	$scope.setLocation('stock');

	$scope.stock={};
	$scope.exportAll="1";

  var allOrders = OrderService.getOrders();	
	$scope.selectAll = function() {

		angular.forEach($scope.stock,function(value, key){
			value.selected = $scope.all_options;
		});

	}	

  $scope.exportPdf= function(){
  	$scope.pdfData = prepareExportPdfData();    
  }

  $scope.exportCsv = function(){
    $scope.csvData = prepareExportCsvData();
  }

	function prepareExportCsvData(type){		
		var prepData = [["Stock"]];
		angular.forEach($scope.stock,function(item){
					if ($scope.exportAll === "1" || item.selected === true){
							prepData.push([item.name,item.quantity]);
					}
			})
		return { data: prepData };
	}
	function prepareExportPdfData(){
		var prepData = {
			"Item" :[],
			"Quantity Ordered":[]
		};
			angular.forEach($scope.stock,function(item){
					if ($scope.exportAll === "1" || item.selected === true){
							prepData["Item"].push(item.name)
							prepData["Quantity Ordered"].push(item.quantity);
					}
			})
		return {
			title:"Stock",
			startDate:$scope.search.start_date.getTime(),
			endDate:$scope.search.end_date.getTime(),
      dataJson:JSON.stringify(prepData)
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