
export default function validNumber(){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attr, ngModelCtrl) => {

      var keyValidation = attr.hasOwnProperty('keyValidation');

      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.unshift(function(val) {
        if (!val) {
            val = '';
        }

        var clean = val.toString().replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
        if (keyValidation) {
          if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 46 && event.keyCode !== 44) {
            event.preventDefault();
          }
        }
      });
    }
  };
}
