// Import Style
import './openingHour.scss';


// Import internal modules
import controller from './openingHour.controller';
import directive from './openingHour.directive';


export default angular.module("openingHour" , [])


  .controller(controller.UID, controller)
  .directive("openingHour", directive)
  .name;
