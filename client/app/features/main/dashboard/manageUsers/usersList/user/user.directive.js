import controller from './user.controller'

export default function user(){
  return {
    restrict: 'E',
    scope: {
      user: '=',
      userRole: '=',
      onEdit: '&',
    },
    template: require("./user.tpl.html"),
    controller: controller.UID,
    controllerAs: "userCtrl",
    bindToController: true,
    require:["^cardItemList", "^usersList", "user"],
    link: (scope, el, attr, ctrls) => {

        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].usersListCtrl = ctrls[1];
    }
  }
}
