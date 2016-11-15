
export default function milesOrKms(){
  "ngInject";
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, element, attrs, ngModelCtrl) => {


      if(!ngModelCtrl) {
        return;
      }

      var distanceMultiplier = attrs.milesOrKms && attrs.milesOrKms=="miles"?  1.6 : 1;

      ngModelCtrl.$formatter.unshift(function(val) {
        return Number(val) / distanceMultiplier;
      });

      ngModelCtrl.$parsers.unshift(function(val) {
        return Number(val) * distanceMultiplier;
      });

    }
  };
}
