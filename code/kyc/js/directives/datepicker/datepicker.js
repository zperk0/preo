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

              var isBeforeStart = date.valueOf() < ng.compareStart.valueOf() || date.valueOf() >= moment.utc().endOf('day').valueOf();

              return isBeforeStart ? 'disabled' : '' ;  
            } else if ( ng.compareEnd ) {

              var isAfterEnd = date.valueOf() > moment.utc(ng.compareEnd).endOf('day').valueOf();

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
          var date;
          if (typeof data === 'string') {
            var dataArr = data.split('/');            
            date = moment.utc([dataArr[2], +dataArr[1] - 1, +dataArr[0]]);
          } else {
            date = moment.utc(data)
          }
          
          if (attrs.start !== undefined) {
            return date.endOf('day');
          } else{
            return date.startOf('day');
          }
        });

        ngModel.$formatters.push(function(data) {                    
          return data.format("DD/MM/YYYY");
        });
        
      }
    };

  
  }]);