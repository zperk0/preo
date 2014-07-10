angular.module('kyc.services')
.service('CurrencyService',['ACCOUNT_ID','Venue', function(ACCOUNT_ID,Venue) {


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
      new Venue.query({accountId:ACCOUNT_ID},
        function(result){
          var ccy = "GBP";
          if (result && result.length >0)
            ccy = result[0].ccy;
          
          callback(currencyMap[ccy]);
      });

    }
    
    return {
    	getCurrency:getCurrency
    }

}]);