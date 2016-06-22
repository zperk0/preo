
export default function menuSectionNew(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./menuSectionNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrl) => {
      scope.menuCtrl = el.parent().controller();
    }
  };
}
