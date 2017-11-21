import controller from './contextualDrawer.orderHistory.controller'

export default function contextualMenu(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      orders: '='
    },
    template: require('./contextualDrawer.orderHistory.tpl.html'),
    controller: controller.UID,
    controllerAs: 'drawerOrderHistoryCtrl',
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
