
export default function validPrice($timeout){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModel) => {

      attrs.$set('ngTrim', "false");
      
      var formatter = function(str, isNum) {
          str = String( Number(str || 0) / (isNum?1:100) );
          str = (str=='0'?'0.0':str).split('.');
          str[1] = str[1] || '0';
          return str[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '.' + (str[1].length==1?str[1]+'0':str[1]);
      }
      var updateView = function(val) {
          scope.$applyAsync(function () {
            val = val.replace(/[+]/g, '');
            val = val.replace(/[-]/g, '');
            ngModel.$setViewValue(val || '');
            ngModel.$render();
          });
      }
      var parseNumber = function(val) {
        var modelString = formatter(ngModel.$modelValue, true);
        var valString = String(val || '');
        var newVal = valString.replace(/[^0-9]/g,'');
        var viewVal = formatter(angular.copy(newVal));

        if (modelString !== valString)
            updateView(viewVal);

        return (Number(newVal) / 100) || 0;
      }
      var formatNumber = function(val) {
          if (val) {
              var str = String(val).split('.');
              str[1] = str[1] || '0';
              val = str[0] + '.' + (str[1].length==1?str[1]+'0':str[1]);
          }
          return parseNumber(val);
      }
      
      ngModel.$parsers.push(parseNumber);
      ngModel.$formatters.push(formatNumber);

      $timeout(() => {

        if (ngModel.$viewValue) {
          ngModel.$setViewValue(Number(ngModel.$viewValue.replace(/,/g, '')).toFixed(2));
          ngModel.$render();
        }
      })
    }
  };
}
