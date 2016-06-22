import controller from './menuSection.controller';

export default function menuSection(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      section:"=?",
      menuId:"=?"
    },
    template: require("./menuSection.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
      ctrl.menuCtrl = el.parent().controller();

      scope.$on('$destroy',()=>{
        ctrl.onSuccessCleanup();
        ctrl.onCancelCleanup();
      })
    }
  };
}
