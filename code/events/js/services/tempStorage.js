(function(window, angular){

angular.module('events')
.service('TempStorage',['$rootScope', function ($rootScope) {

    var service = {};

    service.get = function(key) {

        var evts = sessionStorage.getItem(key) || '[]';
        evts = JSON.parse(evts);

        return evts;
    };

    service.set = function(key, evts) {

        sessionStorage.setItem(key, JSON.stringify(evts));
    };

    service.remove = function(key, evt) {

        var evts = service.get(key);

        evts.some(function(e, i) {

            if(JSON.stringify(e) == JSON.stringify(evt)) {
                evts.splice(i, 1);
                return true;
            }

            return false;
        });

        service.set(key, evts);
    };

    service.clear = function(key) {

        sessionStorage.removeItem(key);
    }

    return service;

}]);

}(window, angular));