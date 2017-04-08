import controller from './barChart.controller'

export default function barChart(){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      data:"=",
      canvasTitle:"="   
    },
    template: require("./barChart.tpl.html"),
    controller: controller.UID,
    controllerAs: "barChartCtrl",
    bindToController: true,
   // replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
