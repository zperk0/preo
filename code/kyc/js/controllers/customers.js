angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope','OrderService', '$AjaxInterceptor','Export','ACCOUNT_ID',
 function($scope,OrderService, $AjaxInterceptor,Export,ACCOUNT_ID) {
 	$scope.setLocation('customers');
	$scope.customers = {};

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
		var prepData = [["Customers"]];
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
			startDate:$scope.search.start_date.getTime(),
			endDate:$scope.search.end_date.getTime(),
      dataJson:JSON.stringify(prepData)
    }
	}


	function prepareScopeCustomers(){
		
		if ( allOrders ) {			
			var minDate = moment($scope.search.start_date)
      var maxDate = moment($scope.search.end_date)
      console.log('allOrders',allOrders);
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
		console.log('$scope.customers',$scope.customers);
		$AjaxInterceptor.complete();
	}
	
    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }	
}])