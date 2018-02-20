
import controller from './venueGroupList.controller';

export default function venueGroupList() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      venueGroups: '=',
      onCreate: '&?',
      onEdit: '&?',
      onAfterDelete: '&?'
    },
    template: require('./venueGroupList.tpl.html'),
    controller: controller.UID,
    controllerAs: 'venueGroupListCtrl',
    bindToController: true
  };
}
