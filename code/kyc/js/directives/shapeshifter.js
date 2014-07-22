'use strict'

angular.module('kyc.directives')
	.directive('shapeshift', ['UtilsService', '$timeout',function(UtilsService, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $timeout(function(){
                    var $shaper = $(element).shapeshift(scope.$eval(attrs.shapeshift));    

                    $shaper.on("ss-rearranged", function(e, selected){
                        UtilsService.reOrderWidgets( element );
                    });
                })
                
            }
        };
    }]
);