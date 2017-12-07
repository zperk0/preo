import controller from './contextualDrawer.customerNotesNew.controller'

export default function contextualMenu(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      orders: '=',
      notes: '=',
    },
    template: require('./contextualDrawer.customerNotesNew.tpl.html'),
    controller: controller.UID,
    controllerAs: 'drawerCustomerNotesNewCtrl',
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
