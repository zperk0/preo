import controller from './customerList.controller'

export default function customerList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      customers: '=',
      hasNew: '=',
      onEdit: '&?',
      onNotes: '&?',
    },
    template: require("./customerList.tpl.html"),
    controller: controller.UID,
    controllerAs: "$customerList",
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
