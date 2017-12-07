import controller from './inviteDetails.controller'

export default function inviteDetails(){
  return {
    restrict: 'E',
    scope: {
      invite: '='
    },
    template: require("./inviteDetails.tpl.html"),
    controller: controller.UID,
    controllerAs: "$invite",
    bindToController: true,
    require:['inviteDetails', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[0].contextualMenuCtrl = ctrls[1];
    }
  }
}
