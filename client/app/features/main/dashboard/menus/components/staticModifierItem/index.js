// Import internal modules
import controller from './staticModifierItem.controller';
import directive from './staticModifierItem.directive';



export default angular.module("staticModifierItem" , [])


  .controller(controller.UID, controller)
  .directive("staticModifierItem", directive)
  .name;
