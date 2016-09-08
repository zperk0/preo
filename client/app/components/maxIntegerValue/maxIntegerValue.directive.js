
export default function maxIntegerValue($parse){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModelCtrl) => {

      var MAX_VALUE = 2147483646;

      if (attrs.maxIntegerValue) {
        MAX_VALUE = $parse(attrs.maxIntegerValue)(scope);
      }

      //For DOM -> model validation
      ngModelCtrl.$parsers.unshift(function(value) {

        var valid = isNaN(value) || value <= MAX_VALUE;
        ngModelCtrl.$setValidity('maxIntegerValue', valid);

        return value;
        // return valid ? value : undefined;
      });

      //For model -> DOM validation
      ngModelCtrl.$formatters.unshift(function(value) {
         ngModelCtrl.$setValidity('maxIntegerValue', isNaN(value) || value <= MAX_VALUE);

         return value;
      });
    }
  };
}
