
export default function maxIntegerValue(){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attr, ngModelCtrl) => {

      var MAX_VALUE = 2147483647;

      //For DOM -> model validation
      ngModelCtrl.$parsers.unshift(function(value) {
        var valid = isNaN(value) || value < MAX_VALUE;
        ngModelCtrl.$setValidity('maxIntegerValue', valid);
        return valid ? value : undefined;
      });

      //For model -> DOM validation
      ngModelCtrl.$formatters.unshift(function(value) {
         ngModelCtrl.$setValidity('maxIntegerValue', isNaN(value) || value < MAX_VALUE);

         return value;
      });
    }
  };
}
