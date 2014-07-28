angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope','OrderService', '$AjaxInterceptor','Export','ACCOUNT_ID', 'UtilsService',
 function($scope,OrderService, $AjaxInterceptor,Export,ACCOUNT_ID, UtilsService) {
 	$scope.setLocation('customers');
	

	$scope.$parent.showDateFilter = true;
	var title = _tr("Customers")
	var allOrders = OrderService.getOrders();
	
	$scope.exportAll="1";	

	$scope.$on('KYC_RELOAD',function(){                
      allOrders = OrderService.getOrders();	      
      prepareScopeCustomers();
  })


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
			"Email Address":[],
			"Marketing":[]
		};
			angular.forEach($scope.customers,function(item){
					if ($scope.exportAll === "1" || item.selected === true){
							prepData["Name"].push(item.name)
							prepData["Total Spent"].push(item.totalSpent);
							prepData["Email Address"].push(item.emailAddress);
							prepData["Marketing"].push(item.marketing);
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
		$scope.customers = {};
		if ( allOrders ) {			
			var minDate = moment.utc($scope.$parent.form.start_date)
      var maxDate = moment.utc($scope.$parent.form.end_date)
			angular.forEach(allOrders,function(row){						
		        var orderData = moment.utc(row.paid);        
		        if ($scope.$parent.getSelectedOutlets().length  === 0 || $scope.$parent.findOutlet(row.outletId).length >=1 ) {
			        if (orderData >= minDate && orderData <= maxDate){
									var customerId  = row.userId;
									if ($scope.customers[customerId] === undefined){
										$scope.customers[customerId] = {
												name:row.user.firstName+" "+row.user.lastName,
												totalSpent:Number(row.total.toFixed(2)),
												emailAddress:row.user.username,
												loyalty: row.user.optinLoyalty,
												offers: row.user.optinOffers,
												other: row.user.optinOther
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
		$scope.numPerPage = 20;
		$scope.currentPage = 1;		
		$scope.setOrderBy('totalSpent',true);
		$AjaxInterceptor.complete();
	}

	$scope.setOrderBy = function( orderBy, direction ){
		console.log('parent setting order by',orderBy,direction);
		if (direction !== undefined)
				$scope.direction = direction;
		else
			$scope.direction = !$scope.direction ;
		
		$scope.customers = UtilsService.dynamicSortObject($scope.customers, orderBy, $scope.direction)

		loadCustomersByPage();
	}

	var loadCustomersByPage = function(){
	    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	    , end = begin + $scope.numPerPage;
	    
		$scope.customersList = $scope.customers.slice(begin, end );		
	    	// $scope.customersList = UtilsService.sliceObject( $scope.customers, begin, end );		
	}

	prepareScopeCustomers();
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