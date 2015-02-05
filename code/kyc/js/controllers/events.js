angular.module('kyc.controllers').controller('EventsCtrl', ['$scope','OrderService','pusher','$AjaxInterceptor','$interval','VENUE_ID', 'UtilsService',
 function($scope,OrderService,pusher,$AjaxInterceptor,$interval,VENUE_ID, UtilsService) {

    $scope.$parent.showDateFilter = true;
    $scope.enableEventFilter();

    $scope.setLocation('events');

    var title = _tr("Events");

    var processOrders = function (data) {
        $scope.allOrders = data.orders;
        $scope.orders = data.orders;

        $scope.totalItems = $scope.orders.length;

        $AjaxInterceptor.complete();
    }
      
    $scope.$on('ORDERS_EVENTS_LOADED', function(event, data){
        $scope.ordersLoaded = data.orders;
        processOrders(data);
    });

    $scope.$on('SELECT_EVENT', function () {
        var eventIds = $scope.getEventsSelectedIds();
        var newOrders = [];

        for (var i = 0, len = $scope.ordersLoaded.length; i < len; i++) {
            var order = $scope.ordersLoaded[i];

            if (eventIds.indexOf(order.eventId) !== -1) {
                newOrders.push(order);
            }
        };

        processOrders({
            orders: newOrders
        });
    })

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
        var events = $scope.getEventsSelected();       

        var prepData = [[$scope.getExportDate()],[title]];
            angular.forEach($scope.allOrders,function(order){                
                    if ($scope.exportAll === "1" || order.selected === true){
                        var arrPrepData = [ order.id ];
                        
                        var arrItems = getItemsAsString(order);
                        if (events.length > 1) {                            
                            arrPrepData.push($scope.getEventById(order.eventId).name || order.eventId);
                        }          

                        arrPrepData.push($scope.getOutletById(order.outletId).name || order.outletId);
                        arrPrepData.push(order.user.name);
                        arrPrepData.push(order.user.email);
                        arrPrepData.push(order.phone || order.user.phone);
                        arrPrepData.push(arrItems.join(';'));
                        arrPrepData.push($scope.getCurrency() + order.total.toFixed(2));
                        arrPrepData.push(order.status);
                        arrPrepData.push(order.user.optinLoyalty);
                        arrPrepData.push(order.user.optinOffers);
                        arrPrepData.push(order.user.optinOther);

                        prepData.push(arrPrepData);
                    }
            })
        return {
           data:prepData
        }
    }

    var getItemsAsString = function (order) {
        var arrItems = [];

        var items = order.items;
        var total = 0;

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            total += item.total;

            arrItems.push(item.qty + 'x ' + item.name + ' ' + $scope.getCurrency() + item.total.toFixed(2));
        };

        order.total = total;

        return arrItems;
    }

    $scope.getItemsAsString = function (order) {
        if (!order.itemString) {
            order.itemString = getItemsAsString(order).join('<br />');
        }
        return order.itemString;
    }

    $scope.getEventName = function (order) {
        if (!order.eventName) {
            order.eventName = $scope.getEventById(order.eventId).name  || order.eventId;
        }

        return order.eventName;
    }

    function prepareExportPdfData(){
        var prepData = {
            "Order ID" :[]           
        };

        var events = $scope.getEventsSelected();

        if (events.length > 1) {
            prepData['Event'] = [];
        }

        angular.extend(prepData, {
            "Outlet" :[],
            "Customer" :[],
            "Email":[],
            "Phone Number":[],
            "Items":[],
            "Order Total":[],
            "Order Status":[],
            "Loyalty":[],
            "Offers":[],
            "Other":[]             
        });

            angular.forEach($scope.allOrders,function(order, key){
                    if ($scope.exportAll === "1" || order.selected === true){
                            prepData["Order ID"].push(order.id);
                            prepData["Outlet"].push($scope.getOutletById(order.outletId).name || order.outletId);
                            prepData["Customer"].push(order.user.name);
                            prepData["Email"].push(order.user.email);
                            prepData["Phone Number"].push(order.phone || order.user.phone);

                            var arrItems = getItemsAsString(order);

                            if (events.length > 1) {
                                prepData['Event'].push($scope.getEventById(order.eventId).name || order.eventId);
                            }

                            prepData["Items"].push(arrItems.join('___BR___'));
                            prepData["Order Total"].push($scope.getCurrency() + order.total.toFixed(2));
                            prepData["Order Status"].push(order.status);
                            prepData["Loyalty"].push(order.user.optinLoyalty);
                            prepData["Offers"].push(order.user.optinOffers);
                            prepData["Other"].push(order.user.optinOther);                            
                    }
            })
        var result = {
            startDate:$scope.form.start_date.valueOf(),
            endDate:$scope.form.end_date.valueOf(),
            dataJson:JSON.stringify(prepData)
        };

        if (events.length > 1) {
            result.title = events[0].name;
        } else {
            result.title = _tr("Events");
        }

        return result;
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