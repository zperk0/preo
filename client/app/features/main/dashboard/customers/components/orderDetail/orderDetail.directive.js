import controller from './orderDetail.controller';

export default function orderDetail(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      order: '=',
    },
    template: require('./orderDetail.tpl.html'),
    controller: controller.UID,
    controllerAs: 'orderDetailCtrl',
    bindToController: true,
    replace:true
  }
}
