'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', '$filter', function( $parse,$filter ) {

  	return {
      require:'ngModel',
      link :function( ng, elem, attrs ,ctrl) {

      var ngModel = $parse(attrs.ngModel);

      elem.fdatepicker({
        format:"dd/mm/yyyy"
      })
        .on('changeDate', function(ev) {
          var that = this;
           ng.$apply(function(scope){
                ngModel.assign(scope, ev.date);                
            });

        });

        ctrl.$parsers.push(function(data) {
          return new Date(data)
        });
        ctrl.$formatters.push(function(data) {          
          return $filter('date')(data, "dd/MM/yyyy");
        });
    }
  }
  }]);