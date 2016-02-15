(function(window, angular){

angular.module('events')
.service('CollectionSlots',['$http','$q','VENUE_ID', 'ACCOUNT_ID', function ($http, $q, VENUE_ID, ACCOUNT_ID) {

    var service = {},
        customFeatureAvailable = false,
        CUSTOM_FEATURE_ID = 8,
        venueid = VENUE_ID,
        accountid = ACCOUNT_ID;

    service.get = function(eventObj) {

        return Preoday.PickupSlot.getAll(eventObj);
    };

    service.create = function(data) {

        return Preoday.PickupSlot.create(data);
    };

    service.update = function(eventObj) {

        return eventObj.save();
    };

    service.delete = function(eventObj) {

        return eventObj.remove();
    };

    service.checkCustomFeature = function(eventObj) {

        $http.get("/api/accounts/" + ACCOUNT_ID + "/features/" + CUSTOM_FEATURE_ID).then(function(result) {

            if (result && result.data && (result.data.status === "INSTALLED" || result.data.status === "TRIAL" || result.data.status === "UNINSTALLED")) {
                customFeatureAvailable = true;
            }
        });
    };

    service.isCustomFeatureAvailable = function() {
        return customFeatureAvailable;
    }

    return service;

}]);

}(window, angular));