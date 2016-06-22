export default function spinner(Spinner){
  'ngInject';
  return {
    restrict: 'E',
    scope: {

    },
    template: require("./spinner.tpl.html"),
    link: (scope, el, attr) => {

      scope.service=Spinner;
      scope.$watch('service.isVisible', (newVal) =>{
        scope.isVisible = newVal;
        console.log("set new val", scope.isVisible)
      });

    }
  }
}
