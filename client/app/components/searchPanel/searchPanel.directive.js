
import controller from './searchPanel.controller';

export default function searchPanel(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./searchPanel.tpl.html"),
    scope: {
      placeholder: '@'
    },
    controller: controller.UID,
    controllerAs: "$search",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  };
}
