(function(window, angular){

angular.module('bookingMenus')
.service('PromotionService', ['$http', 'VENUE_ID', '$q', function ($http, VENUE_ID, $q) {

    var service = {},
        venue_id = VENUE_ID,
        promotions = [];

    //TODO: remove fake promotions data when resdiary api is ok
    // var fakePromotions = [
    //   {
    //     "Id": 1,
    //     "Name": "sample string 2",
    //     "Description": "sample string 3",
    //     "MayRequireCreditCard": true,
    //     "HorizontalImageUrl": "sample string 5",
    //     "VerticalImageUrl": "sample string 6",
    //     "Translations": [
    //       {
    //         "LanguageCode": "sample string 1",
    //         "Name": "sample string 2",
    //         "Description": "sample string 3"
    //       },
    //       {
    //         "LanguageCode": "sample string 1",
    //         "Name": "sample string 2",
    //         "Description": "sample string 3"
    //       }
    //     ]
    //   },
    //   {
    //     "Id": 2,
    //     "Name": "sample string 3",
    //     "Description": "sample string 4",
    //     "MayRequireCreditCard": true,
    //     "HorizontalImageUrl": "sample string 5",
    //     "VerticalImageUrl": "sample string 6",
    //     "Translations": [
    //       {
    //         "LanguageCode": "sample string 1",
    //         "Name": "sample string 2",
    //         "Description": "sample string 3"
    //       },
    //       {
    //         "LanguageCode": "sample string 1",
    //         "Name": "sample string 2",
    //         "Description": "sample string 3"
    //       }
    //     ]
    //   }
    // ];

    service.getPromotions = function(filter) {

        // remove when resdiary api is ok
        var defer = $q.defer();

        Preoday.Venue.getPromotions(venue_id).then(function(data) {

            console.log(data);

            promotions = data;
            // promotions = fakePromotions;
            defer.resolve(promotions);
        }, function(result) {
            defer.reject(result);
        });

        return defer.promise;
    };

    service.getPromotionById = function(id) {

        var promo = null;

        for(var i = 0, total = promotions.length; i < total; i++) {

            if(promotions[i].Id == id) {
                promo = promotions[i];
                break;
            }
        }

        return promo;
    }

    return service;

}]);

}(window, angular));