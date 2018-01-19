
import controller from './contextualDrawer.entities.controller'

export default function contextualMenu() {
  'ngInject';

  return {
    restrict: 'E',
    controller: controller.UID,
    controllerAs: 'drawerEntitiesCtrl',
    scope: {},
    bindToController: {
      entities: '=?',
      callback: '&?'
    },
    template: require('./contextualDrawer.entities.tpl.html')
  };
}
