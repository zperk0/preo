angular.module('kyc.controllers').controller('EventsCtrl', ['$scope','OrderService','pusher','$AjaxInterceptor','$interval','VENUE_ID', 'UtilsService',
 function($scope,OrderService,pusher,$AjaxInterceptor,$interval,VENUE_ID, UtilsService) {

    $scope.$parent.showDateFilter = true;
    $scope.enableEventFilter();

    $scope.setLocation('events');

   /* $scope.orders.$promise.then(function(){
        $scope.orders = $scope.orders.sort(UtilsService.dynamicSort('updated', true))
    });*/

    var isRequesting = false;

    var qtdRequests = 0;
    var title = _tr("Events")
      
    $scope.$on('ORDERS_EVENTS_LOADED', function(event, data){
        console.log('orders ==== ', data.orders);
        $scope.allOrders = data.orders;
        $scope.orders = data.orders;

        $scope.totalItems = $scope.orders.length;

        $AjaxInterceptor.complete();
    });

    $scope.loadEvents();

      $scope.$watch('currentPage + numPerPage', function() {
        loadEventsByPage();
      });

    var loadEventsByPage = function(){
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;
        if ( $scope.allOrders && $scope.allOrders ) {
            $scope.orders = $scope.allOrders.slice(begin, end );
        }           
    }      

    $scope.exportPdf= function(){
        $scope.pdfData = prepareExportPdfData();    
    }

      $scope.exportCsv = function(){
        $scope.csvData = prepareExportCsvData();
      }     

    function prepareExportCsvData(){
        var prepData = [[$scope.getExportDate()],[title]];
            angular.forEach($scope.allOrders,function(order){                
                    if ($scope.exportAll === "1" || order.selected === true){
                            prepData.push([order.name,order.totalSpent.toFixed(2),order.emailAddress,order.loyalty,order.offers,order.other]);
                    }
            })
        return {
           data:prepData
        }
    }

    var getItemsAsString = function (order) {
        var arrItems = [];

        var items = order.items;

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];

            arrItems.push(item.qty + 'x ' + item.name + ' ' + item.total);
        };

        return arrItems.join('\n');
    }

    function prepareExportPdfData(){
        var prepData = {
            "Customer" :[],
            "Email":[],
            "Phone Number":[]
            //"Items":[]
        };
            angular.forEach($scope.allOrders,function(order){
                    if ($scope.exportAll === "1" || order.selected === true){
                            prepData["Customer"].push(order.user.name)
                            prepData["Email"].push(order.user.email);
                            prepData["Phone Number"].push(order.phone || order.user.phone);
                            //prepData["Items"].push(getItemsAsString(order));
                    }
            })

            console.log(prepData);
        return {
            title:"Events",
            startDate:$scope.form.start_date.valueOf(),
            endDate:$scope.form.end_date.valueOf(),
            dataJson:JSON.stringify(prepData)
        }
    }     

    $scope.selectAll = function() {
        angular.forEach($scope.orders,function(value, key){
            value.selected = $scope.all_options;
        });
    }       

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

    $scope.getOrderItems = function(order){
      var items = [];
      angular.forEach(order.items,function(item){
        items.push(item.qty+" x " + item.name);
      });
      return items;
    }

    
    $scope.numPerPage = 20;
    $scope.currentPage = 1; 

    $AjaxInterceptor.complete();

}]);