'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', '$filter', function( $parse, $filter ) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        compareStart: '=',
        compareEnd: '=',
      },
      link: function( ng, elem, attrs, ngModel ) {

        var ngCompareEnd = attrs.end ? $parse( attrs.end ) : false;
        var ngCompareStart = attrs.start ? $parse(attrs.start) : false;          
        
        elem.fdatepicker({
          format: "dd/mm/yyyy",
          onRender: function( date ) {            
            // var isAfterToday = date.valueOf() > now.valueOf();

            var isBeforeStart = ngCompareStart && date.valueOf() < ngCompareStart.valueOf();
            // var isAfterEnd = ngCompareEnd && date.valueOf() > ngCompareEnd.valueOf();
            
            // return isAfterToday || isBeforeStart || isAfterEnd ? 'disabled' : '' ;          
            return isBeforeStart ? 'disabled' : '';
          }
        })
          .on('changeDate', function(ev) {

             ng.$apply(function(scope){

                // if ( ngCompare ) {
                //   var newDate = new Date(ngCompare(ng.$parent));

                //   if ( ev.date.valueOf() < newDate.valueOf() ){
                //     ev.date = newDate;
                //   } 

                // }

                ngModel.$setViewValue(ev.date);
                elem.fdatepicker('setDate', ev.date)
              });

          });


        ngModel.$parsers.push(function(data) {
          if (typeof data === 'string') {
            var dataArr = data.split('/');
            return moment([dataArr[2], dataArr[1], dataArr[0]]);
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