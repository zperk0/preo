import controller from './contextualDrawer.userSearch.controller'

export default function contextualUserSearch($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.userSearch.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerUserSearchCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
