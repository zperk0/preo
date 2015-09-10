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

        $http.get("/api/accounts/" + ACCOUNT_ID + "/packages").then(function(result) {

            if (result && result.data) {
                for (var i = 0, len = result.data.length; i < len; i++) {
                    var accountPackage = result.data[i];
                    if (accountPackage && accountPackage.preoPackage && accountPackage.preoPackage.features) {
                        for (var j = 0, lenJ = accountPackage.preoPackage.features.length; j < lenJ; j++) {
                            var feature = accountPackage.preoPackage.features[j];
                            //TODO replace the account feature resource with a model and rework the local statuses
                            if (feature.id === CUSTOM_FEATURE_ID && (accountPackage.status === "INSTALLED" || accountPackage.status === "TRIAL" || accountPackage.status === "UNINSTALLED")) {
                                customFeatureAvailable = true;
                                break;
                            }
                        }
                    }

                    if (customFeatureAvailable) {
                        break;
                    }
                }
            }
        });
    };

    service.isCustomFeatureAvailable = function() {
        return customFeatureAvailable;
    }

    return service;

}]);

}(window, angular));