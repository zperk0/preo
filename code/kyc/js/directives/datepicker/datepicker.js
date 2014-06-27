'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', function( $parse ) {

  	return function( ng, elem, attrs ) {

      var ngModel = $parse(attrs.ngModel);

      var nowTemp = new Date();
      var now = new Date(Date.UTC(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0));      

      elem.fdatepicker({
        onRender: function( date ) {
          return date.valueOf() > now.valueOf() ? 'disabled' : '';          
        }
      })
        .on('changeDate', function(ev) {

           ng.$apply(function(scope){
                // Change binded variable
                ngModel.assign(scope, ev.date);
            });

        });
    };

  }]);