import controller from './navbar.controller';

export default function navbar(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./navbar.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  };
}
