import controller from './userEmail.controller'

export default function userEmail(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./userEmail.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userEmailCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
