
export default function validNumber(){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attr, ngModelCtrl) => {

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
      });
    }
  };
}
