import controller from './usersInviteList.controller'

export default function usersInviteList(){
  return {
    restrict: 'E',
    scope: {
      users:"=",
      isInvite:"=?"
    },
    template: require("./usersInviteList.tpl.html"),
    controller: controller.UID,
    controllerAs: "usersInviteListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
