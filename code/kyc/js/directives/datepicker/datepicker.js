'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', function( $parse ) {

  	return function( ng, elem, attrs ) {

      var ngModel = $parse(attrs.ngModel);

      elem.fdatepicker()
        .on('changeDate', function(ev) {

           ng.$apply(function(scope){
                // Change binded variable
                ngModel.assign(scope, ev.date);
            });

        });
    };

  }]);