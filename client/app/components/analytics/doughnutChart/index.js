// Import Style
import './doughnutChart.scss';


// Import internal modules
import directive from './doughnutChart.directive';
import controller from './doughnutChart.controller';


export default angular.module("doughnutChart" , [])

  .directive("doughnutChart", directive)
  .controller(controller.UID, controller)
  .name;
