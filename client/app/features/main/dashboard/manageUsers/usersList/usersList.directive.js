import controller from './usersList.controller'

export default function usersList(){
  return {
    restrict: 'E',
    scope: {
      users:"="
    },
    template: require("./usersList.tpl.html"),
    controller: controller.UID,
    controllerAs: "usersListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
