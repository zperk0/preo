// Import Style
import './menuItemAdvanced.scss';


// Import internal modules
import controller from './menuItemAdvanced.controller';
import directive from './menuItemAdvanced.directive';


export default angular.module("menuItemAdvanced" , [])

  .controller(controller.UID, controller)
  .directive("menuItemAdvanced", directive)
  .name;
