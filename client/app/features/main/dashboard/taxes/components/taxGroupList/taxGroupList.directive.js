
import controller from './taxGroupList.controller';

export default function taxGroupList() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      taxGroups: '=',
      onCreate: '&?',
      onEdit: '&?',
      onAfterDelete: '&?'
    },
    template: require('./taxGroupList.tpl.html'),
    controller: controller.UID,
    controllerAs: 'taxGroupListCtrl',
    bindToController: true
  };
}
