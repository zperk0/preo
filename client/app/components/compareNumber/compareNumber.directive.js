
export default function compareNumber(){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      compareValue: '=compareNumber'
    },
    link: (scope, element, attrs, ngModelCtrl) => {

      var isBigger = attrs.hasOwnProperty('bigger');
      var allowEquals = attrs.hasOwnProperty('allowEquals');


      function validate(value) {

        var valid = false;

        if (allowEquals) {
          if (value == scope.compareValue) {
            valid = true;
          }
        }

        if (!valid) {
          if (isBigger) {
            valid = !scope.compareValue || isNaN(parseInt(value)) || +value > +scope.compareValue;
          } else {
            valid = !scope.compareValue || isNaN(parseInt(value)) || +value < +scope.compareValue;
          }
        }

        ngModelCtrl.$setValidity('compareNumber', valid);

        return valid;
      }

      //For DOM -> model validation
      ngModelCtrl.$parsers.unshift(function(value) {

        var valid = validate(value);

        return value;
        // return valid ? value : undefined;
      });

      //For model -> DOM validation
      ngModelCtrl.$formatters.unshift(function(value) {
        var valid = validate(value);

        return value;
      });


      var unRegisterWatch = scope.$watch(function () {

        return scope.compareValue;
      }, function () {

        var valid = validate(ngModelCtrl.$viewValue);

        // if (ngModelCtrl.$viewValue) {
        //   console.log('rendering...');
        //   ngModelCtrl.$viewValue = ngModelCtrl.$viewValue.toString();
        //   ngModelCtrl.$validate();
        //   ngModelCtrl.$render();
        // }
      });

      scope.$on('$destroy', function () {

        unRegisterWatch && unRegisterWatch();
      });
    }
  };
}
