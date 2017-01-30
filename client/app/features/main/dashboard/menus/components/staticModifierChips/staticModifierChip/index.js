// Import Style
import './staticModifierChip.scss';


// Import internal modules
import controller from './staticModifierChip.controller';
import directive from './staticModifierChip.directive';



export default angular.module("staticModifierChip" , [])


  .controller(controller.UID, controller)
  .directive("staticModifierChip", directive)
  .name;
