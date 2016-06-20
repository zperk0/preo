import controller from './menuItem.controller';

export default function menuItem($compile){
  'ngInject';
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
      if (!scope.vm.item || scope.vm.item.id === -1){
        const newEl = angular.element(require("./menuItemNew.tpl.html"));
        el.empty();
        el.append(newEl);
        $compile(newEl)(scope).scope();
      }
    }
  };
}
