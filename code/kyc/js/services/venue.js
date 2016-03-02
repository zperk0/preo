angular.module('kyc.services')
.service('VenueService',['ACCOUNT_ID', 'VENUE_ID', 'Venue','$q', function(ACCOUNT_ID, VENUE_ID, Venue,$q) {

    var venue;

    function init(){

        var defer = $q.defer();
        var v = new Venue.query({venueId:VENUE_ID},
        function(result){
          if (result && result.length >0)
            venue = result[0];
            defer.resolve(venue);
       });
        return defer.promise;
    }

    var currencyMap = {
        "GBP": {
            "symbol": "%C2%A3",
            "name": "Pound Sterling",
            "symbol_native": "£",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GBP",
            "name_plural": "British pounds sterling"
        },
        "EUR": {
            "symbol": "%E2%82%AC",
            "name": "Euro",
            "symbol_native": "€",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EUR",
            "name_plural": "euros"
        },
        "USD": {
            "symbol": "$",
            "name": "US Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "USD",
            "name_plural": "US dollars"
        },
        "NOK": {
            "symbol": "Kr",
            "name": "Norwegian Krone",
            "symbol_native": "Kr",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NOK",
            "name_plural": "Norwegian Krone"
        },
        "GIP": {
            "symbol": "£",
            "name": "Gibraltar Pound",
            "symbol_native": "£",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GIP",
            "name_plural": "Gibraltar Pounds"
        }
    }

    function getMinDateForQuery(minPaid){
      //we need at least two years of data to calculate the area charts,
      return minPaid === undefined  || minPaid.valueOf() > moment.utc().subtract('year',2).valueOf() ?
                moment.utc().subtract('year',2).valueOf() :
                minPaid.startOf('day').valueOf();
    }

    function getEvents(minPaid, maxPaid) {
         minPaid = minPaid.startOf('day').format('YYYY/M/D HH:mm:ss')
         maxPaid = maxPaid.endOf('day').format('YYYY/M/D HH:mm:ss')

      return Venue.getEvents({id: venue.id, after: minPaid, before: maxPaid, expand:'times' }).$promise;
    }

    function getCurrency(callback){
        if (venue){
          return currencyMap[venue.ccy];
        }
        else{
          return currencyMap["GBP"];
        }
    }

    return {
    	getCurrency:getCurrency,
        init:init,
        getEvents: getEvents
    }

}]);