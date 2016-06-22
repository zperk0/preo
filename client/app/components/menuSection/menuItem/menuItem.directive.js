import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=?",
      sectionController:"=?"
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^menuSection", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      scope.vm = ctrls[1];
      scope.vm.menuSectionCtrl = ctrls[0]
      scope.vm.menuCtrl = ctrls[0].menuCtrl;

      scope.$on('$destroy',()=>{
        scope.vm.onSuccessCleanup();
        scope.vm.onCancelCleanup();
      })

    }
  };
}
