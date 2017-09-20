// Import Style
import './menuItemMore.scss';


// Import internal modules
import controller from './menuItemMore.controller';
import directive from './menuItemMore.directive';


export default angular.module("menuItemMore" , [])

  .controller(controller.UID, controller)
  .directive("menuItemMore", directive)
  .name;
