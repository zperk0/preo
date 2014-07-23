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
			startDate:$scope.form.start_date.valueOf(),
			endDate:$scope.form.end_date.valueOf(),
      dataJson:JSON.stringify(prepData)
    }
	}


	function prepareScopeCustomers(){
		
		if ( allOrders ) {			
			var minDate = moment($scope.$parent.form.start_date)
      var maxDate = moment($scope.$parent.form.end_date)
			angular.forEach(allOrders,function(row){						
		        var orderData = moment(row.created);        
		        if ($scope.$parent.getSelectedOutlets().length  === 0 || $scope.$parent.findOutlet(row.outletId).length >=1 ) {
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
						}
			});
		}

		$scope.customers = UtilsService.dynamicSortObject($scope.customers, $scope.orderBy, $scope.direction)
		$scope.customersList = $scope.customers;
		$scope.totalItems = Object.keys($scope.customers).length;
		$scope.numPerPage = 10;
		$scope.currentPage = 1;		

		$AjaxInterceptor.complete();
	}

	$scope.setOrderBy = function( orderBy, direction ){
		$scope.customers = UtilsService.dynamicSortObject($scope.customers, orderBy, $scope.direction)

		loadCustomersByPage();
	}

	var loadCustomersByPage = function(){
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
		$scope.customersList = $scope.customers.slice(begin, end );		
	    	// $scope.customersList = UtilsService.sliceObject( $scope.customers, begin, end );		
	}

	  $scope.$watch('currentPage + numPerPage', function() {
	  	loadCustomersByPage();
	  });
	
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
      },200)
    }	
}])