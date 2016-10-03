export default function spinner(Spinner){
  "ngInject";
  return {
    restrict: 'E',
    scope: {},
    template: require("./spinner.tpl.html"),
    link: (scope, el, attrs) => {

    }
  }
}
