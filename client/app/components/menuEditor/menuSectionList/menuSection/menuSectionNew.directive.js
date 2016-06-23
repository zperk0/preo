
export default function menuSectionNew(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./menuSectionNew.tpl.html"),
    replace:true,
    require:["^menuEditor"],
    link: (scope, el, attr, ctrl) => {
      scope.menuEditorCtrl = ctrl;
    }
  };
}
