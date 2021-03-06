import controller from './usersList.controller'

export default function usersList(){
  return {
    restrict: 'E',
    scope: {
      users: '=',
      onEdit: '&?',
      onDeleted: '&?',
    },
    template: require("./usersList.tpl.html"),
    controller: controller.UID,
    controllerAs: "usersListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
