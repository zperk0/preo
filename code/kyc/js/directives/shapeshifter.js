'use strict'

angular.module('kyc.directives')
	.directive('shapeshift', function($timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $timeout(function(){
                    $(element).shapeshift(scope.$eval(attrs.shapeshift));    
                })
                
            }
        };
    }
);