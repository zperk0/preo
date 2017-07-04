
// Import internal modules
import controller from './tagActionAdvanced.controller';
import directive from './tagActionAdvanced.directive';


export default angular.module("tagActionAdvanced" , [])

  .controller(controller.UID, controller)
  .directive("tagActionAdvanced", directive)
  .name;
