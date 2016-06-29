import controller from './imageUploader.controller'

export default function imageUploader(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      initialValue:"=?"
    },
    template: require("./imageUploader.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:['ngModel','imageUploader'],
    link: (scope, el, attr, ctrl) => {
      ctrl[1].ngModel = ctrl[0];
    }
  }
}
