
export default function minIntegerValue($parse){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModelCtrl) => {

      var MIN_VALUE = 0;

      if (attrs.minIntegerValue) {
        MIN_VALUE = $parse(attrs.minIntegerValue)(scope);
      }

      //For DOM -> model validation
      ngModelCtrl.$parsers.unshift(function(value) {

        var valid = isNaN(value) || value >= MIN_VALUE;
        ngModelCtrl.$setValidity('minIntegerValue', valid);

        return value;
        // return valid ? value : undefined;
      });

      //For model -> DOM validation
      ngModelCtrl.$formatters.unshift(function(value) {
         ngModelCtrl.$setValidity('minIntegerValue', isNaN(value) || value >= MIN_VALUE);

         return value;
      });
    }
  };
}
