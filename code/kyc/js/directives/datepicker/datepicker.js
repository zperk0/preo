'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', '$filter', function( $parse, $filter ) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        compare: '@'
      },
      link: function( ng, elem, attrs, ngModel ) {

        var nowTemp = new Date();
        var now = new Date(Date.UTC(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0));

        var ngCompare = null;

        if ( attrs.compare ) {
          ngCompare = $parse( attrs.compare );
        }

        elem.fdatepicker({
          formatDate: "dd/MM/yyyy",
          onRender: function( date ) {
            return date.valueOf() > now.valueOf() ? 'disabled' : '';          
          }
        })
          .on('changeDate', function(ev) {

             ng.$apply(function(scope){

                if ( ngCompare ) {
                  var newDate = new Date(ngCompare(ng.$parent));

                  if ( ev.date.valueOf() < newDate.valueOf() ){
                    ev.date = newDate;
                  } 

                } 

                ngModel.$setViewValue(ev.date);
                elem.fdatepicker('setDate', ev.date)
              });

          });


        ngModel.$parsers.push(function(data) {
          return new Date(data)
        });

        ngModel.$formatters.push(function(data) {          
          return $filter('date')(data, "MM/dd/yyyy");
        });
          
      }
    };

  
  }]);