'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', '$filter', function( $parse, $filter ) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        compareStart: '=start',
        compareEnd: '=end',
      },
      link: function( ng, elem, attrs, ngModel ) {

        elem.fdatepicker({
          format: "dd/mm/yyyy",
          onRender: function( date ) {

            if ( ng.compareStart ) {

              var isBeforeStart = date.valueOf() < ng.compareStart.valueOf() || date.valueOf() > moment().valueOf();

              return isBeforeStart ? 'disabled' : '' ;  
            } else if ( ng.compareEnd ) {

              var isAfterEnd = date.valueOf() > ng.compareEnd.valueOf();

              return isAfterEnd ? 'disabled' : '' ;  
            }

          }
        })
          .on('changeDate', function(ev) {

             ng.$apply(function(scope){

                ngModel.$setViewValue(ev.date);
                elem.fdatepicker('setDate', ev.date)
              });

          });


        ngModel.$parsers.push(function(data) {
          if (typeof data === 'string') {
            var dataArr = data.split('/');
            return moment([dataArr[2], +dataArr[1] - 1, +dataArr[0]]);
          } else {
            return moment(data);
          }
        });

        ngModel.$formatters.push(function(data) {                    
          return data.format("DD/MM/YYYY");
        });
        
      }
    };

  
  }]);