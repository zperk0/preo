import controller from './tagActionList.controller'

export default function tagActionList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      tagActions:"=",
      hasNew:"=",
      hasSearch:"=?"
    },
    template: require("./tagActionList.tpl.html"),
    controller: controller.UID,
    controllerAs: "tagActionListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
