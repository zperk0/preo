'use strict';

angular.module('kyc.directives').
  directive('datepicker', ['$parse', '$filter', function( $parse, $filter ) {

  	return {
      restrict: 'A',
      require: '?ngModel',
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

        var applyDate = function(scope, ev) {

            if ( !ev ) {
              var ev = {
                date: elem.val()
              };

              if ( typeof ev.date == 'string' && ev.date.indexOf('/') ) {
                ev.date = ev.date.split('/');
                ev.date = new Date(ev.date[2], (+ev.date[1] - 1), ev.date[0]);
              }         
            } 

              if ( ngCompare ) {
                var dateString = ngCompare(ng.$parent);

                var newDate;

                if ( typeof dateString == 'string' && dateString.indexOf('/') ) {
                  dateString = dateString.split('/');
                  newDate = new Date(dateString[2], (+dateString[1] - 1), dateString[0]);
                } else {
                  newDate = new Date(ngCompare(ng.$parent));
                }

                if ( attrs.operation == '>' ) {
                  if ( ev.date.valueOf() > newDate.valueOf() ){
                    ev.date = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1, 0, 0, 0, 0));
                    elem.fdatepicker('setDate', ev.date)
                  } 
                } else if (attrs.operation == '<') {
                  if ( ev.date.valueOf() < newDate.valueOf() ){
                    ev.date = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1, 0, 0, 0, 0));
                    elem.fdatepicker('setDate', ev.date)
                  } 
                }

              } 
 
              ngModel.$setViewValue(ev.date);
              elem.fdatepicker('setValue', ev.date)
            };



        elem.fdatepicker({
          format: "dd/mm/yyyy",
          onRender: function( date ) {
            return date.valueOf() > now.valueOf() ? 'disabled' : '';          
          }
        })
          .on('changeDate', function(ev) {

             ng.$apply(function(scope){
              applyDate(scope, ev)
             });

          });

        ngModel.$formatters.push(function(data) {          
          return $filter('date')(data, "dd/MM/yyyy");
        });

        elem.on('blur', function(){
    
             ng.$apply(function(scope){
              applyDate(scope, null)
             });
        })        
          
      }
    };

  
  }]);