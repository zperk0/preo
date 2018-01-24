
import controller from './marketingCheckbox.controller'

export default function marketingCheckbox() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      ngModel: '='
    },
    template: require('./marketingCheckbox.tpl.html'),
    replace: true,
    controller: controller.UID,
    controllerAs: 'marketingCheckboxCtrl'
  };
}
