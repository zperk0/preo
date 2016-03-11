angular.module('kyc.controllers').controller('EventsCtrl', ['$scope', '$location', 'OrderService','pusher','$AjaxInterceptor','$interval', 'UtilsService',
 function($scope, $location, OrderService,pusher,$AjaxInterceptor,$interval, UtilsService) {


    if (!$scope.venue.eventFlag) {
        $location.path('/dashboard');
        $AjaxInterceptor.complete();
        return;
    }

    $scope.$parent.showDateFilter = true;
    $scope.enableEventFilter();

    $scope.setLocation('events');
    $scope.exportAll="1";

    var title = '';

    var processOrders = function (data) {

        var allOrders = [];
        var selectedTimes = _.pluck($scope.eventsSelected, 'time');
        if (data.orders){
            allOrders = _.filter(data.orders,function(order){
                return (selectedTimes.length === 0 || selectedTimes.indexOf(order.eventTime) !== -1);
            })
        }

        $scope.allOrders = allOrders;
        $scope.orders = allOrders;

        $scope.totalItems = $scope.orders ? $scope.orders.length : 0;

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

            if (eventIds.length === 0 || eventIds.indexOf(order.eventId) !== -1) {
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
        if ( $scope.allOrders && $scope.allOrders.length ) {
            $scope.orders = $scope.allOrders.slice(begin, end );
        }
    }

    $scope.exportPdf= function(){
        $scope.currentAction = 'pdf';
        $scope.pdfData = prepareExportPdfData();
    }

      $scope.exportCsv = function(){
        $scope.currentAction = 'csv;'
        $scope.csvData = prepareExportCsvData();
      }

      $scope.getExportDateForEvent = function (orderEach) {
        var events = $scope.getEventsSelected() || $scope.events;

        if (events.length > 1) {
            return moment($scope.getEventByOrder(orderEach[orderEach.length - 1]).schedules[0].startDate).format("DD-MMM-YYYY") + ' - ' + moment($scope.getEventByOrder(orderEach[0]).schedules[0].endDate).format("DD-MMM-YYYY");
        }

        return $scope.form.start_date.format("DD-MMM-YYYY") + " - " + $scope.form.end_date.format("DD-MMM-YYYY");
      }

    function prepareExportCsvData(){
        var events = $scope.getEventsSelected();
        events = events.length  === 0 ? $scope.events : events;

        if (events.length == 1) {
            title = events[0].name;
        } else {
            title = '';
        }

        var titlesCSV = ["Order ID"];

        if (events.length > 1) {
            titlesCSV.push('Event');
        }

        titlesCSV.push("Outlet");
        titlesCSV.push("Customer");
        titlesCSV.push("Email");
        titlesCSV.push("Order Time");
        titlesCSV.push("Items");
        titlesCSV.push("Special Request");
        titlesCSV.push("Subtotal");
        titlesCSV.push("Discounts and Fees");
        titlesCSV.push("Order Total");
        titlesCSV.push("Order Status");
        titlesCSV.push("Loyalty");
        titlesCSV.push("Offers");
        titlesCSV.push("Other");
        titlesCSV.push("Collection");

        var statusOrderHide = ['NOSHOW', 'REJECTED', 'CANCELLED', 'PAYMENT_FAILED'];

        var orderEach = $scope.allOrders.filter(function (order) {
            return statusOrderHide.indexOf(order.status) === -1;
        })

        var prepData = [[$scope.getExportDateForEvent(orderEach)],[title], titlesCSV];
        var total = 0;

            angular.forEach(orderEach,function(order){
                    if ($scope.exportAll === "1" || order.selected === true){
                        var arrPrepData = [ order.id ];

                        var arrItems = getItemsAsString(order);
                        if (events.length > 1) {
                            arrPrepData.push('\"' + $scope.getEventByOrder(order).fullName + '\"');
                        }
                        arrPrepData.push($scope.getOutletById(order.outletId).name || order.outletId);
                        arrPrepData.push(order.user.name);
                        arrPrepData.push(order.user.email);
                        arrPrepData.push(moment(order.created).format('DD/MM/YYYY HH:mm'));
                        arrPrepData.push('\"' + arrItems.join(';').replaceAll('\"', '') + '\"');
                        arrPrepData.push(order.notes);
                        arrPrepData.push($scope.getCurrency() + order.subTotal.toFixed(2));
                        arrPrepData.push('\"' + getDiscountsAndFeedAsString(order).join(';').replaceAll('\"', '') + '\"');
                        arrPrepData.push($scope.getCurrency() + order.total.toFixed(2));
                        arrPrepData.push(order.status);
                        arrPrepData.push(order.user.optinLoyalty);
                        arrPrepData.push(order.user.optinOffers);
                        arrPrepData.push(order.user.optinOther);
                        arrPrepData.push(order.pickupSlot);

                        prepData.push(arrPrepData);

                        total += order.total;
                    }
            })

        var totalData = [
            '', '', '', '', '', '', '', '','Total', $scope.getCurrency() + total.toFixed(2), '', ''
        ];

        if (events.length > 1) {
            totalData.unshift('');
        }

        prepData.push(totalData);

        var result = {
           data:prepData
        };

        if (events.length > 1) {
            result.nameOfFile = _tr("Orders Report") + ' (' + $scope.form.start_date.format("DD-MM-YY") + "-" + $scope.form.end_date.format("DD-MM-YY") + ')';
        } else {
            result.nameOfFile = events[0].name;
        }

        return result;
    }

    var getItemsAsString = function (order) {
        var arrItems = [];

        var items = order.items;
        var total = 0;

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            total += item.total;
            var mods = '';
            angular.forEach(item.modifiers, function(modifier,key) {
                if (key == item.modifiers.length-1) {
                    mods += modifier.name;
                } else {
                    mods += modifier.name + ', ';
                }
            });

            var currency = null;
            if ($scope.currentAction == 'pdf') {
                currency = $scope.getCurrencyByAscii();
            } else {
                currency = $scope.getCurrency();
            }

            var itemString = item.qty;
            itemString += 'x ';
            itemString += item.name;
            itemString += (item.modifiers.length ? ' (' + mods + ') ' : ' ');
            itemString += currency;
            itemString += item.total.toFixed(2);

            arrItems.push(itemString);
        };

        order.subTotal = total;

        return arrItems;
    }

    var getDiscountsAndFeedAsString = function (order) {
        var arrDiscounts = [];

        var discounts = order.discounts;
        var fees = order.fees;
        var total = 0;

            var currency = null;
            if ($scope.currentAction == 'pdf') {
                currency = $scope.getCurrencyByAscii();
            } else {
                currency = $scope.getCurrency();
            }

        for (var i = 0, len = discounts.length; i < len; i++) {
            var discount = discounts[i];
            arrDiscounts.push(discount.name + ' -' + currency + discount.discount.toFixed(2));
        };

        for (var i = 0, len = fees.length; i < len; i++) {
            var fee = fees[i];
            arrDiscounts.push(fee.name + ' ' + currency + fee.amount.toFixed(2));
        };

        return arrDiscounts;
    };

    $scope.getItemsAsString = function (order) {
        if (!order.itemString) {
            order.itemString = getItemsAsString(order).join('<br />');
        }
        return order.itemString;
    }

    $scope.getDiscountsAndFees = function (order) {
        if (!order.discountsAndFees) {
            order.discountsAndFees = getDiscountsAndFeedAsString(order).join('<br />');
        }
        return order.discountsAndFees;
    }

    function prepareExportPdfData(){
        var prepData = {
            "Order ID" :[]
        };

        var events = $scope.getEventsSelected();
        events = events.length  === 0 ? $scope.events : events;

        if (events.length > 1) {
            prepData['Event'] = [];
        }

        angular.extend(prepData, {
            "Outlet" :[],
            "Collection": [],
            "Customer" :[],
            "Items":[],
            "Subtotal":[],
            "Discounts and Fees":[],
            "Order Total":[]
        });

        var total = 0;

        var statusOrderHide = ['NOSHOW', 'REJECTED', 'CANCELLED', 'PAYMENT_FAILED'];

        var orderEach = $scope.allOrders.filter(function (order) {
            return statusOrderHide.indexOf(order.status) === -1;
        })

        angular.forEach(orderEach,function(order, key){
                if ($scope.exportAll === "1" || order.selected === true){
                        prepData["Order ID"].push(order.id);
                        prepData["Outlet"].push(order.address ? order.address : ($scope.getOutletById(order.outletId).name || order.outletId));
                        var arrCustomer = [order.user.name, order.user.email];
                        prepData["Customer"].push(arrCustomer.join('___BR___'));

                        var arrItems = getItemsAsString(order);

                        if (events.length > 1) {
                            //Replace is a hack to allow double quotes in event names
                            prepData['Event'].push($scope.getEventByOrder(order).fullName.replace('"',"''"));
                        }
                        var notes = order.notes ?  "___BR______BR___  ----- Special Requests -----  ___BR______BR___" + order.notes  : "";
                        notes = notes.replace(/\\n/g,"___BR___");
                        prepData["Items"].push(arrItems.join('___BR___') + notes);
                        prepData["Subtotal"].push(order.subTotal.toFixed(2));
                        prepData["Discounts and Fees"].push(getDiscountsAndFeedAsString(order).join('___BR___'));
                        prepData["Order Total"].push($scope.getCurrencyByAscii() + order.total.toFixed(2));
                        prepData["Collection"].push(order.pickupSlot);

                        total += order.total;
                }
        })

        prepData["Order ID"].push('');
        prepData["Outlet"].push('');
        prepData["Customer"].push('');

        if (events.length > 1) {
            prepData['Event'].push('');
        }

        prepData["Items"].push(' ');
        prepData["Subtotal"].push(' ');
        prepData["Discounts and Fees"].push('Total');
        prepData["Order Total"].push($scope.getCurrencyByAscii() + total.toFixed(2));
        prepData["Collection"].push('');
        var result = {
            startDate:$scope.form.start_date.valueOf(),
            endDate:$scope.form.end_date.valueOf(),
            dataJson:JSON.stringify(prepData),
            orientation: 'LANDSCAPE',
            type: 'kyc-table-event'
        };

        if (events.length > 1) {
            result.title = _tr("Orders By Events");
        } else {
            result.title = events[0].name.replace('"','\\"');
        }

        $scope.currentAction = '';
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