angular.module('kyc.controllers').controller('OrdersCtrl', ['$scope', '$location', 'OrderService','$AjaxInterceptor','UtilsService', 'OutletService',
    function($scope, $location, OrderService,$AjaxInterceptor,UtilsService, OutletService) {

        if ($scope.venue.eventFlag) {
            $location.path('/dashboard');
            $AjaxInterceptor.complete();
            return;
        }

        $scope.$parent.showDateFilter = true;
        $scope.setLocation('orders');

        var title = '';
        $scope.numPerPage = 20;
        $scope.currentPage = 1;
        $scope.exportAll="1";

        function _processOrders (orders) {
            console.log("ORDERS === ", orders);
            if ( orders.length ) {
                $scope.allOrders = [];
                $scope.orders = [];
                var minDate = $scope.$parent.form.start_date;
                console.log("minDate === ", minDate);
                var maxDate = $scope.$parent.form.end_date;
                console.log("maxDate === ", maxDate);

                    for (var i = orders.length - 1; i >= 0; i--) {
                        var order = orders[i];
                        var orderDate = moment.utc(order.created);
                        if (orderDate >= minDate && orderDate <= maxDate) {
                            order.outletName = $scope.getOutletById(order.outletId).name;
                            order.dateTimeStamp = moment.utc(order.created).valueOf();
                            order.dateTime = moment.utc(order.created).format('DD/MM/YYYY HH:mm');
                            $scope.allOrders.push(order);
                        }
                    };

                $scope.orders = $scope.allOrders;
                console.log('orders view here', $scope.allOrders);
                $scope.currentPage = 1;
                $scope.direction = true;
                $scope.totalItems = $scope.orders.length;
                $scope.setOrderBy('dateTimeStamp')
            }
            $AjaxInterceptor.complete();
        };

        $scope.$on('KYC_RELOAD',function(){
            _processOrders(OrderService.getOrders());
        });

        $scope.$watch('currentPage + numPerPage', function() {
            loadOrdersByPage();
        });

        $scope.setOrderBy = function( orderBy, direction ){
            if (direction !== undefined)
                $scope.direction = direction;
            $scope.allOrders = UtilsService.dynamicSortObject($scope.allOrders, orderBy, $scope.direction)

            loadOrdersByPage();
        }

        var loadOrdersByPage = function(){
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            if ( $scope.allOrders && $scope.allOrders.length ) {
                $scope.orders = $scope.allOrders.slice(begin, end );
            }
        };

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
        };

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
        };

        $scope.getOrderItems = function(order){
            var items = [];
            angular.forEach(order.items,function(item){
                items.push(item.qty+" x " + item.name);
            });
            return items;
        };

        $scope.getOrdersSelected = function () {
            var ordersSelected = [];

            for (var i = 0, len = $scope.orders.length; i < len; i++) {
                var currentOrder = $scope.orders[i];
                if (currentOrder.selected) {
                    ordersSelected.push(currentOrder);
                }
            };

            if (ordersSelected.length) {
                return ordersSelected;
            }

            return $scope.orders;
        };

        function prepareExportPdfData(){
            var prepData = {
                "Order ID" :[]
            };

            var ordersToExport = $scope.getOrdersSelected();

            if (ordersToExport.length > 1) {
                prepData['Outlet'] = [];
            }

            angular.extend(prepData, {
                "Order ID" :[],
                "Order Time": [],
                "Customer" :[],
                "Items":[],
                "Subtotal":[],
                "Discounts and Fees":[],
                "Order Total":[],
                "Order Status":[]
            });

            var total = 0;

            angular.forEach($scope.allOrders,function(order, key){
                if ($scope.exportAll === "1" || order.selected === true){
                    if ($scope.getSelectedOutlets().length > 1 || $scope.getSelectedOutlets().length == 0) {
                        prepData['Outlet'].push(order.outletName || order.outletId);
                    }
                    prepData["Order ID"].push(order.id);
                    prepData["Order Time"].push(order.dateTime);

                    var arrCustomer = [order.user.name, order.user.email];
                    prepData["Customer"].push(arrCustomer.join('___BR___'));

                    var arrItems = getItemsAsString(order);
                    prepData["Items"].push(arrItems.join('___BR___'));
                    prepData["Subtotal"].push(order.subTotal.toFixed(2));
                    prepData["Discounts and Fees"].push(getDiscountsAndFeedAsString(order).join('___BR___'));
                    prepData["Order Total"].push($scope.getCurrencyByAscii() + order.total.toFixed(2));
                    prepData["Order Status"].push(order.status);

                    total += order.total;
                }
            })

            prepData["Outlet"].push('');
            prepData["Order ID"].push('');
            prepData["Order Time"].push('');
            prepData["Customer"].push('');

            prepData["Items"].push('');
            prepData["Subtotal"].push('');
            prepData["Discounts and Fees"].push('Total');
            prepData["Order Total"].push($scope.getCurrencyByAscii() + total.toFixed(2));
            prepData["Order Status"].push('');

            var result = {
                startDate:$scope.form.start_date.valueOf(),
                endDate:$scope.form.end_date.valueOf(),
                dataJson:JSON.stringify(prepData),
                orientation: 'LANDSCAPE',
                type: 'kyc-table-order'
            };

            if (ordersToExport.length > 1) {
                result.title = _tr("Orders By Outlets");
            } else {
                result.title = ordersToExport[0].outletName;
            }

            $scope.currentAction = '';
            return result;
        };
        $scope.exportPdf= function(){
            $scope.currentAction = 'pdf';
            $scope.pdfData = prepareExportPdfData();
        };

        $scope.exportCsv = function(){
            $scope.currentAction = 'csv;'
            $scope.csvData = prepareExportCsvData();
        };
        function prepareExportCsvData(){
            var ordersToExport = $scope.getOrdersSelected();

            if (ordersToExport.length == 1) {
                title = ordersToExport[0].outletName;
            } else {
                title = '';
            }

            var titlesCSV = ["Order ID"];

            if ($scope.getSelectedOutlets().length > 1 || $scope.getSelectedOutlets().length == 0) {
                titlesCSV.push('Outlet');
            }

            titlesCSV.push("Customer");
            titlesCSV.push("Email");
            titlesCSV.push("Order Time");
            titlesCSV.push("Items");
            titlesCSV.push("Subtotal");
            titlesCSV.push("Discounts and Fees");
            titlesCSV.push("Order Total");
            titlesCSV.push("Payment Method");
            titlesCSV.push("Order Status");
            titlesCSV.push("Loyalty");
            titlesCSV.push("Offers");
            titlesCSV.push("Other");


            var statusOrderHide = ['NOSHOW', 'REJECTED', 'CANCELLED', 'PAYMENT_FAILED'];

            var orderEach = $scope.allOrders.filter(function (order) {
                return statusOrderHide.indexOf(order.status) === -1;
            })

            var prepData = [[$scope.getExportDate()],[title], titlesCSV];
            var total = 0;

            angular.forEach(orderEach,function(order){
                if ($scope.exportAll === "1" || order.selected === true){
                    var arrPrepData = [ order.id ];

                    var arrItems = getItemsAsString(order);
                    if ($scope.getSelectedOutlets().length > 1 || $scope.getSelectedOutlets().length == 0) {
                        arrPrepData.push('\"' + order.outletName + '\"');
                    }
                    console.log("each",order);
                    arrPrepData.push(order.user.name);
                    arrPrepData.push(order.user.email);
                    arrPrepData.push(moment(order.created).format('DD/MM/YYYY HH:mm'));
                    arrPrepData.push('\"' + arrItems.join(';').replaceAll('\"', '') + '\"');
                    arrPrepData.push(order.subTotal);
                    arrPrepData.push('\"' + getDiscountsAndFeedAsString(order).join(';').replaceAll('\"', '') + '\"');
                    arrPrepData.push($scope.getCurrency() + order.total.toFixed(2));
                    arrPrepData.push(order.paymentType);
                    arrPrepData.push(order.status);
                    arrPrepData.push(order.user.optinLoyalty);
                    arrPrepData.push(order.user.optinOffers);
                    arrPrepData.push(order.user.optinOther);

                    prepData.push(arrPrepData);

                    total += order.total;
                }
            })

            var totalData = [
                '', '', '', '', '', 'Total', $scope.getCurrency() + total.toFixed(2), '', '', '', '', ''
            ];

            if (ordersToExport.length > 1) {
                totalData.unshift('');
            }

            prepData.push(totalData);

            var result = {
                data:prepData
            };

            if (ordersToExport.length > 1 ) {
                result.nameOfFile = _tr("Orders Report") + ' (' + $scope.getExportDate() + ')';
            } else {
                result.nameOfFile = ordersToExport[0].outletName;
            }

            return result;
        }

        OutletService.getOutlets().then(function (outlets) {
            _processOrders(OrderService.getOrders());
            $AjaxInterceptor.complete();
        });
    }]);