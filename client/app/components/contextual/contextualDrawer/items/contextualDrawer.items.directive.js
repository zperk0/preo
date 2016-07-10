import controller from './contextualDrawer.items.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.items.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerItemsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

      el.on('$destroy',()=>{
        ctrl.onDestroy();
      })
    }
  }
}
