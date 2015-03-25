angular.module('kyc.controllers').controller('OrdersCtrl', ['$scope', '$location', 'OrderService','$AjaxInterceptor',
    function($scope, $location, OrderService,$AjaxInterceptor) {

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
                $scope.allOrders = orders;
                $scope.orders = orders;

                for (var i = orders.length - 1; i >= 0; i--) {
                    var order = orders[i];
                    order.outletName = $scope.getOutletById(order.outletId).name;
                    order.dateTimeStamp = moment.utc(order.created).valueOf();
                    order.dateTime = moment.utc(order.created).format('DD/MM/YYYY HH:mm');
                };

                $scope.totalItems = $scope.orders.length;
            }
            $AjaxInterceptor.complete();
        };
        $scope.$on('KYC_RELOAD',function(){
            var selectedOutlets = $scope.getSelectedOutlets();
            var outletIds = [];
            for (var i = selectedOutlets.length - 1; i >= 0; i--) {
                outletIds.push(selectedOutlets[i].id);
            }
            OrderService.loadSince(moment.utc($scope.form.start_date).valueOf(),outletIds).then(function() {
                _processOrders(OrderService.getOrders());
            });
        });

        $scope.$watch('currentPage + numPerPage', function() {
            loadOrdersByPage();
        });

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

                var currency = null;
                if ($scope.currentAction == 'pdf') {
                    currency = $scope.getCurrencyByAscii();
                } else {
                    currency = $scope.getCurrency();
                }

                arrItems.push(item.qty + 'x ' + item.name + ' ' + currency + item.total.toFixed(2));
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
                    prepData["Order Total"].push($scope.getCurrencyByAscii() + order.total.toFixed(2));
                    prepData["Order Status"].push(order.status);

                    total += order.total;
                }
            })

            prepData["Outlet"].push('');
            prepData["Order ID"].push('');
            prepData["Order Time"].push('');
            prepData["Customer"].push('');

            prepData["Items"].push('Total');
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
            titlesCSV.push("Order Total");
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
                    arrPrepData.push($scope.getCurrency() + order.total.toFixed(2));
                    arrPrepData.push(order.status);
                    arrPrepData.push(order.user.optinLoyalty);
                    arrPrepData.push(order.user.optinOffers);
                    arrPrepData.push(order.user.optinOther);

                    prepData.push(arrPrepData);

                    total += order.total;
                }
            })

            var totalData = [
                '', '', '', '', '', 'Total', $scope.getCurrency() + total.toFixed(2), '', '', '', ''
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

        $AjaxInterceptor.complete();
    }]);