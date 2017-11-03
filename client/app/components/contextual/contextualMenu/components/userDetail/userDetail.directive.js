import controller from './userDetail.controller'

export default function userDetail(){
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    template: require("./userDetail.tpl.html"),
    controller: controller.UID,
    controllerAs: "$user",
    bindToController: true,
    require:['userDetail', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[0].contextualMenuCtrl = ctrls[1];
    }
  }
}
