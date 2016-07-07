import controller from './imageUploader.controller'

export default function imageUploader(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      initialValue:"=?",
      ngModel:"="
    },
    template: require("./imageUploader.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
      el.on('$destroy',()=>{
        ctrl.onDestroy();
      })
    }
  }
}
