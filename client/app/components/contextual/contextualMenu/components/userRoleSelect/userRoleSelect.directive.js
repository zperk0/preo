import controller from './userRoleSelect.controller'

export default function userRoleSelect(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    template: require("./userRoleSelect.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userRoleSelectCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
