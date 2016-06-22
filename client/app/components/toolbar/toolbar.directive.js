import controller from './toolbar.controller';

export default function toolbar(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {

    },
    template: require("./toolbar.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  };
}
