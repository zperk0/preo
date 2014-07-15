angular.module('kyc.services')
.service('VenueService',['ACCOUNT_ID','Venue','$q', function(ACCOUNT_ID,Venue,$q) {

    var venue;

    function init(){

        var defer = $q.defer();
        var v = new Venue.query({accountId:ACCOUNT_ID},
        function(result){    
          if (result && result.length >0)
            venue = result[0]          
            defer.resolve(result);
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
        }
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
        init:init
    }

}]);