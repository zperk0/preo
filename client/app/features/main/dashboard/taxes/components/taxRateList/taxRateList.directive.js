
import controller from './taxRateList.controller'

export default function taxRateList() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      taxRates: '=',
      onCreate: '&?',
      onEdit: '&?',
      onAfterDelete: '&?'
    },
    template: require('./taxRateList.tpl.html'),
    controller: controller.UID,
    controllerAs: 'taxRateListCtrl',
    bindToController: true
  };
}
