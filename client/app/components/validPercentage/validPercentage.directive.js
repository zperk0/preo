
export default function validPercentage($timeout){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModel) => {

      var MAX_VALUE = 100;
      var MAX_DIGITS = 5;

      attrs.$set('ngTrim', "false");

      // "0.1234" -> "12.34"
      // "0.12345678" -> 123456.78
      var formatPercentToFloat = function(str) {
          str = Number(String(str).replace(/[^0-9\.]/g,'') || 0).toFixed(4).replace(".","");
          if (str[0] == '0'){
            str = str.slice(1);
          }
          let lastTwo = str.slice(-2);
          if (lastTwo === '00')
            return str.slice(0,-2);
          str = [str.slice(0, -2), '.', lastTwo].join('');
          return str;
      }
       var formatFloatToPercent = function(str) {
        console.log("formatting float to percent" , str)
          if (str){
            if (str[0] !== '0' && str[1] !== '.'){
              str = '0.' + str.replace('.','')
            }
          }
          return str;
      }
      var updateView = function(val) {
        if (val || val ==''){
          scope.$applyAsync(function () {
            val = val.replace(/[+]/g, '');
            val = val.replace(/[-]/g, '');
            console.log("set view value", val);
            ngModel.$setViewValue(val);
            ngModel.$render();
          });
        }
      }
      // 12.34 - > 0.1234
      // 12123.1234 -> 0.121231234
      var parseNumber = function(val) {
        var newVal  = val;
        var valLength = 0;
        var newVal = String(newVal).replace(/[^0-9\.]/g,'');
        var modelString = ngModel.$modelValue;
        var viewVal = formatFloatToPercent(angular.copy(newVal));
        updateView(newVal);
        //   newVal = Number(newVal);
        //   valLength = newVal.toString().length;
        ngModel.$setValidity('maxDecimalValue', Number(newVal) <= MAX_VALUE);
        return viewVal


      }
      var formatNumber = function(val) {
          if (val) {
              val = formatPercentToFloat(val);
          }
          return val;
      }

      ngModel.$parsers.push(parseNumber);
      ngModel.$formatters.push(formatNumber);

    }
  };
}
