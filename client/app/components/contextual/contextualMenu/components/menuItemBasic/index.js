// Import Style
import './menuItemBasic.scss';


// Import internal modules
import controller from './menuItemBasic.controller';
import directive from './menuItemBasic.directive';


export default angular.module("menuItemBasic" , [])

  .controller(controller.UID, controller)
  .directive("menuItemBasic", directive)
  .name;
