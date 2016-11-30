import controller from './userInvite.controller'

export default function userInvite(){
  return {
    restrict: 'E',
    scope: {
      user:"=",
    },
    template: require("./userInvite.tpl.html"),
    controller: controller.UID,
    controllerAs: "userInviteCtrl",
    bindToController: true,
    require:["^cardItemList", "^usersInviteList", "userInvite"],
    link: (scope, el, attr, ctrls) => {

        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].usersListCtrl = ctrls[1];
    }
  }
}
