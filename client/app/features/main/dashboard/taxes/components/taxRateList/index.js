// Import Style
import './taxRateList.scss';


// Import internal modules
import controller from './taxRateList.controller';
import directive from './taxRateList.directive';
import taxRate from './taxRate';

export default angular.module("taxRateList" , [taxRate])

  .controller(controller.UID, controller)
  .directive("taxRateList", directive)
  .name;
