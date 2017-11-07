// Import Style
import './taxRate.scss';


// Import internal modules
import controller from './taxRate.controller';
import directive from './taxRate.directive';



export default angular.module("taxRate" , [])


  .controller(controller.UID, controller)
  .directive("taxRate", directive)
  .name;
