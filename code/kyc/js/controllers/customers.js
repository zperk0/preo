angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope','OrderService', '$AjaxInterceptor','Export','ACCOUNT_ID', 'UtilsService',
 function($scope,OrderService, $AjaxInterceptor,Export,ACCOUNT_ID, UtilsService) {
 	$scope.setLocation('customers');
	$scope.customers = {};

	$scope.$parent.showDateFilter = true;
	var title = _tr("Customers")
	var allOrders = OrderService.getOrders();
	prepareScopeCustomers();
	$scope.exportAll="1";



	$scope.selectAll = function() {
		angular.forEach($scope.customers,function(value, key){
			value.selected = $scope.all_options;
		});
	}	

	$scope.exportPdf= function(){
  	$scope.pdfData = prepareExportPdfData();    
  }

  $scope.exportCsv = function(){
    $scope.csvData = prepareExportCsvData();
  }

	function prepareExportCsvData(){
		var prepData = [[$scope.getExportDate()],[title]];
			angular.forEach($scope.customers,function(item){				
					if ($scope.exportAll === "1" || item.selected === true){
							prepData.push([item.name,item.totalSpent,item.emailAddress]);
					}
			})
		return {
       data:prepData
    }
	}

	function prepareExportPdfData(){
		var prepData = {
			"Name" :[],
			"Total Spent":[],
			"Email Address":[]
		};
			angular.forEach($scope.customers,function(item){
					if ($scope.exportAll === "1" || item.selected === true){
							prepData["Name"].push(item.name)
							prepData["Total Spent"].push(item.totalSpent);
							prepData["Email Address"].push(item.emailAddress);
					}
			})
		return {
			title:"Customers",
			startDate:$scope.start_date.getTime(),
			endDate:$scope.end_date.getTime(),
      dataJson:JSON.stringify(prepData)
    }
	}


	function prepareScopeCustomers(){
		
		if ( allOrders ) {			
			var minDate = moment($scope.start_date)
      var maxDate = moment($scope.end_date)
			angular.forEach(allOrders,function(row){						
		        var orderData = moment(row.created);        
		        if (orderData >= minDate && orderData <= maxDate){
								var customerId  = row.userId;
								if ($scope.customers[customerId] === undefined){
									$scope.customers[customerId] = {
											name:row.user.firstName+" "+row.user.lastName,
											totalSpent:Number(row.total.toFixed(2)),
											emailAddress:row.user.username,
											marketing: (row.user.optinLoyalty || row.user.optinOffers || row.user.optinOther) ? _tr("Accepts") : " - "
									}	
								}
								else{
										$scope.customers[customerId].totalSpent = Number(($scope.customers[customerId].totalSpent + row.total).toFixed(2));
								};																			
						}
			});
		}

		$scope.customersList = $scope.customers;
		$scope.totalItems = Object.keys($scope.customers).length;
		$scope.numPerPage = 10;
		$scope.currentPage = 1;		

		$AjaxInterceptor.complete();
	}

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.customersList = UtilsService.sliceObject( $scope.customers, begin, end );
  });	
	
    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }	
}])