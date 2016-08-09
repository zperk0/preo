import controller from './outletLocationGroup.controller'

export default function outletLocationGroup(){
  return {
    restrict: 'E',
    scope: {
        outletLocationGroup: '=',
        onDeletedCallback: '&?onDeleted'
    },
    template: require("./outletLocationGroup.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:["^outletLocationGroupList", 'outletLocationGroup'],
    link: (scope, el, attr, ctrls) => {
        ctrls[1].outletLocationGroupListCtrl = ctrls[0];
    }
  }
}
