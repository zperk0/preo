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

      let unRegisterWatch = scope.$watch(() => {

        return scope.vm.outletLocationGroup;
      }, () => {
        
        if (!scope.vm.outletLocationGroup) {
          scope.vm.outletLocationGroups = [];
        }
      });

      scope.$on('$destroy', () => {

        unRegisterWatch && unRegisterWatch();
      });
    }
  }
}
