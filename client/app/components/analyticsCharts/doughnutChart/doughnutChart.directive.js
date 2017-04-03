import controller from './doughnutChart.controller'

export default function doughnutChart($compile, $timeout, $animate){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      canvasId:"@",
      data:"=",
      canvasTitle:"="   
    },
    template: require("./doughnutChart.tpl.html"),
    controller: controller.UID,
    controllerAs: "doughnutChartCtrl",
    bindToController: true, 
    link: (scope, el, attr, ctrl) => {  
    
     // var chartId = 'doughnutchart_' + scope.canvasId; 
    //  el.find('canvas').attr('id', chartId);

    }
  }
}
