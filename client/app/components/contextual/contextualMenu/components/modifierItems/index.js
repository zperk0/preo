// Import Style
import './modifierItems.scss';


// Import internal modules
import controller from './modifierItems.controller';
import directive from './modifierItems.directive';



export default angular.module("modifierItems" , [])


  .controller(controller.UID, controller)
  .directive("modifierItems", directive)
  .name;
