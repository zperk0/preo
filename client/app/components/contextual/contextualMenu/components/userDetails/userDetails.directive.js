import controller from './userDetails.controller'

export default function userDetails(){
  return {
    restrict: 'E',
    scope: {
      user: '=',
      userRole: '='
    },
    template: require("./userDetails.tpl.html"),
    controller: controller.UID,
    controllerAs: "$user",
    bindToController: true,
    require:['userDetails', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[0].contextualMenuCtrl = ctrls[1];
    }
  }
}
