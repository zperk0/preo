import controller from './customerNote.controller'

export default function customerNote(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      note: '='
    },
    template: require("./customerNote.tpl.html"),
    controller: controller.UID,
    controllerAs: "$noteItem",
    replace: true,
    bindToController: true
  }
}
