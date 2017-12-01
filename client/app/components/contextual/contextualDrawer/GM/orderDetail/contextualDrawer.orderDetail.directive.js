import controller from './contextualDrawer.orderDetail.controller'

export default function contextualMenu(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    template: require('./contextualDrawer.orderDetail.tpl.html'),
    controller: controller.UID,
    controllerAs: 'drawerOrderDetailCtrl',
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
