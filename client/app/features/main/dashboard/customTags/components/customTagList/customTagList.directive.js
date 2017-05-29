import controller from './customTagList.controller'

export default function customTagList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      customTags:"=",
      hasActions: '=?',
      hasNew:"=",
      hasSearch:"=?"
    },
    template: require("./customTagList.tpl.html"),
    controller: controller.UID,
    controllerAs: "customTagListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
