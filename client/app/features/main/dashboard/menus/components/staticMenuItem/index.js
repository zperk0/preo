
// Import internal modules
import controller from './staticMenuItem.controller';
import directive from './staticMenuItem.directive';

import staticModifierChips from '../staticModifierChips';



export default angular.module("staticMenuItem", [staticModifierChips])


  .controller(controller.UID, controller)
  .directive("staticMenuItem", directive)
  .name;
