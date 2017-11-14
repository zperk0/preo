export default function fullSpinner(Spinner){
  "ngInject";

  return {
    restrict: 'E',
    scope: {
      isVisible: '@?'
    },
    template: require("./fullSpinner.tpl.html"),
    link: (scope, el, attrs) => {

      scope.service = Spinner;

      scope.isVisible = attrs.isVisible === 'true';

      scope.$watch('service.isVisible', (newVal) =>{

        if (attrs.isVisible !== 'true') {
          scope.isVisible = newVal;
        }
      });

    }
  }
}
