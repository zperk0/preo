import controller from './venueGroup.controller'

export default function venueGroup() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      venueGroup: '=',
      onEdit: '&?',
      onAfterDelete: '&?'
    },
    template: require('./venueGroup.tpl.html'),
    controller: controller.UID,
    controllerAs: 'venueGroupCtrl',
    bindToController: true,
    require: ['^cardItemList', '^venueGroupList', 'venueGroup'],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].venueGroupListCtrl = ctrls[1];
    }
  };
}
