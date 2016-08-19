import controller from './userPassword.controller'

export default function userPassword(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./userPassword.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userPasswordCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
