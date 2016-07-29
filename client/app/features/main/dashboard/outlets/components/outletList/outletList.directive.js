import controller from './outletList.controller'

export default function outletList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outlets:"="
    },
    template: require("./outletList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrls) => {

    }
  }
}
