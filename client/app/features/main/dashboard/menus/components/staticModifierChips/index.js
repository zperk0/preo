// Import internal modules
import controller from './staticModifierChips.controller';
import directive from './staticModifierChips.directive';


export default angular.module("staticModifierChips" , [])


  .controller(controller.UID, controller)
  .directive("staticModifierChips", directive)
  .name;
