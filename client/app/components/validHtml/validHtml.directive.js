
export default function validPercentage($timeout, $sanitize){
  "ngInject";
   return {
      restrict: 'A',
      require: '?ngModel',
      link: (scope, element, attrs, ngModel) => {

        var parseText = function(val) {
          return $sanitize(val);

        }
        function unicodeToChar(text) {
           return text.replace(/\\u[\dA-F]{4}/gi,
                  function (match) {
                       return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                  });
        }
        var formatText = function(val) {
           console.log("formatig", val, angular.element('<textarea />').html(val).text())
           return angular.element('<textarea />').html(val).text();
        }

        ngModel.$parsers.push(parseText);
        ngModel.$formatters.push(formatText);

      }
    };
}
