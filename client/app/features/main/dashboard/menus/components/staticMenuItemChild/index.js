
// Import internal modules
import controller from './staticMenuItemChild.controller';
import directive from './staticMenuItemChild.directive';



export default angular.module("staticMenuItemChild" , [])


  .controller(controller.UID, controller)
  .directive("staticMenuItemChild", directive)
  .name;
