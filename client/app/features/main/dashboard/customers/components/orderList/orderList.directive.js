import controller from './orderList.controller';

export default function orderList(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      orders: '=',
    },
    template: require('./orderList.tpl.html'),
    controller: controller.UID,
    controllerAs: 'orderListCtrl',
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
