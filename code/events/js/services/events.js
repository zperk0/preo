(function(window, angular){

angular.module('events')
.service('Events', function () {
    
    var service = {};

    service.show = function () {
        if (isNative) {
            window.plugins.spinnerDialog.show(null, null, true);
        } else {
            $ionicLoading.show({
              template: 'Loading...'
            });            
        }
    };

    service.hide = function () {
        if (isNative) {
            window.plugins.spinnerDialog.hide();
        } else {
            $ionicLoading.hide();
        }
    }

    return service;

});

}(window, angular));