// Import Style
import './staticModifierChips.scss';


// Import internal modules
import controller from './staticModifierChips.controller';
import directive from './staticModifierChips.directive';


import staticModifierChip from './staticModifierChip';


export default angular.module("staticModifierChips" , ['staticModifierChip'])


  .controller(controller.UID, controller)
  .directive("staticModifierChips", directive)
  .name;
