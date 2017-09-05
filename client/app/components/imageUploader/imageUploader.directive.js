import controller from './imageUploader.controller'

export default function imageUploader(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      initialValue:"=?",
      ngModel:"=",
      boundry:'=?',
      output:'=?',
      viewport:'=?',
      dimensions:"@",
      onChange: "&?",
      onAdd: "&?",
      onDelete: "&?",
      keepOnDestroy: '=?',
      ngDisabled: '=?',
      maxSize: '=?',
      fileTypes: '=?',
      landscape: '=?'
    },
    template: require("./imageUploader.tpl.html"),
    controller: controller.UID,
    controllerAs: "imageUploaderCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
      ctrl.el = el;
      el.on('$destroy',()=>{
        ctrl.onDestroy();
      })
    }
  }
}
