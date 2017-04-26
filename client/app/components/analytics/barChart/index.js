// Import Style
import './barChart.scss';


// Import internal modules
import directive from './barChart.directive';
//import controller from './barChart.controller';


export default angular.module("barChart" , [])

  .directive("barChart", directive)
  //.controller(controller.UID, controller)
  .name;
