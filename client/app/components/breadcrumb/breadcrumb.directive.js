export default function breadcrumb(){
  "ngInject";
  return {
    restrict: 'E',
    replace:true,
    template: require("./breadcrumb.tpl.html"),
    transclude:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
