import controller from './menuSection.controller';

export default function menuSection($compile){
  'ngInject';
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
      if (!ctrl.section || ctrl.section.id === -1){
        const newEl = angular.element(require("./menuSectionNew.tpl.html"));
        el.empty();
        el.append(newEl);
        $compile(newEl)(scope).scope();
      }

    }
  };
}
