
export default function validPrice($timeout, $filter, $compile, VenueService){
  "ngInject";

  var accounting = require("accounting");
  var MAX_DIGITS = 11;

  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModel) => {

      attrs.$set('ngTrim', "false");

      var updateView = function(val) {
          scope.$applyAsync(function () {

            ngModel.$setViewValue(val || '');
            ngModel.$render();
          });
      };

      var parseNumber = function(val) {

        var el = element[0];

        var config = VenueService.getVenuePriceConfig();
        var numberVal = accounting.unformat(val, config.decimal);

        var valString = String(val || '');
        var expression = '[^0-9' + config.thousand + config.decimal + ']';

        var newVal = valString.replace(new RegExp(expression), '');
        updateView(newVal);

        ngModel.$setValidity('invalidPrice', newVal.split(config.decimal).length <= 2);
        ngModel.$setValidity('maxDecimalValue', (numberVal || 0).toString().length <= MAX_DIGITS);

        return numberVal;
      };

      var formatNumber = function(val) {

        return $filter('currency')(val, true);
      }

      ngModel.$parsers.push(parseNumber);
      ngModel.$formatters.push(formatNumber);

      element.parent().parent().append($compile('<venue-currency class="currency"></venue-currency>')(scope));

      element.on('focus', () => {

        if (!ngModel.$modelValue) {
          updateView('');
        }
      });

      element.on('blur', () => {

        if (!ngModel.$modelValue) {
          updateView($filter('currency')(0, true));
        }
      });

      $timeout(() => {

        if (ngModel.$viewValue) {
          ngModel.$render();
        }
      })
    }
  };
}
