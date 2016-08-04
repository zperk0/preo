import controller from './outletLocationGroupList.controller'

export default function outletLocationGroupList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocationGroup: '=',
      onGroupDeleted: '&?',
    },
    template: require("./outletLocationGroupList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
