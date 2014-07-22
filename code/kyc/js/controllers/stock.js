angular.module('kyc.controllers').controller('StockCtrl', ['$scope', '$AjaxInterceptor','OrderService', 'Export','ACCOUNT_ID', 'UtilsService',
	function($scope, $AjaxInterceptor,OrderService,Export,ACCOUNT_ID, UtilsService) {

	var title = _tr("Stock");
	$scope.setLocation('stock');

	$scope.$parent.showDateFilter = true;

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

		var prepData = [[$scope.getExportDate()],[title]];
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
			startDate:moment($scope.start_date).valueOf(),
			endDate:moment($scope.end_date).valueOf(),
      dataJson:JSON.stringify(prepData)
    }
	}

	function prepareScopeStock(){
		if ( allOrders ){			
			var minDate = moment($scope.start_date)
      var maxDate = moment($scope.end_date)
			angular.forEach(allOrders,function(row){					    
        var orderData = moment(row.created);        
        if (orderData >= minDate && orderData <= maxDate){
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

		$scope.stock = UtilsService.dynamicSortObject($scope.stock, $scope.orderBy, $scope.direction)
		$scope.stocks = $scope.stock;
		$scope.totalItems = Object.keys($scope.stock).length;
		$scope.numPerPage = 10;
		$scope.currentPage = 1;
		$AjaxInterceptor.complete();		
	}

	$scope.setOrderBy = function( orderBy, direction ){
		$scope.stock = UtilsService.dynamicSortObject($scope.stock, orderBy, $scope.direction)

		loadStocksByPage();
	}

	var loadStocksByPage = function(){
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
		$scope.stocks = $scope.stock.slice(begin, end );		
	    	// $scope.stocks = UtilsService.sliceObject( $scope.stock, begin, end );		
	}	

  $scope.$watch('currentPage + numPerPage', function() {
  	loadStocksByPage();
  });	

	prepareScopeStock();

	  $scope.setPage = function (pageNo) {
	    $scope.currentPage = pageNo;
	  };	

    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
      setTimeout(function(){
      	$('.invisibleBack').addClass('visible')
      },200)
      
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
      setTimeout(function(){
      	$('.invisibleBack').removeClass('visible')
      },100)
    }		
  }])