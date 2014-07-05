angular.module('kyc.controllers').controller('CustomersCtrl', ['$scope','OrderService', '$AjaxInterceptor','Export','ACCOUNT_ID',
 function($scope,OrderService, $AjaxInterceptor,Export,ACCOUNT_ID) {

	$scope.customers = {};

	var allOrders = OrderService.getOrders();
	prepareScopeCustomers();
	$scope.exportAll="1";

	$scope.selectAll = function() {
		angular.forEach($scope.customers,function(value, key){
			value.selected = $scope.all_options;
		});
	}	

	function prepareExportCsvData(){
		var prepData = [["Customers"]];
			angular.forEach($scope.customers,function(item){				
				console.log(item,prepData,$scope.exportAll);	
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
				console.log($scope.exportAll,$scope.exportAll === 1,item.selected);
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

	$scope.exportData = function(which){			
		switch (which){
			case 'pdf':
				var data = prepareExportPdfData();
				new Export.Pdf(data).$table({accountId:ACCOUNT_ID},function(res){
					console.log('exported pdf');	   			
	   		});
				break;
			case 'csv':
			var data = prepareExportCsvData();
				new Export.Csv(data).$save({accountId:ACCOUNT_ID},function(res){
	          console.log('hoo',res);
	      });
				break;
		}
	}


	function prepareScopeCustomers(){
		
		if ( allOrders ) {			
			angular.forEach(allOrders,function(row){
						var minTimestamp = $scope.search.start_date.getTime();
		        var maxTimestamp = $scope.search.end_date.getTime();
		        var orderData = new Date(row.created);        
		        if (orderData >= minTimestamp && orderData <= maxTimestamp){
								var customerId  = row.userId;
								if ($scope.customers[customerId] === undefined){
									$scope.customers[customerId] = {
											name:row.user.firstName+" "+row.user.lastName,
											totalSpent:Number(row.total.toFixed(2)),
											emailAddress:row.user.username
									}	
								}
								else{
										$scope.customers[customerId].totalSpent = Number(($scope.customers[customerId].totalSpent + row.total).toFixed(2));
								};																			
						}
			});
		}

		$AjaxInterceptor.complete();
	}
	
    $scope.showOptions = function() {
      angular.element('.flip-container').addClass('active');
    };

    $scope.hideOptions = function() {
      angular.element('.flip-container').removeClass('active');
    }	
}])