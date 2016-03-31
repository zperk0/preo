angular.module('kyc.services')
    .service('OrderService',['ACCOUNT_ID','Order','INITIAL_DATES', 'VENUE_ID', function(ACCOUNT_ID,Order,INITIAL_DATES, VENUE_ID) {


        //start with at least one year of data
        var orders;


        function getOrders(){
            return orders
        }

        function getMinData(){
            return minData;
        }

        function getMaxData(){
            return maxData;
        }

        function getMinDateForQuery(minPaid){
            //we need at least two years of data to calculate the area charts,
            return minPaid === undefined  || minPaid.valueOf() > moment.utc().subtract('year',2).valueOf() ?
                moment.utc().subtract('year',2).valueOf() :
                minPaid.startOf('day').valueOf();
        }


        function load(minPaid,maxPaid,outletIds) {

            var params = {};

            minPaid = getMinDateForQuery(minPaid);

            if ( outletIds && outletIds.length ) {
                outletIds = outletIds.join(',');
            }

            //max paid on the query is always now.
            maxPaid = moment.utc().valueOf();

            params = {accountId:ACCOUNT_ID, venueId: VENUE_ID, maxPaid:maxPaid, minPaid:minPaid, outletIds: outletIds};

            // return Order.query({accountId:ACCOUNT_ID, venueId: VENUE_ID, maxPaid:maxPaid,minPaid:minPaid, outletIds: outletIds},function (res){
            return fetchOrders(params, function (res){
                orders = res;
            });
        }

        function loadSince(since, outletIds) {

            var params = {};

            if ( outletIds && outletIds.length ) {
                outletIds = outletIds.join(',');
            }

            params = {since: since, outletIds: outletIds, orderBy: 'updated'};

            return fetchOrders(params,function (res){
                orders = res;
            });
        }

        function getOrdersByEvents(minPaid,maxPaid,eventIds) {

            var params = {};

            minPaid = getMinDateForQuery(minPaid);

            if ( eventIds && eventIds.length ) {
                eventIds = _.uniq(eventIds).join(',');
            }

            //max paid on the query is always now.
            maxPaid = moment.utc().valueOf();

            params = {maxPaid:maxPaid,minPaid:minPaid, eventIds: eventIds};
            return fetchOrders(params);
        }

        function fetchOrders(data, callback) {

            var params = data,
                cb = callback || (function(){});

            // params need in all cases to fetch orders
            params.accountId = ACCOUNT_ID;
            params.venueId = VENUE_ID;
            params.status = 'NOT_CANCELLED';

            return Order.query(params, cb).$promise;
        }


        return {
            load:load,
            loadSince:loadSince,
            getOrders:getOrders,
            getOrdersByEvents: getOrdersByEvents

        }

    }]);