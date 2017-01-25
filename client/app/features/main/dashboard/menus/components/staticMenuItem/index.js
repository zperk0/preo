
// Import internal modules
import controller from './staticMenuItem.controller';
import directive from './staticMenuItem.directive';



export default angular.module("staticMenuItem", [])


  .controller(controller.UID, controller)
  .directive("staticMenuItem", directive)
  .name;
