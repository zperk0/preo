'use strict';

angular.module('booking')
.directive('submitForm', ['$timeout', function($timeout) {

    return {
        link: function(scope, elm, attrs) {
            scope.$on(attrs.submitForm, function() {

                elm.trigger('submit');
            });
        }
    };
}]);