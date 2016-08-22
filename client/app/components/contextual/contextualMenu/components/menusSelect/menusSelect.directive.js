import controller from './menusSelect.controller'

export default function menusSelect(){
  return {
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    template: require("./menusSelect.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
