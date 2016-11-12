
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
      console.log("got multiplier", distanceMultiplier, attrs);

      ngModelCtrl.$parsers.unshift(function(val) {
        return val * distanceMultiplier;
      });

      ngModelCtrl.$formatters.unshift(function(val) {
        return Math.round(val / distanceMultiplier);
      });

    }
  };
}
