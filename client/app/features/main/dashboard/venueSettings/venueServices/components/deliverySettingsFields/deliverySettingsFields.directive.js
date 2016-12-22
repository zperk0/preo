import controller from './deliverySettingsFields.controller'

//refactor to not need section
export default function deliverySettingsFields() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      venue: '='
    },
    template: require("./deliverySettingsFields.tpl.html"),
    controller: controller.UID,
    controllerAs: "deliverySettingsFieldsCtrl",
    bindToController: true,
    replace: true,
    require: ['^form', 'deliverySettingsFields'],
    link: (scope, element, attrs, ctrls) => {

      ctrls[1].deliveryForm = ctrls[0];
    }
  }
}
