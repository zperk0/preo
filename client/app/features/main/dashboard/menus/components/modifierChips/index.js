// Import Style
import './modifierChips.scss';


// Import internal modules
import controller from './modifierChips.controller';
import directive from './modifierChips.directive';

import modifierChip from './modifierChip';


export default angular.module("modifierChips" , [modifierChip])


  .controller(controller.UID, controller)
  .directive("modifierChips", directive)
  .name;
